#!/usr/bin/env node

const { normalize, join } = require('path');
const { argv } = require('process');
const { tmpdir } = require('os');
const { sync } = require('cross-spawn');

const dataDir = normalize(join(tmpdir(), `acoustic-content-${Date.now()}`));
const srcDir = normalize(join(__dirname, '..'));

const cliArgs = [
  '@acoustic-content-sdk/cli',
  'generate-data-overlay',
  '--dir',
  dataDir,
  '--src',
  srcDir
];

const toolsArgs = [
  'wchtools-cli',
  'push',
  '-AfI',
  '--dir',
  dataDir,
  ...argv.splice(2)
];

const rmArgs = ['rimraf', dataDir];

const opts = {
  stdio: 'inherit'
};

sync('npx', cliArgs, opts);
sync('npx', toolsArgs, opts);
sync('npx', rmArgs, opts);
