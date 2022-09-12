import { cwd } from "process";
import { join } from "path";
import { writeFile } from "fs/promises";

const configFileContent = `const { join } = require("path");

module.exports = {
  input: {
    baseFile: join(__dirname, "./src/preload_base.ts"),
    exposingName: "electronade",
    preloadObjects: {}
  },
  output: {
    file: join(__dirname, "./src/preload.ts")
  }
};`;

export async function initializeConfigFile(): Promise<any> {
  const filePath = join(cwd(), "./electronade.config.js");
  await writeFile(filePath, configFileContent);
}
