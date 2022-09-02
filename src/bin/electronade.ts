#!/usr/bin/env node
import { Command } from "commander";
import {
  initializeConfigFile,
  preparePreload
} from "./opts/";

const program = new Command();
const commandname = "electronade";

program
  .option('--prepare-preload', 'prepare preload.ts')
  .option('-c --config <electronade-prepare-preload.config.js path>', 'preparing config file')
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
  initializeConfigFile();
}else if(opts.preparePreload){
  preparePreload(opts.config);
}
