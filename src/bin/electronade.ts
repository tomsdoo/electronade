#!/usr/bin/env node
import { Command } from "commander";
import { initializeConfigFile, preparePreload } from "./opts/";

const program = new Command();
const commandname = "electronade";

program
  .option("--prepare-preload", "prepare preload.ts")
  .option("-c --config <electronade.config.js path>", "config file")
  .option("--init", "initialize config file");

program.on("--help", () => {
  console.log("");
  console.log("Example call:");
  console.log(`  $${commandname} --help`);
  console.log(`  $${commandname} --init`);
  console.log(`  $${commandname} --prepare-preload`);
});

(async () => {
  ///

  program.parse(process.argv);

  const opts = program.opts();

  if (Object.values(opts).length === 0) {
    program.help();
  }

  if (opts.init as boolean) {
    await initializeConfigFile();
  } else if (opts.preparePreload as boolean) {
    await preparePreload(opts.config);
  }

  ///
})()
  .then(() => {})
  .catch(() => {});
