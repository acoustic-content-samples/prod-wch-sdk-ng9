import {
  findProjectName,
  getWorkspacePath,
  rxTransformJsonFile,
  WorkspaceSchema
} from '@acoustic-content-sdk/schematics-utils';
import { ArtifactMode } from '@acoustic-content-sdk/tooling-contributions';
import {
  cloneDeep,
  isNil,
  jsonParse,
  pluckPath,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { Rule, Tree } from '@angular-devkit/schematics';
import { parse } from 'path';
import { Observable, of } from 'rxjs';
import { endWith, ignoreElements } from 'rxjs/operators';

import { addModeToName, addModeToPath } from '../utilities/names';
import { getVersion } from '../utilities/version';
import { Schema } from './schema';

const selectBuild = (aName: string) =>
  pluckPath<string>(['projects', aName, 'architect', 'build']);

const selectServe = (aName: string) =>
  pluckPath<string>(['projects', aName, 'architect', 'serve']);

const KEY_SOURCE_MAP = 'sourceMap';
export const CONFIG_SOURCE_MAP = KEY_SOURCE_MAP;

export const KEY_OUTPUT_PATH = 'outputPath';
export const KEY_MAIN = 'main';
export const KEY_POLYFILLS = 'polyfills';
export const KEY_TS_CONFIG = 'tsConfig';
const KEY_BROWSER_TARGET = 'browserTarget';

const NAME_TSCONFIG = 'tsconfig.json';

const selectConfigurations = pluckPath<Record<string, any>>(['configurations']);
const selectOptions = pluckPath<Record<string, any>>(['options']);

function createModeConfigServe(aMode: ArtifactMode, aProjectName: string): any {
  // transform
  return {
    [KEY_BROWSER_TARGET]: `${aProjectName}:build:${aMode}`
  };
}

/**
 * Adds the configuration for the mode
 *
 * @param aMode - the mode
 * @param aVersion - the current version string
 * @param aOptions - the options object
 *
 * @returns the resulting filename
 */
function createModeConfigBuild(
  aMode: ArtifactMode,
  aVersion: string,
  aOptions: any
): any {
  // names
  const outputPath = addModeToPath(aOptions[KEY_OUTPUT_PATH], aVersion, aMode);
  const main = addModeToName(aOptions[KEY_MAIN], aMode);
  const { dir } = parse(main);
  const tsconfig = `${dir}/${NAME_TSCONFIG}`;

  // transform
  return {
    [KEY_OUTPUT_PATH]: outputPath,
    [KEY_MAIN]: main,
    [KEY_TS_CONFIG]: tsconfig
  };
}

function updateModeConfigBuild(
  aMode: ArtifactMode,
  aVersion: string,
  aOptions: any,
  aConfigurations: Record<string, any>
): any {
  // check if we already have a config
  const existingConfig = aConfigurations[aMode];
  if (isNil(existingConfig)) {
    // update
    aConfigurations[aMode] = createModeConfigBuild(aMode, aVersion, aOptions);
  }
  return aConfigurations;
}

function updateModeConfigServe(
  aMode: ArtifactMode,
  aProjectName: string,
  aConfigurations: Record<string, any>
): any {
  // check if we already have a config
  const existingConfig = aConfigurations[aMode];
  if (isNil(existingConfig)) {
    // update
    aConfigurations[aMode] = createModeConfigServe(aMode, aProjectName);
  }
  return aConfigurations;
}

function updateSourceMap(aConfigurations: Record<string, any>): any {
  // check if we already have a config
  const existingConfig = aConfigurations[CONFIG_SOURCE_MAP];
  if (isNil(existingConfig)) {
    // add a new config
    aConfigurations[CONFIG_SOURCE_MAP] = {
      [KEY_SOURCE_MAP]: { hidden: true, scripts: true, styles: true }
    };
  }
}

function transformAngularJson(
  aWorkspace: WorkspaceSchema,
  aProjectName: string,
  aVersion: string
): Observable<WorkspaceSchema> {
  // be on the safe side
  const ws: WorkspaceSchema = cloneDeep(aWorkspace);
  // build root
  const build = selectBuild(aProjectName)(ws);
  const serve = selectServe(aProjectName)(ws);
  // the configs
  const options = selectOptions(build);
  const buildConfig = selectConfigurations(build);
  const serveConfig = selectConfigurations(serve);
  // add build config for modes
  updateModeConfigBuild(ArtifactMode.LIVE, aVersion, options, buildConfig);
  updateModeConfigBuild(ArtifactMode.PREVIEW, aVersion, options, buildConfig);
  updateSourceMap(buildConfig);
  // add serve config for modes
  updateModeConfigServe(ArtifactMode.LIVE, aProjectName, serveConfig);
  updateModeConfigServe(ArtifactMode.PREVIEW, aProjectName, serveConfig);
  // returns the update
  return of(ws);
}

/**
 * Updates the angular json by adding the build options
 */
export function updateAngularJson(options: Schema): Rule {
  // the transform callback
  return (host: Tree) => {
    // actual version
    const version = getVersion(
      jsonParse(host.read('/package.json').toString())
    );
    // get the project name
    const projectName = findProjectName(host, options);
    // filename
    const angularJson = getWorkspacePath(host);
    // transforms the angular json
    return rxPipe(
      rxTransformJsonFile(
        angularJson,
        (aWorkspace: WorkspaceSchema) =>
          transformAngularJson(aWorkspace, projectName, version),
        host
      ),
      ignoreElements(),
      endWith(host)
    );
  };
}
