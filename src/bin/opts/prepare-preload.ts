import { v4 as uuid } from "uuid";
import { cwd } from "process";
import { join } from "path";
import {
  readFile,
  stat,
  writeFile
} from "fs/promises";

type PreloadObject = {
  [key: string]: {
    [key: string]: Function;
  }
};
type PreloadObjects = {
  [key: string]: PreloadObject;
};

function generatePreloadLines(exposingName: string, preloadObjects: PreloadObjects){
  const dictionary: {
    [key: string]: string;
  } = {};

  const mergedObj = Object.fromEntries(
    Object.values(preloadObjects)
      .map((preloadObject: PreloadObject) =>
        Object.entries(preloadObject)
          .map(([propName, propObj]) => {
            return [propName, propObj];
          })).flat()
  );

  if(Object.keys(mergedObj).length === 0){return "";}

  const tempObj = Object.fromEntries(
    Object.entries(mergedObj)
      .map(([ propName, propObj ]) => [
        propName,
        Object.fromEntries(
          Object.entries(propObj as object)
            .map(([ methodName, method ]) => {
              const did = uuid();
              dictionary[did] = method.toString();
              return [methodName, did];
            })
        )
      ])
  );

  return `
contextBridge.exposeInMainWorld("${exposingName}", ${
  Object.entries(dictionary)
    .reduce(
      (text, [dictionaryId, methodText]) => text.replace(`"${dictionaryId}"`, methodText),
      JSON.stringify(tempObj, null, 2)
    )
});
`;
}

export async function preparePreload(configPath: string){
  const localPath = join(cwd(), configPath);
  const filePath = await stat(localPath)
    .then(r => localPath)
    .catch(e => configPath);
  console.log(filePath);
  const {
    input: {
      baseFile,
      exposingName,
      preloadObjects
    },
    output:{ file: outPath },
  } = require(filePath);
  console.log({
    baseFile,
    outPath,
    exposingName,
    preloadObjects
  });
  const baseContent = await readFile(baseFile, { encoding: "utf8" });
  const additionalContent = generatePreloadLines(exposingName, preloadObjects);
  const generatedContent = [
    baseContent,
    additionalContent
  ]
    .filter(Boolean)
    .join("\n");
  await writeFile(outPath, generatedContent);
}
