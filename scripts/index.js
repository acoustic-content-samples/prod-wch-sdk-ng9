#!/usr/bin/env node

const { readJson, writeJson } = require('fs-extra');
const { join } = require('path');
const { chdir, cwd } = require('process');
const spawn = require('cross-spawn');

const currentDir = cwd();
const workDir = __dirname;

const toWorkDir = () => chdir(workDir);
const toCurrentDir = () => chdir(currentDir);

const pkg = join(workDir, 'package.json');
const pkg$ = readJson(pkg)
  .then((data) => ({ ...data, private: true }))
  .then((data) => writeJson(pkg, data));

const pub$ = pkg$
  .then(toWorkDir)
  .then(() =>
    spawn('yarn', ['run', 'publish:global'], { stdio: 'inherit', cwd: workDir })
  )
  .then(toCurrentDir, toCurrentDir);
