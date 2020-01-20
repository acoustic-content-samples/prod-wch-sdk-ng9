import { execFile } from 'child_process';
import { copy, mkdirp, writeFile } from 'fs-extra';
import { join, normalize } from 'path';

const ROOT = normalize(join(__dirname, '..'));
const DIST = normalize(join(ROOT, 'dist'));
const { name, version, description } = require('../package.json');

const pkg = {
  name,
  version,
  description,
  publishConfig: {
    registry: 'http://wats-repob.devlab.ibm.com/'
  }
};

const MODULE_DIR = join(DIST, 'module');
const moduleDir$ = mkdirp(MODULE_DIR);

const SRC_DIR = join(DIST, 'data');
const DST_DIR = join(MODULE_DIR, 'data');

const folder$ = moduleDir$.then(() => copy(SRC_DIR, DST_DIR));
const PKG_NAME = join(MODULE_DIR, 'package.json');
const pkg$ = moduleDir$.then(() => writeFile(PKG_NAME, JSON.stringify(pkg)));
const readme$ = moduleDir$.then(() => copy(join(ROOT, 'README.md'), join(MODULE_DIR, 'README.md')));

const all$ = Promise.all([pkg$, folder$, readme$]);


function publish(): Promise<string> {
  return new Promise((resolve, reject) => {
    execFile(
      'npm',
      ['publish'],
      { cwd: MODULE_DIR, encoding: 'utf8' },
      (error, stdout) => {
        if (error) {
          reject(error);
        } else {
          resolve(stdout);
        }
      }
    );
  });
}

const install$ = all$.then(publish);

install$.then(console.log, console.error);
