import { cwd } from "process";
import { join } from "path";
import {
  readFile,
  stat,
  writeFile
} from "fs/promises";

export async function preparePreload(configPath: string){
  const localPath = join(cwd(), configPath);
  const filePath = await stat(localPath)
    .then(r => localPath)
    .catch(e => configPath);
  console.log(filePath);
  const { base, output:{ file: outPath } } = require(filePath);
  console.log({
    base,
    outPath
  });
  const baseContent = await readFile(base, { encoding: "utf8" });
  await writeFile(outPath, baseContent + "// WIP");
}
