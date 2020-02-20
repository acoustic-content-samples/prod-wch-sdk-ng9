import {
  AuthoringLayout,
  AuthoringLayoutMapping,
  AuthoringType,
  LoggerService
} from '@acoustic-content-sdk/api';
import {
  Credentials,
  wchGetCredentials,
  WchToolsOptions
} from '@acoustic-content-sdk/cli-credentials';
import {
  isJSON,
  JsonFile,
  rxPipe,
  rxReadJSON,
  rxReadJsonFile,
  rxWalkFiles,
  rxWriteJsonFile,
  SpawnLine
} from '@acoustic-content-sdk/rx-utils';
import {
  arrayPush,
  constGenerator,
  deepEquals,
  getPath,
  mergeObjects,
  objectAssign,
  opShareLast,
  reduceForIn,
  spreadArgs
} from '@acoustic-content-sdk/utils';
import { homedir } from 'os';
import { dirname, isAbsolute, join, normalize } from 'path';
import {
  combineLatest,
  from,
  merge,
  Observable,
  of,
  OperatorFunction,
  UnaryFunction
} from 'rxjs';
import {
  catchError,
  filter,
  map,
  mapTo,
  mergeMap,
  mergeMapTo,
  pluck,
  reduce
} from 'rxjs/operators';

import { canonicalizeJson } from './json';
import { rxFindPackageJson } from './package';
import { rxExecuteScript } from './process';
import { selectId, selectSimpleId } from './selectors';

const WCHTOOLS_OPTIONS_NEW = '.wchtoolsoptions.json';
const WCHTOOLS_OPTIONS_OLD = '.wchtoolsoptions';

const DEFAULT_DATA_DIR = 'data';

const KEY_BASE_URL = 'x-ibm-dx-tenant-base-url';
const KEY_USERNAME = 'username';

const TYPES_FOLDER = 'types';
const LAYOUTS_FOLDER = 'layouts';
const LAYOUT_MAPPINGS_FOLDER = 'layout-mappings';

/**
 * Reads the wch credentials from the given API URL
 *
 * @param aApiUrl - the API URL
 * @returns the attached credentials
 */
export function rxWchToolsGetCredentials(
  aApiUrl: string
): Observable<Credentials> {
  // return
  return from(wchGetCredentials(aApiUrl));
}

/**
 * Locates the data directory
 *
 * @param aDirOrFile - root path or file to search from
 * @returns the data path
 */
export function rxFindDataDir(aDirOrFile: string): Observable<string> {
  // read from the package json
  const pkgJsonFile$ = rxPipe(rxFindPackageJson(aDirOrFile), opShareLast);
  // load the file
  const pkgJson$ = rxPipe(pkgJsonFile$, mergeMap(rxReadJsonFile));
  // locate from the package
  return rxPipe(
    // read from package
    combineLatest(pkgJsonFile$, pkgJson$),
    // locate the path
    map(([pkgJsonFile, pkgJson]) => {
      // check for the config
      const dataPath = getPath(pkgJson, ['config', 'data'], DEFAULT_DATA_DIR);
      return isAbsolute(dataPath)
        ? dataPath
        : normalize(join(dirname(pkgJsonFile), dataPath));
    })
  );
}

/**
 * Reads the options file
 *
 * @param aDir  - the candidate directory for the options
 * @returns the options file or an error
 */
function rxReadOptionsFile(aDir: string): Observable<any> {
  // possible paths
  const newFile$ = rxReadJsonFile(join(aDir, WCHTOOLS_OPTIONS_NEW));
  const oldFile$ = rxReadJsonFile(join(aDir, WCHTOOLS_OPTIONS_OLD));
  // try
  return rxPipe(newFile$, catchError(constGenerator(oldFile$)));
}

/**
 * Reads the wchtools options object
 *
 * @param aOptionsDir - the options directory
 * @returns the options
 */
export function rxReadWchToolsOptions(
  aOptionsDir: string
): Observable<WchToolsOptions> {
  // the fallbacks
  const optionsFromData$ = rxReadOptionsFile(aOptionsDir);
  const optionsFromHome$ = rxReadOptionsFile(homedir());
  const emptyOptions = () => of({});
  // the final options file
  const options$ = rxPipe(
    optionsFromData$,
    catchError(constGenerator(optionsFromHome$)),
    catchError(emptyOptions)
  );
  // find the base URL
  const baseUrl$ = rxPipe(
    options$,
    pluck<any, string>(KEY_BASE_URL),
    opShareLast
  );
  // find the username
  const userName$ = rxPipe(
    options$,
    pluck<any, string>(KEY_USERNAME),
    opShareLast
  );
  // fallback credentials
  const defaultCredentials$: Observable<Credentials> = rxPipe(
    userName$,
    map((username) => ({ username, password: undefined })),
    opShareLast
  );
  // read the credentials
  const credentials$ = rxPipe(baseUrl$, mergeMap(rxWchToolsGetCredentials));
  // combine the credentials
  const combined$ = rxPipe(
    combineLatest(defaultCredentials$, credentials$),
    map(spreadArgs(mergeObjects)),
    catchError(() => defaultCredentials$)
  );
  // combine into the final result
  return rxPipe(
    combineLatest(baseUrl$, combined$),
    map(([baseUrl, credentials]) => ({ baseUrl, ...credentials }))
  );
}

export interface JsonEntry<T> extends JsonFile<T> {
  id: string;
}
export type JsonEntryMap<T> = Record<string, JsonEntry<T>>;

/**
 * Reads the files in a row
 *
 * @param aRoot - root directory
 * @param aIdSelector - selects the ID from the JSON record
 *
 * @returns observable of the involved files
 */
function rxReadAllJsonFiles<T>(
  aRoot: string,
  aIdSelector: UnaryFunction<T, string>
): Observable<JsonFile<T>> {
  // iterate
  return rxPipe(
    rxWalkFiles(aRoot),
    filter(isJSON),
    mergeMap((desc) => rxReadJSON<T>(desc)),
    map((file) => ({ ...file, id: aIdSelector(file.data) }))
  );
}

/**
 * Writes a single JSON file if the file on disk is different
 *
 * @param aEntry - the entry to write
 * @returns an observable with that entry
 */
function writeSingleJsonFile<T>(
  aEntry: JsonEntry<T>
): Observable<JsonEntry<T>> {
  // the path
  const { data, desc } = aEntry;
  const path = desc.absPath;
  // first try to read the existing entry
  const read = () => rxReadJsonFile(path);
  // write the file
  const write = () =>
    rxPipe(rxWriteJsonFile(path, canonicalizeJson({ ...data })), mapTo(aEntry));
  // compare with the file on disk, uf the file does not exist, assume false
  const equals$ = rxPipe(
    read(),
    map((current) => deepEquals(data, current)),
    catchError((error) => of(false))
  );
  // write
  return rxPipe(
    equals$,
    mergeMap((eq) => (eq ? of(aEntry) : write()))
  );
}

/**
 * Persists the entries in the map
 *
 * @param aMap  - the map to persist
 * @returns an observable stream of the persisted entries
 */
export function rxWriteJsonEntryMap<T>(
  aMap: JsonEntryMap<T>
): Observable<JsonEntry<T>> {
  // persist as fast as possible
  return merge(
    ...reduceForIn(
      aMap,
      (aDst: Observable<JsonEntry<T>>[], aValue: JsonEntry<T>) =>
        arrayPush(writeSingleJsonFile(aValue), aDst),
      []
    )
  );
}

/**
 * Collects a sequence of JSON files into a map sing the selector function as the key
 *
 * @param aIdSelector - the ID selector
 * @returns the operator
 */
function reduceToObject<T>(): OperatorFunction<
  JsonEntryMap<T>,
  JsonEntryMap<T>
> {
  return (entries$) =>
    rxPipe(
      entries$,
      reduce(
        (res: JsonEntryMap<T>, entry: JsonEntry<T>) =>
          objectAssign(entry.id, entry, res),
        {}
      )
    );
}

/**
 * Reads the authoring types from a directory
 *
 * @param aRoot - root directory
 * @param aTree - the tree
 *
 * @returns the result
 */
export function rxFindAuthoringTypes(
  aRoot: string
): Observable<JsonFile<AuthoringType>> {
  return rxPipe(
    rxReadAllJsonFiles<AuthoringType>(join(aRoot, TYPES_FOLDER), selectId)
  );
}

/**
 * Reads the authoring layouts from a directory
 *
 * @param aRoot - root directory
 * @param aTree - the tree
 *
 * @returns the result
 */
export function rxFindAuthoringLayouts(
  aRoot: string
): Observable<JsonEntry<AuthoringLayout>> {
  return rxPipe(
    rxReadAllJsonFiles<AuthoringLayout>(
      join(aRoot, LAYOUTS_FOLDER),
      selectSimpleId
    )
  );
}

/**
 * Reads the authoring layouts from a directory
 *
 * @param aRoot - root directory
 * @param aTree - the tree
 *
 * @returns the result
 */
export function rxFindAuthoringLayoutMappings(
  aRoot: string
): Observable<JsonEntry<AuthoringLayoutMapping>> {
  return rxPipe(
    rxReadAllJsonFiles<AuthoringLayoutMapping>(
      join(aRoot, LAYOUT_MAPPINGS_FOLDER),
      selectSimpleId
    )
  );
}

/**
 * Mapping from type id to json record for authoring types
 */
export type AuthoringTypeMap = JsonEntryMap<AuthoringType>;

/**
 * Reads the authoring types from a directory
 *
 * @param aRoot - root directory
 *
 * @returns the result
 */
export function rxReadAuthoringTypes(
  aRoot: string
): Observable<AuthoringTypeMap> {
  // reduce
  return rxPipe(rxFindAuthoringTypes(aRoot), reduceToObject());
}

/**
 * Mapping from type id to json record for authoring layouts
 */
export type AuthoringLayoutMap = JsonEntryMap<AuthoringLayout>;

/**
 * Reads the authoring layouts from a directory
 *
 * @param aRoot - root directory
 *
 * @returns the result
 */
export function rxReadAuthoringLayouts(
  aRoot: string
): Observable<AuthoringLayoutMap> {
  // reduce
  return rxPipe(rxFindAuthoringLayouts(aRoot), reduceToObject());
}

/**
 * Mapping from type id to json record for authoring layout mappings
 */
export type AuthoringLayoutMappingMap = JsonEntryMap<AuthoringLayoutMapping>;

/**
 * Reads the authoring layouts from a directory
 *
 * @param aRoot - root directory
 *
 * @returns the result
 */
export function rxReadAuthoringLayoutMappings(
  aRoot: string
): Observable<AuthoringLayoutMappingMap> {
  // reduce
  return rxPipe(rxFindAuthoringLayoutMappings(aRoot), reduceToObject());
}

/**
 * Writes the wchtools options file
 *
 * @param aOptionsDir - the directory for the options
 * @param aOptions - the new options to write
 *
 * @returns the written options
 */
export function rxWriteWchToolsOptions(
  aOptionsDir: string,
  aOptions: WchToolsOptions
): Observable<WchToolsOptions> {
  // try to read an existing options file
  const optionsFromData$ = rxReadOptionsFile(aOptionsDir);
  const defaultOptions = () => of({});
  // the options with fallback
  const options$ = rxPipe(optionsFromData$, catchError(defaultOptions));
  // the new options
  const newOptions = {
    [KEY_BASE_URL]: aOptions.baseUrl,
    [KEY_USERNAME]: aOptions.username
  };
  // merge and write
  const mergedOptions$ = rxPipe(
    options$,
    map((options) => mergeObjects(options, newOptions)),
    opShareLast
  );
  // write
  const written$ = rxPipe(
    mergedOptions$,
    mergeMap((options) =>
      rxWriteJsonFile(join(aOptionsDir, WCHTOOLS_OPTIONS_NEW), options)
    )
  );
  // done
  return rxPipe(written$, mergeMapTo(mergedOptions$));
}

/**
 * Executes wchtools. If we can find wchtools in the path, use that version, else
 * use npx to install and run it.
 *
 * @param aPkgDir - the package directory, will be the execution directory
 * @param aArgs - the arguments to wchtools
 * @param aLogSvc - the logger service
 *
 * @returns an observable with  the output of the command
 */
export function rxExecuteWchTools(
  aPkgDir: string,
  aArgs: string[],
  aLogSvc: LoggerService
): Observable<SpawnLine> {
  // dispatch to the more generic method
  return rxExecuteScript(aPkgDir, 'wchtools', 'wchtools-cli', aArgs, aLogSvc);
}
