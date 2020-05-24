'use strict';

const fs = require('fs-extra');
const path = require('path');
const colors = require('colors');
const { exec } = require('child_process');

function _exec(cmd, args) {
  return new Promise((resolve, reject) => {
    const _args = {
      maxBuffer: 1024 * 2000
    };
    if (args) {
      _args.env = process.env;
      _args.shell = true;
      Object.assign(_args, args);
    }
    const child = exec(cmd, _args, (err, stdout, stderr) => {
      if (err) reject(err);
    });
    child.stdout.on('data', data => {
      process.stdout.write(data);
    });
    child.on('exit', () => {
      resolve();
    });
  });
}

module.exports = async function newProject(project) {
  project = project || 'runnerty_sample_project';
  const sample_dir_path = path.join(__dirname, '../base/');
  const detination_path = path.join(process.cwd(), project);

  try {
    await fs.copy(sample_dir_path, detination_path);
    console.log(colors.bold('Please wait, running npm install...'));
    await _exec(`npm install --prefix ${detination_path}`, null);
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
};
