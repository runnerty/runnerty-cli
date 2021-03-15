#!/usr/bin/env node

'use strict';
const program = require('commander');
const newProject = require('./src/new.js');
const addModule = require('./src/add.js');
const migrateProject = require('./src/migrate-crontab.js');
const generateTemplates = require('./src/templates.js');

const options = {};

// CHECK ARGS APP:
program.version('Runnerty CLI ' + require('./package.json').version, '-v, --version');

// config path:
program.option('-c, --config <path>', `set config path to add module.`, filePath => {
  options.configFilePath = filePath;
});

// without scaffold:
program.option('-ws, --withoutscaffold', `do not include scaffolding in add module.`, () => {
  options.withoutscaffold = true;
});

// new project with production scaffold:
program.option('-p, --prod', `to create a production project scaffold`, () => {
  options.prod = true;
});

// Runnerty version:
program.option(
  '-rv, --runnertyversion <version>',
  `set runnerty version to install as a dependency when creating a new project`,
  runnertyVersion => {
    options.runnertyVersion = runnertyVersion;
  }
);

// new:
program
  .command('new [project]')
  .alias('n')
  .description('create the project')
  .action(project => {
    newProject(project, options);
  })
  .on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('');
    console.log('  $rty new');
    console.log('  $rty new my_runnerty_project');
  });
// migrate:
program
  .command('migrate [project] [crontab_path]')
  .alias('m')
  .description('migrate crontab to new runnerty project')
  .action((project, crontab_path) => {
    migrateProject(project, crontab_path);
  })
  .on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('');
    console.log('  $rty migrate my_runnerty_migrated_project');
    console.log('  $rty migrate my_runnerty_migrated_project /usr/lib/cron/tabs/my_user');
  });
// templates:
program
  .command('templates')
  .alias('t')
  .description('generates a directory with sample email templates')
  .action(() => {
    generateTemplates();
  });
// add module:
program
  .command('add <module>')
  .description('add runnerty module')
  .action(module => {
    addModule(module, options);
  });

program.parse(process.argv);

// ==================================================================

program.on('command:*', () => {
  console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
  process.exit(1);
});

process.on('uncaughtException', err => {
  console.error('error', err.stack);
});

process.on('unhandledRejection', (reason, p) => {
  console.error('error', p, reason);
  process.exit();
});

process.on('SIGINT', () => {});
