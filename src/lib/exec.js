'use strict';

const { exec } = require('child_process');

function execute(cmd, args) {
  return new Promise((resolve, reject) => {
    const _args = {
      maxBuffer: 1024 * 2000
    };
    exec(cmd, _args, (err, stdout, stderr) => {
      if (err) reject(err);
      resolve(`${stdout}${stderr}`);
    });
  });
}

module.exports = execute;
