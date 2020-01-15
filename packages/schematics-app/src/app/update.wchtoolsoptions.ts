import { Path } from '@angular-devkit/core';
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  ProjectType,
  rxTransformJsonFile,
  validateApiUrl,
  WorkspaceProject
} from '@acoustic-content-sdk/schematics-utils';
import { Observable } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';

import { Schema } from './schema';

export const WCHTOOLS_OPTIONS_PATH: Path = '/data/.wchtoolsoptions.json' as Path;

export function updateWchtoolsOptions(
  options: Schema,
  project: WorkspaceProject<ProjectType>
): Rule {
  return (host: Tree, context: SchematicContext): Observable<Tree> =>
    rxTransformJsonFile(
      WCHTOOLS_OPTIONS_PATH,
      (aOpts: any) =>
        validateApiUrl(options.url, false).pipe(
          map(url => ({
            ...aOpts,
            'x-ibm-dx-tenant-base-url': url
          }))
        ),
      host
    ).pipe(mapTo(host));
}
