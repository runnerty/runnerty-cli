'use strict';

const fs = require('fs-extra');
const path = require('path');
const colors = require('colors');

module.exports = function newProject(project) {
  project = project || 'runnerty_sample_project';
  const sample_dir_path = path.join(__dirname, '../base/');
  const detination_path = path.join(process.cwd(), project);
  fs.copy(sample_dir_path, detination_path);
  console.log(
    colors.bold(
      `${colors.green('✔')} Sample project ${colors.green(
        project
      )} has been created in ${colors.green(detination_path)}\n`
    )
  );
};