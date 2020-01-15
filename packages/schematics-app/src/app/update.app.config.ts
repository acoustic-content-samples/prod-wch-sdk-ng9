import { dirname, Path, relative, resolve } from '@angular-devkit/core';
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  getAppModulePath,
  ProjectType,
  rxTransformTextFile,
  WorkspaceProject
} from '@acoustic-content-sdk/schematics-utils';
import { of } from 'rxjs';
import { mapTo } from 'rxjs/operators';

import { Schema } from './schema';
import { WCHTOOLS_OPTIONS_PATH } from './update.wchtoolsoptions';

export function updateAppConfig(
  options: Schema,
  project: WorkspaceProject<ProjectType>
): Rule {
  return (host: Tree, context: SchematicContext) => {
    // sanity check on the type
    if (project.projectType === ProjectType.Application) {
      // we can safely cast
      const appProject = project as WorkspaceProject<ProjectType.Application>;

      const mainPath = appProject.architect!.build!.options.main;
      const appModulePath = getAppModulePath(host, mainPath) as Path;

      // position of the file
      const configPath = resolve(appModulePath, '../app.config.ts' as Path);
      const relPath = relative(dirname(configPath), WCHTOOLS_OPTIONS_PATH);

      return rxTransformTextFile(
        configPath,
        (aSourceFile: string, aPath: string) => {
          const result = !!aSourceFile
            ? aSourceFile
            : `// import the options file
        import * as OPTIONS from '${relPath}';

        /**
         * Returns the API URL from the wchtools options file, so we have a single
         * source. This has to be a function, otherwise it would not work with AOT.
         */
        export function apiUrl(): string {
          return OPTIONS['x-ibm-dx-tenant-base-url'];
        }
        `;

          return of(result);
        },
        host
      ).pipe(mapTo(host));
    }
    // default
    return host;
  };
}
