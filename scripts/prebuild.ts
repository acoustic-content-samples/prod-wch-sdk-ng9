import { readFile, readJson, writeFile, writeJson } from 'fs-extra';
import { join } from 'path';
import { env } from 'process';

import {
  dirs$,
  isOwnPackage,
  PACKAGE_JSON,
  rootPkg$,
  stringify
} from './common';

const { BRANCH_NAME, VERSION_STRING } = env;

const TSCONFIG_JSON = 'tsconfig.json';

const sortPackageJson = require('sort-package-json');

const BUILD_DATE = new Date();

function updateDependencies(aDeps: Record<string, string>) {
  if (aDeps) {
    for (const key in aDeps) {
      if (isOwnPackage(key)) {
        aDeps[key] = VERSION_STRING;
      }
    }
  }
}

function isAngular(aDeps: Record<string, string>): boolean {
  return Object.keys(aDeps).reduce(
    (aResult: boolean, aKey: string) => aResult || aKey.startsWith('@angular/'),
    false
  );
}

function isReact(aDeps: Record<string, string>): boolean {
  return Object.keys(aDeps).reduce(
    (aResult: boolean, aKey: string) =>
      aResult || aKey === 'react' || aKey === 'react-dom',
    false
  );
}

function isRedux(aDeps: Record<string, string>): boolean {
  return Object.keys(aDeps).reduce(
    (aResult: boolean, aKey: string) =>
      aResult || aKey === 'redux' || aKey.startsWith('redux-'),
    false
  );
}

function rewritePackage(aPkg: any, aRootPkg: any): any {
  // extract
  const { bugs, repository, license, author, publishConfig, tsdoc } = aRootPkg;
  // update
  const copy = {
    ...aPkg,
    bugs,
    repository,
    license,
    author,
    tsdoc,
    publishConfig,
    version: VERSION_STRING,
    sideEffects: false
  };
  updateDependencies(copy.dependencies);
  updateDependencies(copy.peerDependencies);
  // done
  return sortPackageJson(copy);
}

function handlePackage(aName: string) {
  // read
  const pkg$ = readFile(aName, 'utf-8').then((data) => JSON.parse(data));
  const rewritten$ = Promise.all([pkg$, rootPkg$])
    .then(([pkg, rootPkg]) => rewritePackage(pkg, rootPkg))
    .then(stringify);
  // result
  return Promise.all([pkg$, rewritten$]).then(([pkg, rewritten]) =>
    stringify(pkg) !== rewritten
      ? writeFile(aName, rewritten, 'utf8').then(() => aName)
      : undefined
  );
}

function handleVersion(aDir: string) {
  // read the package
  const pkgName = join(aDir, PACKAGE_JSON);
  const name$ = readJson(pkgName).then((pkg) => pkg.name);
  // construct the filename
  const file = join(aDir, 'src', 'version.ts');
  // parse the version
  const [major, minor, patch] = VERSION_STRING.split('.');
  // construct the version object
  const version =
    BRANCH_NAME != null
      ? `{major: '${major}', minor: '${minor}', patch: '${patch}', branch: '${BRANCH_NAME}'}`
      : `{major: '${major}', minor: '${minor}', patch: '${patch}'}`;
  // construct the export
  const versionData = `export const VERSION = {version: ${version}, build: new Date(${BUILD_DATE.getTime()})};`;
  // module data
  const moduleData$ = name$.then((name) => `export const MODULE = '${name}';`);
  // data
  const data$ = moduleData$.then(
    (moduleData) => `${versionData}\n${moduleData}\n`
  );
  // write
  return data$.then((data) => writeFile(file, data, 'utf-8')).then(() => file);
}

function rewriteDependencies(
  aName: string,
  aDeps: Record<string, string>,
  aRef: Record<string, string>
) {
  if (aDeps) {
    // tslint:disable-next-line:forin
    for (const key in aDeps) {
      // only handle foreign packages
      if (!isOwnPackage(key)) {
        // check
        const ref = aRef[key];
        if (ref) {
          // check if we need to update
          const dep = aDeps[key];
          if (ref !== dep) {
            // update
            aDeps[key] = ref;
            // tslint:disable-next-line:no-console
            console.warn(
              `Updating dependency [${key}] from [${dep}] to [${ref}] in [${aName}].`
            );
          }
        } else {
          // tslint:disable-next-line:no-console
          console.error(`Unknown dependency [${key}] in [${aName}].`);
        }
      }
    }
  }
}

function addPeerDependency(
  aDst: Record<string, string>,
  aName: string,
  aRef: Record<string, string>
) {
  const ref = aRef[aName];
  if (ref) {
    // parse the version
    const [, major] = /^(\^\d+)\.(?:.*)$/.exec(ref);
    aDst[aName] = major;
  }
}

function handleDependencies(aName: string) {
  // get all root dependencies
  const ref$ = rootPkg$.then((pkg) => pkg.devDependencies);
  // read
  const pkg$ = readFile(aName, 'utf-8').then((data) => JSON.parse(data));
  // rewrite the dependencies
  const rewritten$ = Promise.all([pkg$, ref$])
    .then(([pkg, ref]) => {
      // clone
      const clone = JSON.parse(JSON.stringify(pkg));
      // check for angular dependencies
      const peerDependencies =
        clone.peerDependencies || (clone.peerDependencies = {});
      // adjust keywords
      const keywords = new Set(clone['keywords'] || []);
      keywords.add('acoustic');
      keywords.add('acoustic-content');
      keywords.add('sdk');
      // check for angular and react dependencies
      if (isAngular(peerDependencies)) {
        keywords.add('angular');
        //addPeerDependency(peerDependencies, '@angular/core', ref);
      }
      if (isReact(peerDependencies)) {
        keywords.add('react');
        //addPeerDependency(peerDependencies, 'react', ref);
      }
      if (isRedux(peerDependencies)) {
        keywords.add('redux');
        //addPeerDependency(peerDependencies, 'redux', ref);
      }
      // add keywords
      clone.keywords = Array.from(keywords).sort();
      // modify
      rewriteDependencies(aName, clone.dependencies, ref);
      rewriteDependencies(aName, clone.devDependencies, ref);
      // ok
      return sortPackageJson(clone);
    })
    .then(stringify);
  // result
  return Promise.all([pkg$, rewritten$]).then(([pkg, rewritten]) =>
    stringify(pkg) !== rewritten
      ? writeFile(aName, rewritten, 'utf8').then(() => aName)
      : undefined
  );
}

const DEFAULT_CONFIG = {
  extends: '../tsconfig.settings.json'
};

function handleConfig(aFile: string): Promise<string> {
  return writeJson(aFile, DEFAULT_CONFIG).then(() => aFile);
}

function rewrite() {
  // packages
  return dirs$
    .then((dirs) =>
      Promise.all(
        dirs.map((dir) => handleDependencies(join(dir, PACKAGE_JSON)))
      )
    )
    .then((res) => res.filter(Boolean));
}

function prebuild() {
  // packages
  const pkgs$ = dirs$.then((dirs) =>
    Promise.all(dirs.map((dir) => handlePackage(join(dir, PACKAGE_JSON))))
  );
  // versions
  const versions$ = dirs$.then((dirs) => Promise.all(dirs.map(handleVersion)));
  // combine
  return Promise.all([pkgs$, versions$]).then(([pkg, versions]) =>
    pkg.concat(versions).filter(Boolean)
  );
}

if (VERSION_STRING != null) {
  rewrite()
    .then(prebuild)
    .then(console.log);
} else {
  rewrite().then(console.log);
}
