import { dirs$, PACKAGE_JSON } from './common';
import { readFile } from 'fs-extra';
import { join } from 'path';
import { showLatestVersions, deployPackages } from 'tools-helper-npm-publish';
import VError = require('verror');

const ACOUSTIC_PREFIX = '@acoustic-content-sdk/';

function splitVersion(aName: string): [string, string] {
  const idx = aName.lastIndexOf('@');
  return [aName.substr(0, idx), aName.substr(idx + 1)];
}

function extractVersion(aFiles: Array<[string, string]>): string {
  // boil down
  const result = Array.from(new Set(aFiles.map(([, version]) => version)));
  // error handling
  if (result.length !== 1) {
    throw new VError(
      `Packages do not share the identical version: ${JSON.stringify(aFiles)}`,
      aFiles,
      result
    );
  }
  // returns the one and only version
  return result[0];
}

function deployAll(aFiles: Array<[string, string]>): Promise<string[]> {
  // make sure we have a consistent version
  const version = extractVersion(aFiles);
  // names
  const names = aFiles.map(([name]) => name);
  // deploy
  return Promise.resolve(deployPackages(names, version, ['beta']));
}

// read the package names
const names$ = dirs$
  .then((dirs) =>
    Promise.all(
      dirs.map((dir) =>
        readFile(join(dir, PACKAGE_JSON), 'utf-8')
          .then((data) => JSON.parse(data))
          .then((pkg) => pkg.name)
      )
    )
  )
  .then((names) => names.filter((name) => name.startsWith(ACOUSTIC_PREFIX)));

// latest versions
const latest$ = names$
  .then(showLatestVersions)
  .then((versions) => versions.map(splitVersion));

latest$.then(deployAll).then(console.log);
