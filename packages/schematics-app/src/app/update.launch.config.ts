import { Path } from '@angular-devkit/core';
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  rxTransformTextFile,
  updateField
} from '@acoustic-content-sdk/schematics-utils';
import { assertArray, isNotNil } from '@acoustic-content-sdk/utils';
import { parse, stringify } from 'comment-json';
import { Observable, of } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';

import { Schema } from './schema';

export const LAUNCH_CONFIG_PATH: Path = '/.vscode/launch.json' as Path;

export const LAUNCH_LOCAL_NAME = 'Launch Chrome against localhost';

function _updateLaunchConfig(aConfig: any): any {
  // set version
  updateField('version', () => '0.2.0', aConfig);
  // update configs
  const configurations = assertArray('configurations', aConfig);
  // locate the config
  if (
    !configurations.find(
      (el: any) => el && el.name && el.name === LAUNCH_LOCAL_NAME
    )
  ) {
    // insert the config
    configurations.push({
      type: 'chrome',
      request: 'launch',
      name: LAUNCH_LOCAL_NAME,
      url: 'http://localhost:4200/home',
      webRoot: '${workspaceFolder}'
    });
  }
  // ok
  return aConfig;
}

export function updateLaunchConfig(options: Schema): Rule {
  return (host: Tree, context: SchematicContext): Observable<Tree> => {
    return rxTransformTextFile(
      LAUNCH_CONFIG_PATH,
      (aData: string) =>
        of(isNotNil(aData) ? parse(aData) : {}).pipe(
          map(_updateLaunchConfig),
          map(result => stringify(result, undefined, 2))
        ),
      host
    ).pipe(mapTo(host));
  };
}
