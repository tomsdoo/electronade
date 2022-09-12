import { v4 as uuid } from "uuid";
import { cwd } from "process";
import { join } from "path";
import { readFile, stat, writeFile } from "fs/promises";

interface PreloadObject {
  [key: string]: {
    [key: string]: Function;
  };
}
interface PreloadObjects {
  [key: string]: PreloadObject;
}

function generatePreloadLines(
  exposingName: string,
  preloadObjects: PreloadObjects
): string {
  const dictionary: {
    [key: string]: string;
  } = {};

  const mergedObj = Object.fromEntries(
    Object.values(preloadObjects)
      .map((preloadObject: PreloadObject) =>
        Object.entries(preloadObject).map(([propName, propObj]) => {
          return [propName, propObj];
        })
      )
      .flat()
  );

  if (Object.keys(mergedObj).length === 0) {
    return "";
  }

  const tempObj = Object.fromEntries(
    Object.entries(mergedObj).map(([propName, propObj]) => [
      propName,
      Object.fromEntries(
        Object.entries(propObj as object).map(([methodName, method]) => {
          const did = uuid();
          dictionary[did] = method.toString();
          return [methodName, did];
        })
      ),
    ])
  );

  const dictionaryKeys = Object.keys(dictionary);
  const textWithTsIgnore = JSON.stringify(tempObj, null, 2)
    .split("\n")
    .map((line) => {
      const lineToBeCommended = dictionaryKeys.some((dictionaryKey) =>
        line.match(new RegExp(`"${dictionaryKey}"`))
      );
      const preSpaces = [
        ...Array(line.indexOf(line.replace(/^\s+/, ""))).keys(),
      ]
        .map(() => " ")
        .join("");
      return lineToBeCommended ? [`${preSpaces}// @ts-ignore`, line] : [line];
    })
    .flat()
    .join("\n");

  return `
contextBridge.exposeInMainWorld("${exposingName}", ${Object.entries(
    dictionary
  ).reduce(
    (text, [dictionaryId, methodText]) =>
      text.replace(`"${dictionaryId}"`, methodText),
    textWithTsIgnore
  )});
`;
}

export async function preparePreload(configPath?: string): Promise<any> {
  // eslint-disable-next-line
  const localPath = join(cwd(), configPath || "electronade.config.js");
  const filePath = await stat(localPath)
    .then((r) => localPath)
    .catch((e) => configPath);
  // eslint-disable-next-line
  if (!filePath) {
    console.log("config file is not found");
    return;
  }

  const {
    input: { baseFile, exposingName, preloadObjects },
    output: { file: outPath },
    // eslint-disable-next-line
  } = require(filePath);

  const baseContent = await readFile(baseFile, { encoding: "utf8" }).catch(
    () => `import { contextBridge, ipcRenderer } from "electron";\n`
  );
  const additionalContent = generatePreloadLines(
    // eslint-disable-next-line
    exposingName || "electronade",
    preloadObjects
  );
  const generatedContent = [baseContent, additionalContent]
    .filter(Boolean)
    .join("\n");
  await writeFile(outPath, generatedContent);
}
