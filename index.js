#!/usr/bin/env node

"use strict";
const program = require("commander");
const newProject = require("./src/new.js");

// CHECK ARGS APP:
program.version(
  "Runnerty CLI " + require("./package.json").version,
  "-v, --version"
);

// new:
program
  .command("new [project]")
  .alias("n")
  .description("create the project")
  .action((project) => {
    newProject(project);
  })
  .on("--help", () => {
    console.log("");
    console.log("Examples:");
    console.log("");
    console.log("  $rn new");
    console.log("  $rn new my_runnerty_project");
  });

program.parse(process.argv);

// ==================================================================

program.on("command:*", () => {
  console.error(
    "Invalid command: %s\nSee --help for a list of available commands.",
    program.args.join(" ")
  );
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("error", err.stack);
});

process.on("unhandledRejection", (reason, p) => {
  console.error("error", p, reason);
  process.exit();
});

process.on("SIGINT", () => {});
