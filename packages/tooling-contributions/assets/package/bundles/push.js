#!/usr/bin/env node

const { normalize, join } = require('path');
const { argv } = require('process');
const spawn = require('cross-spawn');

const workDir = normalize(join(__dirname, '..', 'data'));

const args = [
  'wchtools-cli',
  'push',
  '-AfI',
  '--dir',
  workDir,
  ...argv.splice(2)
];

spawn('npx', args, { stdio: 'inherit' });
