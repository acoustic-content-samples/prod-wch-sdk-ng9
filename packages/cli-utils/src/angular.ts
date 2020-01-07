import {
  FileDescriptor,
  JsonFile,
  rxGetFileDescriptor,
  rxPipe,
  rxReadJSON
} from '@acoustic-content-sdk/rx-utils';
import {
  getProperty,
  isNotEmpty,
  isNotNil,
  isPlainObject,
  isString,
  objectKeys
} from '@acoustic-content-sdk/utils';
import { dirname, join, normalize } from 'path';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { rxFindPackageJson } from './package';

const ANGULAR_JSON = 'angular.json';

/**
 * Locates the angular configuration file, next to the package json file
 *
 * @param aRootDir - the starting directory
 * @returns the angular JSON file
 */
export function rxFindAngularJson(
  aRootDir: string
): Observable<FileDescriptor> {
  // start with the package dir
  return rxPipe(
    rxFindPackageJson(aRootDir),
    mergeMap((pkgJson) => {
      const rootDir = dirname(pkgJson);
      return rxGetFileDescriptor(join(rootDir, ANGULAR_JSON), rootDir);
    })
  );
}

/**
 * Reads the angular configuration file, next to the package json file
 *
 * @param aRootDir - the starting directory
 * @returns the angular JSON file
 */
export function rxReadAngularJson(aRootDir: string): Observable<JsonFile<any>> {
  return rxPipe(rxFindAngularJson(aRootDir), mergeMap(rxReadJSON));
}

/**
 * Tests if the project name is valid
 *
 * @param aName - the project name
 * @returns true if the name is valid, else false
 */
function isValidProjectName(aName: string): boolean {
  return isNotNil(aName) && aName.indexOf('-e2e') < 0;
}

/**
 * Returns the default project, either the configured project or the first one
 *
 * @param aJson - the angular json
 * @returns the default project
 */
export function ngGetDefaultProject(aJson: any): string {
  // read the default configuration
  const defaultProject = aJson.defaultProject;
  if (isString(defaultProject) && isNotEmpty(defaultProject)) {
    // return this one
    return defaultProject;
  }
  // check the projects
  const projects = aJson.projects;
  if (isPlainObject(projects)) {
    // locate the project name
    return objectKeys(projects).find(isValidProjectName);
  }
  // nothing found
  return undefined;
}

/**
 * Returns the source folder for the angular application
 *
 * @param aAngularJson - the angular JSON file
 * @param aProject - optionally the project, otherwise use the default project
 * @returns the source folder from that file
 */
export function rxGetSourceFolder(
  aAngularJson: JsonFile<any>,
  aProject?: string
): Observable<FileDescriptor> {
  // the coordinates
  const { desc, data } = aAngularJson;
  // get the default project
  const defaultPrj = aProject || ngGetDefaultProject(data);
  const project = data[defaultPrj] || {};
  // get the roots
  const root = getProperty(project, 'root', '');
  const srcRoot = getProperty(project, 'sourceRoot', 'src');
  // returns a descriptor for the folder
  const fullPath = normalize(join(dirname(desc.absPath), root, srcRoot));
  // resolve
  return rxGetFileDescriptor(fullPath, desc.root);
}
