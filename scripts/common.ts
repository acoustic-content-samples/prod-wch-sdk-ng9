import { readdir, readFile, stat, Stats, writeFile } from 'fs-extra';
import { join, normalize } from 'path';

const sortPackageJson = require('sort-package-json');

export const PACKAGE_JSON = 'package.json';

export const ROOT_DIR = normalize(join(__dirname, '..'));
export const PKG_DIR = join(ROOT_DIR, 'packages');

export const isDir = (aStat: Stats) => aStat.isDirectory();

const all$ = readdir(PKG_DIR).then((names) =>
  names.map((name) => join(PKG_DIR, name))
);
const stats$ = all$.then((names) =>
  Promise.all(names.map((name) => stat(name)))
);

// filter
export const dirs$ = Promise.all([all$, stats$]).then(([all, stats]) =>
  all.filter((name, idx) => isDir(stats[idx]))
);

export const rootPkg$ = readFile(
  join(ROOT_DIR, PACKAGE_JSON),
  'utf-8'
).then((file) => JSON.parse(file));

export function stringify(aData: any): string {
  return JSON.stringify(aData, undefined, 2);
}

export function isOwnPackage(aKey: string) {
  return (
    aKey.startsWith('@acoustic-content-sdk/') ||
    aKey.startsWith('@ibm-wch-sdk/')
  );
}

export function writePkgSafe(aPath: string, aPkg: any): Promise<string> {
  // sanity check
  const path = normalize(aPath);
  // try to read the file
  const read$ = readFile(path, 'utf-8');
  const data = stringify(sortPackageJson(aPkg));
  // compare
  return read$.then((original) =>
    original === data
      ? undefined
      : writeFile(path, data, 'utf-8').then(() => path)
  );
}
