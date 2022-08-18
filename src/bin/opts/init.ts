import { cwd } from "process";
import { join } from "path";
import { writeFile } from "fs/promises";

const configFileContent = `const { join } = require("path");

module.exports = {
  base: join(__dirname, "./src/preload.ts"),
  output: {
    file: join(__dirname, "./src/merged-preload.ts")
  },
  preloadObjects: {}
};`;

export async function initializeConfigFile(){
  const filePath = join(
    cwd(),
    "./electronade.prepare.config.js"
  );
  await writeFile(filePath, configFileContent);
}
