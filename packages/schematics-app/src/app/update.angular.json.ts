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
  pluckPath,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { Rule, Tree } from '@angular-devkit/schematics';
import { Observable, of } from 'rxjs';
import { endWith, ignoreElements } from 'rxjs/operators';

import { addModeToName, addModeToPath } from '../utilities/names';
import { Schema } from './schema';

const selectBuild = (aName: string) =>
  pluckPath<string>(['projects', aName, 'architect', 'build']);

const KEY_SOURCE_MAP = 'sourceMap';
export const CONFIG_SOURCE_MAP = KEY_SOURCE_MAP;

export const KEY_OUTPUT_PATH = 'outputPath';
export const KEY_MAIN = 'main';
export const KEY_POLYFILLS = 'polyfills';
export const KEY_TS_CONFIG = 'tsConfig';

const selectConfigurations = pluckPath<Record<string, any>>(['configurations']);
const selectOptions = pluckPath<Record<string, any>>(['options']);

function createModeConfig(aMode: ArtifactMode, aOptions: any): any {
  // transform
  return {
    [KEY_OUTPUT_PATH]: addModeToPath(aOptions[KEY_OUTPUT_PATH], aMode),
    [KEY_MAIN]: addModeToName(aOptions[KEY_MAIN], aMode),
    [KEY_TS_CONFIG]: addModeToName(aOptions[KEY_TS_CONFIG], aMode)
  };
}

function updateModeConfig(
  aMode: ArtifactMode,
  aOptions: any,
  aConfigurations: any
): any {
  // check if we already have a config
  const existingConfig = aConfigurations[aMode];
  if (isNil(existingConfig)) {
    // update
    aConfigurations[aMode] = createModeConfig(aMode, aOptions);
  }
  return aConfigurations;
}

function updateSourceMap(aConfigurations: any): any {
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
  aProjectName: string
): Observable<WorkspaceSchema> {
  // be on the safe side
  const ws: WorkspaceSchema = cloneDeep(aWorkspace);
  // build root
  const build = selectBuild(aProjectName)(ws);
  // the configs
  const options = selectOptions(build);
  const config = selectConfigurations(build);
  // add for modes
  updateModeConfig(ArtifactMode.LIVE, options, config);
  updateModeConfig(ArtifactMode.PREVIEW, options, config);
  updateSourceMap(config);
  // returns the update
  return of(ws);
}

/**
 * Updates the angular json by adding the build options
 */
export function updateAngularJson(options: Schema): Rule {
  // the transform callback
  return (host: Tree) => {
    // get the project name
    const projectName = findProjectName(host, options);
    // filename
    const angularJson = getWorkspacePath(host);
    // transforms the angular json
    return rxPipe(
      rxTransformJsonFile(
        angularJson,
        (aWorkspace) => transformAngularJson(aWorkspace, projectName),
        host
      ),
      ignoreElements(),
      endWith(host)
    );
  };
}
