'use strict';

const fs = require('fs-extra');
const path = require('path');
const colors = require('colors');
const execute = require('./lib/exec');

async function newProject(project) {
  project = project || 'runnerty_sample_project';
  const sample_dir_path = path.join(__dirname, '../base/');
  const detination_path = path.join(process.cwd(), project);

  try {
    await fs.copy(sample_dir_path, detination_path);
    console.log(colors.bold('Please wait, running npm install...'));
    await execute(`npm install --prefix ${detination_path}`, null);
    console.log(colors.bold(`${colors.bgGreen('√')} npm installation finish.`));
    console.log(
      colors.bold(
        `${colors.green('✔')} Sample project ${colors.green(project)} has been created in ${colors.green(
          detination_path
        )}\n`
      )
    );
  } catch (err) {
    console.error(colors.bold(`${colors.red('✖')} Error cloning repo `, err));
  }
}
module.exports = newProject;
