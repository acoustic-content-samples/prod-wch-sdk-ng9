import {
  isEqual,
  isNotEmpty,
  mapArray,
  objectKeys,
  pluckPath,
  rxPipe,
  EqualsPredicate
} from '@acoustic-content-sdk/utils';
import { parse } from 'path';
import {
  EMPTY,
  merge,
  Observable,
  of,
  OperatorFunction,
  throwError,
  UnaryFunction
} from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  mergeMap,
  startWith,
  distinct
} from 'rxjs/operators';

import {
  createFileDescriptor,
  FileDescriptor,
  ReadTextFile,
  rxReadJsonFile
} from '../file/file';
import { PACKAGE_JSON, rxLocatePackageJson } from '../utils/package';
import { ensureDirPath } from '../utils/url.utils';

declare type Package = FileDescriptor<any>;

/**
 * Locates the dependency in the correct node_modules folder
 *
 * @param aDependency  - the dependency to look for
 * @param aFolder  - the root folder of the referencing package
 * @param aReadText - the callback
 *
 * @returns the decoded package
 */
function rxLocateDependency(
  aDependency: string,
  aFolder: string,
  aReadText: ReadTextFile
): Observable<Package> {
  // folder name
  const path = `${aFolder}/node_modules/${aDependency}`;
  // try to read the package file
  return rxPipe(
    rxReadJsonFile(`${path}/${PACKAGE_JSON}`, aReadText),
    map((pkg) => createFileDescriptor(path, pkg)),
    catchError((err) => {
      const { root, dir } = parse(aFolder);
      return isEqual(root, aFolder)
        ? throwError(err)
        : rxLocateDependency(aDependency, ensureDirPath(dir), aReadText);
    })
  );
}

function rxAddDependency(
  aDependency: string,
  aDst: Record<string, Package>,
  aFolder: string,
  aReadText: ReadTextFile
): Observable<Package> {
  // quick check
  if (isNotEmpty(aDst[aDependency])) {
    return EMPTY;
  }
  // find the dependency
  return rxPipe(
    rxLocateDependency(aDependency, aFolder, aReadText),
    mergeMap((pkg) => rxAddPackage(aDst, pkg, aReadText))
  );
}

function rxAddPackage(
  aDst: Record<string, Package>,
  aPkg: Package,
  aReadText: ReadTextFile
): Observable<Package> {
  // decode the descriptor
  const [path, pkg] = aPkg;
  // decode
  const name: string = pkg.name;
  const dependencies: Record<string, string> = pkg.dependencies;
  // register this one
  aDst[name] = aPkg;
  // map the dependencies
  const deps$ = mapArray(objectKeys(dependencies), (dep) =>
    rxAddDependency(dep, aDst, path, aReadText)
  );
  // merge all
  return isNotEmpty(deps$)
    ? rxPipe(merge(...deps$), startWith(aPkg))
    : of(aPkg);
}

const selectName: UnaryFunction<FileDescriptor<any>, string> = ([name]) => name;

/**
 * Lists all node dependencies of the module
 *
 * @param aReadText - the read text callback
 * @param aRoot - the root folder
 *
 * @returns a listing of the dependencies. The path of the returned {@link FileDescriptor} contains the
 *  directory of the package, not the name of the `package.json` file. The value is the `package.json` object.
 */
export function rxGetDependencies(
  aReadText: ReadTextFile,
  aRoot?: string
): Observable<FileDescriptor<any>> {
  // target record
  const dst: Record<string, Package> = {};
  // locates the package json
  return rxPipe(
    rxLocatePackageJson(aReadText, aRoot),
    map(ensureDirPath),
    mergeMap((path) =>
      rxPipe(
        rxReadJsonFile(`${path}/${PACKAGE_JSON}`, aReadText),
        map((pkg) => createFileDescriptor(path, pkg))
      )
    ),
    mergeMap((pkg) => rxAddPackage(dst, pkg, aReadText)),
    distinct(selectName)
  );
}

const selectData = pluckPath<string>(['config', 'data']);

function rxGetDataDir(
  aReadText: ReadTextFile,
  aFileDescriptor: FileDescriptor<any>
): Observable<string> {
  // decode
  const [path, pkg] = aFileDescriptor;
  // check if we have the setting
  const data = selectData(pkg);
  if (isNotEmpty(data)) {
    // dir to test
    const dataDir = ensureDirPath(data);
    return of(`${path}${dataDir}`);
  }
  // nothing
  return EMPTY;
}

/**
 * Creates an RX operator that locates data directories in the packages
 *
 * @param aReadText - the read text function
 * @returns the operator that identifies the data directories
 */
export const rxDataDirectory = (
  aReadText: ReadTextFile
): OperatorFunction<FileDescriptor<any>, string> =>
  mergeMap((file) => rxGetDataDir(aReadText, file));
