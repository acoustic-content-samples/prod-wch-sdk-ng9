import {
  assignObject,
  isNotEmpty,
  isNotNil,
  JSONObject,
  jsonParse,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { Observable, of, UnaryFunction } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { ReadTextFile, rxExists } from '../file/file';
import { WorkspaceProject, WorkspaceSchema } from './workspace-models';

const CURRENT_ANGULAR_JSON = '/angular.json';
const OLD_ANGULAR_JSON = '/.angular.json';

export function rxGetWorkspacePath(
  aReadText: ReadTextFile
): Observable<string> {
  // test the files
  const current$ = rxPipe(
    rxExists(CURRENT_ANGULAR_JSON, aReadText),
    map((flag) => (flag ? CURRENT_ANGULAR_JSON : undefined))
  );
  const old$ = rxPipe(
    rxExists(OLD_ANGULAR_JSON, aReadText),
    map((flag) => (flag ? OLD_ANGULAR_JSON : undefined))
  );
  // test
  return rxPipe(
    current$,
    switchMap((value) => (isNotNil(value) ? of(value) : old$))
  );
}

export function rxGetWorkspace(
  aReadText: ReadTextFile
): Observable<WorkspaceSchema> {
  return rxPipe(
    rxGetWorkspacePath(aReadText),
    mergeMap(aReadText),
    map<string, WorkspaceSchema>(jsonParse)
  );
}

const DEFAULT_TARGET = 'build';

function getOptionsForTarget(
  aProject: WorkspaceProject,
  aTarget: string,
  aConfigurations: string[]
) {
  // default options
  const target = aProject.architect[aTarget];
  // the options
  return assignObject(
    {},
    target.options,
    ...aConfigurations.map((name) => target.configurations[name])
  );
}

/**
 * Returns a selector function that selects the configuration options for a target
 *
 * @param aTarget  - the project target, e.g. 'build'
 * @param aConfiguration - the configuration name, probably more than one configurations
 *
 * @returns the options
 */
export function selectOptionsForTarget(
  aTarget: string = DEFAULT_TARGET,
  aConfiguration: string = ''
): UnaryFunction<WorkspaceProject, JSONObject> {
  // split the config
  const config = aConfiguration
    .split(',')
    .map((s) => s.trim())
    .filter(isNotEmpty);
  // the function
  return (aSchema: WorkspaceProject) =>
    getOptionsForTarget(aSchema, aTarget, config);
}
