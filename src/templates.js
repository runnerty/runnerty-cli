'use strict';

const fs = require('fs-extra');
const path = require('path');
const colors = require('colors');

async function generateTemplates() {
  const sample_dir_path = path.join(__dirname, '../templates/');
  const detination_path = path.join(process.cwd(), '/templates/');

  try {
    await fs.copy(sample_dir_path, detination_path);
    console.log(colors.bold(`${colors.green('✔')} Templates generated in ${colors.green(detination_path)}\n`));
  } catch (err) {
    console.error(colors.bold(`${colors.red('✖')} Error generating templates`, err));
  }
}
module.exports = generateTemplates;
