import { isNotNil, jsonParse, rxPipe } from '@acoustic-content-sdk/utils';
import { Observable, of } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';

import { ReadTextFile, rxExists } from '../file/file';
import { WorkspaceSchema } from './workspace-models';

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
