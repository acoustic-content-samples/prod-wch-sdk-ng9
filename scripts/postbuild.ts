import {
  copy,
  ensureDir,
  readFile,
  readJson,
  remove,
  stat,
  writeFile,
  writeJson
} from 'fs-extra';
import { camelCase, cloneDeep, kebabCase, upperFirst } from 'lodash';
import { join, normalize, parse } from 'path';
import { env } from 'process';
import { rewriteReadme } from 'tools-helper-merge-markdown';
import {
  createSourceFile,
  isExportDeclaration,
  isImportDeclaration,
  isStringLiteral,
  ScriptTarget
} from 'typescript';

import {
  dirs$,
  isOwnPackage,
  PACKAGE_JSON,
  ROOT_DIR,
  rootPkg$,
  stringify,
  writePkgSafe
} from './common';

const { BRANCH_NAME, VERSION_STRING } = env;

const sortPackageJson = require('sort-package-json');

const REMOVE_METADATA = true;
const REPLACE_FESM = true;

const ANGULAR_PREFIX = '@angular/';

const justMajor = (aValue: string) => /\d+/.exec(aValue)[0];

const getVersion = (aValue: string) => {
  // try to decode the version
  try {
    return `^${justMajor(aValue)}`;
  } catch (err) {
    return aValue;
  }
};

const refVersions$ = rootPkg$
  .then((pkg) => pkg.devDependencies)
  .then((deps) =>
    Object.keys(deps).reduce(
      (aDst: Record<string, string>, aName: string) => ({
        ...aDst,
        [aName]: getVersion(deps[aName])
      }),
      {}
    )
  );

const DIST_DIR = 'dist';

const dist$ = dirs$.then((dirs) => dirs.map((dir) => join(dir, DIST_DIR)));

function generateDoc(aSrcDir: string): Promise<string> {
  // target dir
  return rewriteReadme(aSrcDir, join(aSrcDir, DIST_DIR)).then(
    (dst) => dst,
    (error) => `No doc for ${aSrcDir}.`
  );
}

function buildDoc() {
  // doc files
  return (
    dirs$
      // .then((dirs) => dirs.filter((dir) => dir.includes('component-api')))
      .then((dirs) => Promise.all(dirs.map(generateDoc)))
  );
}

const IMPL_IMPORTS = /define\('([^']*?)'\s*,\s*\[([^\]]*?)\].*?\)/;
const IMPORT = /\s*'([^']*?)'\s*/;

const isRelative = (aName: string) => aName.startsWith('.');
const isAbsolute = (aName: string) => !isRelative(aName);

function resolveRelReference(aDir: string, aName: string): Promise<string> {
  // try a relative ref vs barrel import
  const relImport = normalize(join(aDir, aName + '.d.ts'));
  const barrelImport = normalize(join(aDir, aName, 'index.d.ts'));
  // stat both files
  const relImport$ = stat(relImport).then(
    (s) => s.isFile(),
    () => false
  );
  const barrelImport$ = stat(barrelImport).then(
    (s) => s.isFile(),
    () => false
  );
  // resolve
  return relImport$.then((bRel) =>
    bRel
      ? relImport
      : barrelImport$.then((bBarrel) => (bBarrel ? barrelImport : undefined))
  );
}

function getTypescriptDependencies(
  aFilename: string,
  aDeps: Record<string, string>
) {
  // sanity check
  if (aDeps[aFilename]) {
    return Promise.resolve([]);
  }
  aDeps[aFilename] = aFilename;
  // base dir
  const { dir } = parse(aFilename);
  // parse the file
  const content$ = readFile(aFilename, 'utf-8');
  const source$ = content$.then((content) =>
    createSourceFile(aFilename, content, ScriptTarget.Latest, true)
  );
  // extract all references
  return source$.then((source) => {
    // all export declarations
    const exp = source.statements
      .filter(isExportDeclaration)
      .map((e) => e.moduleSpecifier)
      .filter(Boolean)
      .filter(isStringLiteral)
      .map((spec) => spec.text);
    // all import declarations
    const imp = source.statements
      .filter(isImportDeclaration)
      .map((e) => e.moduleSpecifier)
      .filter(Boolean)
      .filter(isStringLiteral)
      .map((spec) => spec.text);
    // merge together
    const merged = Array.from(new Set([...exp, ...imp]));
    // get all relative refs
    const rel$ = Promise.all(
      merged.filter(isRelative).map((name) => resolveRelReference(dir, name))
    );
    // resolve the references
    const abs = merged.filter(isAbsolute);
    return rel$
      .then((rel) =>
        Promise.all(rel.map((name) => getTypescriptDependencies(name, aDeps)))
      )
      .then((all) => abs.concat(...all));
  });
}

const DEP_MAP = {
  'ng2-logger/browser': 'ng2-logger',
  'rxjs/operators': 'rxjs',
  '@angular/common/http': '@angular/common'
};

function mapDependency(aDep: string): string {
  return DEP_MAP[aDep] || aDep;
}

function getDependencies(aDir: string, aPkg: any) {
  // parse the main field
  const mainFile = join(aDir, aPkg.main);
  const mainContent$ = readFile(mainFile, 'utf-8');
  // locate the dependencies
  const deps$ = mainContent$.then((data) => {
    // parse
    const [, , deps] = IMPL_IMPORTS.exec(data);
    const all = new Set(
      deps
        .split(',')
        .map((imp) => IMPORT.exec(imp))
        .map(([, imp]) => imp)
    );
    all.delete('exports');
    return Array.from(all);
  });
  // locate all typings
  const typingFile = join(aDir, aPkg.typings);
  const tsDeps$ = getTypescriptDependencies(typingFile, {});
  // ok
  return Promise.all([deps$, tsDeps$]).then(([deps, tsDeps]) =>
    Array.from(new Set([...deps, ...tsDeps].map(mapDependency))).sort()
  );
}

function fixExports(aPkg: any): any {
  const copy = { ...aPkg };
  // use the `esm5` default export instead of `fesm5`
  const esm5 = copy.esm5;
  if (esm5 && REPLACE_FESM) {
    copy.module = esm5;
  }
  return sortPackageJson(copy);
}

function fixPackageJson(aPkg: any, aIsAngular: boolean): any {
  const copy = { ...aPkg };
  if (!aIsAngular && REMOVE_METADATA) {
    delete copy.metadata;
  }
  delete copy.devDependencies;
  delete copy.repository;
  // some final cleanup
  return fixExports(copy);
}

const isSpecial = (aDep: string, aPkg: string) =>
  aPkg === '@acoustic-content-sdk/diff' && aDep === 'rfc6902';

function createDependencies(
  aPkg: any,
  aDeps: string[]
): Promise<Record<string, string>> {
  // get the versions from the root package
  const { name, version } = aPkg;
  // check for an own dependency
  const isOwn = (aDep: string) => isOwnPackage(aDep) || isSpecial(aDep, name);
  // filter the dependencies
  return refVersions$.then((refVersions) =>
    aDeps.filter(isOwn).reduce(
      (aDst: Record<string, string>, aName: string) => ({
        ...aDst,
        [aName]: isOwnPackage(aName) ? version : refVersions[aName]
      }),
      {}
    )
  );
}

function createPeerDependencies(
  aPkg: any,
  aDeps: string[]
): Promise<Record<string, string>> {
  // get the versions from the root package
  const { name } = aPkg;
  // filter for foreign packages
  const isForeign = (aDep: string) =>
    !isOwnPackage(aDep) && !isSpecial(aDep, name);
  // get the reference set
  const foreign = aDeps.filter(isForeign);
  // make all foreign dependencies peers
  return refVersions$.then((refVersions) =>
    foreign.reduce((aDst: Record<string, string>, aName: string) => {
      // decode the version
      const ref = refVersions[aName];
      return ref ? { ...aDst, [aName]: ref } : aDst;
    }, {})
  );
}

const isBinaryPackage = (aPkg: any) =>
  Boolean(aPkg.bin) ||
  aPkg.name === '@acoustic-content-sdk/rx-utils' ||
  Boolean(aPkg.schematics);

function rewritePackage(
  aDir: string,
  aPkg: any,
  aDeps: string[]
): Promise<any> {
  // only update if we are not a binary
  const isBin = isBinaryPackage(aPkg);
  // log the dependencies
  const dependencies$ = createDependencies(aPkg, aDeps);
  const peerDependencies$ = createPeerDependencies(aPkg, aDeps);
  // updated package
  const updatedPkg$ = isBin
    ? Promise.resolve(aPkg)
    : Promise.all([dependencies$, peerDependencies$]).then(
        ([dependencies, peerDependencies]) => ({
          ...aPkg,
          dependencies,
          peerDependencies
        })
      );
  // default result
  const default$ = updatedPkg$.then(fixExports);
  // metadata file
  const { metadata } = aPkg;
  if (metadata) {
    // read the file
    const metadataName = join(aDir, metadata);
    const isAngular$ = readFile(metadataName, 'utf-8')
      .catch(() => '')
      .then((data) => data.indexOf(ANGULAR_PREFIX) >= 0);
    // rewrite
    const rewritten$ = isAngular$.then((isAngular) =>
      updatedPkg$.then((pkg) => fixPackageJson(pkg, isAngular))
    );
    // check if we need to delete the metadata file
    const deleted$ = isAngular$.then((isAngular) =>
      !isAngular && REMOVE_METADATA ? remove(metadataName) : undefined
    );
    // combine
    return Promise.all([rewritten$, deleted$]).then(([rewritten]) => rewritten);
  }
  // default
  return default$;
}

const PKG_SPLIT = /^@(.*?)\/(.*?)$/;

function rewriteParent(aParent: any, aRef: any): any {
  // fix the dependencies
  const dependencies = cloneDeep(aRef.dependencies);
  const peerDependencies = cloneDeep(aRef.peerDependencies);
  delete dependencies.tslib;
  delete peerDependencies.tslib;
  // fix the UMD imports
  const all = Array.from(
    new Set([...Object.keys(dependencies), ...Object.keys(peerDependencies)])
  ).sort();
  // set the imports
  const umdModuleIds = all.reduce(
    (aDst: Record<string, string>, aName: string) => {
      // ignore well known packages
      if (aName.startsWith('@angular/') || aName === 'rxjs') {
        return aDst;
      }
      // check for our own types
      if (isOwnPackage(aName)) {
        // split
        const [, scope, pkg] = PKG_SPLIT.exec(aName);
        return { ...aDst, [aName]: `${scope}.${pkg}` };
      }
      // some best guess
      return { ...aDst, [aName]: upperFirst(camelCase(aName)) };
    },
    {}
  );
  // ng package
  const ngPackage = cloneDeep(aParent.ngPackage || {});
  const lib = ngPackage.lib || {};
  lib.umdModuleIds = umdModuleIds;
  delete ngPackage.deleteDestPath;
  // update
  return { ...aParent, dependencies, peerDependencies, ngPackage };
}

function handleParent(aPath: string, aRef: any): Promise<string> {
  return readJson(aPath)
    .then((parent) => rewriteParent(parent, aRef))
    .then((result) => writePkgSafe(aPath, result));
}

function handlePackage(aDir: string): Promise<string> {
  // load the package
  const pkgName = join(aDir, PACKAGE_JSON);
  // read  the package
  const pkg$ = readFile(pkgName, 'utf-8').then((data) => JSON.parse(data));
  // get the dependencies
  const deps$ = pkg$.then((pkg) => getDependencies(aDir, pkg));
  // rewrite
  const rewritten$ = Promise.all([pkg$, deps$]).then(([pkg, deps]) =>
    rewritePackage(aDir, pkg, deps)
  );
  // cleanup the parent
  const parentPkg = normalize(join(aDir, '..', PACKAGE_JSON));
  const parent$ = rewritten$.then((ref) => handleParent(parentPkg, ref));
  // read
  const done$ = rewritten$
    .then(stringify)
    .then((data) => writeFile(pkgName, data, 'utf8'))
    .then(
      () => pkgName,
      (error) => {
        console.error(error);
        return `Error ${pkgName}`;
      }
    );
  // all
  return Promise.all([parent$, done$]).then(([, done]) => done);
}

const PUBLISH_CONFIG = {
  publishConfig: { registry: 'https://registry.npmjs.org/', access: 'public' }
};

function rewriteGlobalPackage(aDstDir: string): Promise<string> {
  const dstName = join(aDstDir, PACKAGE_JSON);
  return readJson(dstName)
    .then((pkg) => ({ ...pkg, ...PUBLISH_CONFIG }))
    .then((pkg) => writeJson(dstName, pkg))
    .then(() => aDstDir);
}

function copyPackage(aPkgFile: string): Promise<string> {
  const pkg$ = readJson(aPkgFile);
  const dstDir$ = pkg$
    .then((pkg) => pkg.name)
    .then(kebabCase)
    .then((name) => join(ROOT_DIR, 'dist', 'packages', name));
  const { dir } = parse(aPkgFile);
  // copy
  return dstDir$
    .then((name) => copy(dir, name))
    .then(() => dstDir$)
    .then(rewriteGlobalPackage);
}

function createDistPackage(): Promise<string> {
  const src$ = readJson(join(ROOT_DIR, PACKAGE_JSON)).then(
    ({ name, version, license, author, workspaces, devDependencies }) => ({
      name,
      version: VERSION_STRING || version,
      license,
      author,
      workspaces,
      dependencies: {
        'cross-env': devDependencies['cross-env'],
        'fs-extra': devDependencies['fs-extra']
      },
      bin: './index.js'
    })
  );
  const dstName = join(ROOT_DIR, 'dist', PACKAGE_JSON);
  // copy file
  const cpy$ = copy(
    join(__dirname, 'index.js'),
    join(ROOT_DIR, 'dist', 'index.js')
  );
  // script section
  const scripts = {
    publish: 'yarn workspaces run publish --non-interactive'
  };
  // produce
  return cpy$
    .then(() => src$)
    .then((src) => ({ ...src, scripts }))
    .then((src) => writeJson(dstName, src))
    .then(() => dstName);
}

function createDist(aPkg: string[]): Promise<string[]> {
  // dist folder
  const mainDist$ = ensureDir(join(ROOT_DIR, 'dist'));
  return mainDist$.then(() =>
    Promise.all([...aPkg.map(copyPackage), createDistPackage()])
  );
}

function postbuild() {
  // packages
  const pkg$ = dist$
    //    .then((dist) => dist.filter((name) => name.includes('\\redux-utils\\')))
    .then((dist) => dist.map(handlePackage))
    .then((all) => Promise.all(all));
  // documentation
  const doc$ = buildDoc();
  // combine
  return Promise.all([pkg$, doc$])
    .then(([pkg, doc]) => [...pkg, ...doc])
    .then(() => pkg$)
    .then(createDist);
}

postbuild().then(console.log);
