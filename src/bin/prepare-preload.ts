#!/usr/bin/env node
"use strict";

import { Command } from "commander";
import { writeFile } from "fs/promises";
import { cwd } from "process";
import { join } from "path";
const program = new Command();
const commandname = "electronade";

program
.option('-c --config <electronade-prepare-preload.config.js path>', 'preparing config file')
.option('--prepare-preload', 'prepare preload.ts')
.option('--init', 'initialize config file');

program.on("--help", () => {
  console.log("");
  console.log("Example call:");
  console.log(`  $${commandname} --help`);
  console.log(`  $${commandname} --init`);
});

program.parse(process.argv);

const opts = program.opts();
console.log(opts);

if(Object.values(opts).length === 0){
  program.help();
}

if(opts.init){
  const filePath = join(
    cwd(),
    "./electronade.prepare.config.js"
  );
  const content = `
const { join } = require("path");
module.exports = {
  base: join(__dirname, "./src/preload.ts"),
  output: {
    file: join(__dirname, "./src/merged-preload.ts")
  }
};`;
  writeFile(filePath, content);
}
