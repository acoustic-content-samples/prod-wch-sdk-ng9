import { promises } from 'fs';
import { join, normalize, parse } from 'path';
import {
  createSourceFile,
  isExportDeclaration,
  isImportDeclaration,
  isStringLiteral,
  ScriptTarget
} from 'typescript';

const { stat, readFile } = promises;

const isRelative = (aName: string) => aName.startsWith('.');
const isAbsolute = (aName: string) => !isRelative(aName);

/**
 * Reads the package file
 *
 * @param aPath - path of the package file
 * @returns the resolved package
 */
const readPkg = (aPath: string): Promise<any> =>
  readFile(join(aPath, 'package.json'), 'utf8').then((data) =>
    JSON.parse(data)
  );

/**
 * Locates the directory for a package
 *
 * @param aDir - the directory to start searching in
 * @returns the resolved directory
 */
const findPkg = (aDir: string): Promise<string> =>
  readPkg(aDir).then(
    () => aDir,
    () => {
      // parent
      const { dir } = parse(aDir);
      return dir !== aDir ? findPkg(dir) : undefined;
    }
  );

/**
 * Locates the directory that contains a particular dependency
 *
 * @param aDep - name of the dependency
 * @return the directory with the dependency
 */
const readDep = (aDep: string): Promise<string> => {
  try {
    // resolve
    const resolved = require.resolve(aDep);
    // check if the file exists
    return stat(resolved).then(
      (s) => (s.isFile() ? findPkg(parse(resolved).dir) : undefined),
      () => undefined
    );
  } catch (error) {
    // warn
    console.warn('Cannot find dependency', aDep);
    // nothing special
    return Promise.resolve(undefined);
  }
};

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

const IMPL_IMPORTS = /define\('([^']*?)'\s*,\s*\[([^\]]*?)\].*?\)/;
const IMPORT = /\s*'([^']*?)'\s*/;

const DEP_MAP = {
  'ng2-logger/browser': 'ng2-logger',
  'rxjs/operators': 'rxjs',
  '@angular/common/http': '@angular/common',
  '@angular-devkit/schematics/tasks': '@angular-devkit/schematics'
};

function mapDependency(aDep: string): string {
  return DEP_MAP[aDep] || aDep;
}

function getDependencies(aDir: string, aPkg: any): Promise<string[]> {
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

/**
 * Detects direct dependencies from the build output by scanning the CJS file
 * and by following the dependencies in the typings. The implementation will not resolve these
 * dependencies transitively.
 *
 * @param aDir - the directory to scan
 * @returns the list of dependencies
 */
export function detectDependencies(aDir: string): Promise<string[]> {
  // read  the package
  return readPkg(aDir).then((pkg) => getDependencies(aDir, pkg));
}

const reduceDependencies = (
  [depDst, peerDst]: [string[], string[]],
  [depSrc, peerSrc]: [string[], string[]]
): [string[], string[]] => [depDst.concat(depSrc), peerDst.concat(peerSrc)];

function internalFindDependenciesFromPkg(
  aPkg: any,
  aRegistry: Record<string, Promise<[string[], string[]]>>
): Promise<[string[], string[]]> {
  // decode the dependencies and the peer dependencies
  const { dependencies = {}, peerDependencies = {} } = aPkg;
  // get all keys
  const depKeys = Object.keys(dependencies);
  const peerKeys = Object.keys(peerDependencies);
  // recurse into all
  const all = [...depKeys, ...peerKeys];
  return Promise.all(
    all.map((dep) => internalFindDependencies(dep, aRegistry))
  ).then((res) => res.reduce(reduceDependencies, [depKeys, peerKeys]));
}

function internalFindDependencies(
  aDep: string,
  aRegistry: Record<string, Promise<[string[], string[]]>>
): Promise<[string[], string[]]> {
  // test for recursion
  const oldDep$ = aRegistry[aDep];
  if (oldDep$) {
    return oldDep$;
  }
  // resolve
  const newDep$: Promise<[string[], string[]]> = readDep(aDep).then((path) =>
    path
      ? readPkg(path).then((pkg) =>
          internalFindDependenciesFromPkg(pkg, aRegistry)
        )
      : [[], []]
  );
  // register
  aRegistry[aDep] = newDep$;
  return newDep$;
}

/**
 * Finds all peer dependencies of the given packages together will all peer dependencies
 *
 * @param aDeps - a list of all dependencies
 *
 * @returns the list of all peer dependencies of these dependencies
 */
export function findPeerDependencies(aDeps: string[]): Promise<string[]> {
  // registry
  const reg: Record<string, Promise<[string[], string[]]>> = {};
  // resolve
  return Promise.all(aDeps.map((dep) => internalFindDependencies(dep, reg)))
    .then((res) => res.reduce(reduceDependencies, [[], []]))
    .then(([dep, peer]) => [
      new Set([].concat(...dep)),
      new Set([].concat(...peer))
    ])
    .then(([dep, peer]) => Array.from(peer).filter((p) => !dep.has(p)));
}
