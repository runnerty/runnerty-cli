'use strict';

const fs = require('fs-extra');
const jsonfile = require('jsonfile');
const path = require('path');
const npa = require('npm-package-arg');
const colors = require('colors');
const execute = require('./lib/exec');
const resolve = require('resolve');

async function addModule(moduleId, options) {
  try {
    console.log(colors.bold('Please wait, running npm install...'));
    // await execute(`npm install ${moduleId} --save`, null);
    const npaInfo = npa(moduleId);
    const moduleName = npaInfo.name;
    const modulePath = path.dirname(resolve.sync(moduleName, { basedir: process.cwd() }));
    const configPath = options.configFilePath || './config.json';
    const scaffoldPath = path.join(modulePath, '/scaffold');
    const scaffoldConfigPath = path.join(scaffoldPath, 'config.json');
    const scaffoldPlanPath = path.join(scaffoldPath, 'plan.json');
    const scaffoldAssetsPath = path.join(scaffoldPath, '/assets');

    console.log(colors.bold(`${colors.bgGreen('√')} Module ${moduleName} installed.`));

    if (fs.existsSync(scaffoldPath) && !options.withoutscaffold) {
      // Scaffold config:
      if (fs.existsSync(configPath) && fs.existsSync(scaffoldConfigPath)) {
        console.log(
          colors.bold(`${colors.bgGreen('√')} Applying scaffold sample config to ${path.basename(configPath)}`)
        );
        const configObject = await jsonfile.readFile(configPath);
        const scaffoldConfigObject = await jsonfile.readFile(scaffoldConfigPath);

        for (const moduleType in scaffoldConfigObject) {
          for (const sampleConfig of scaffoldConfigObject[moduleType]) {
            let idInUse = false;
            for (const currentConfig of configObject[moduleType]) {
              if (currentConfig.id === sampleConfig.id) {
                idInUse = true;
              }
            }

            if (idInUse) {
              sampleConfig.id = sampleConfig.id + '_SAMPLE';
            }

            configObject[moduleType].push(sampleConfig);
          }
        }
        await jsonfile.writeFile(configPath, configObject, { spaces: 2 });

        console.log(colors.bold(`${colors.bgGreen('√')} Formatting config.json with Prettier.`));
        await execute(`npx prettier --write ./config.json`, null);
      }
      // Scaffold plan:
      if (fs.existsSync(scaffoldPlanPath)) {
        let scaffoldPlanName = `./plan_${moduleName}_sample.json`;
        npaInfo.scope + '/';
        if (npaInfo.scope) {
          scaffoldPlanName = scaffoldPlanName.replace(npaInfo.scope + '/', '');
        }
        fs.copyFileSync(scaffoldPlanPath, scaffoldPlanName);
        console.log(colors.bold(`${colors.bgGreen('√')} Plan sample generated: ${path.basename(scaffoldPlanName)}`));
      }
      // Scaffold assets:
      if (fs.existsSync(scaffoldAssetsPath)) {
        fs.copySync(scaffoldAssetsPath, './');
        console.log(colors.bold(`${colors.bgGreen('√')} Assets generated.`));
      }
    }
  } catch (err) {
    console.error(colors.bold(`${colors.red('✖')} Error adding module `, err));
  }
}
module.exports = addModule;
