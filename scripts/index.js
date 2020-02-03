#!/usr/bin/env node

const { readJson, writeJson } = require('fs-extra');
const { join } = require('path');
const spawn = require('cross-spawn');

console.log('Carsten', __dirname);

const pkg = join(__dirname, 'package.json');
const pkg$ = readJson(pkg)
  .then((data) => ({ ...data, private: true }))
  .then((data) => writeJson(pkg, data));

const pub$ = pkg$.then(() =>
  spawn('yarn', ['run', 'publish'], { stdio: 'inherit', cwd: __dirname })
);
