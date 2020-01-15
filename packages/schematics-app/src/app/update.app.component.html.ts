import { Path, resolve } from '@angular-devkit/core';
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  getAppModulePath,
  ProjectType,
  rxTransformTextFile,
  WorkspaceProject
} from '@acoustic-content-sdk/schematics-utils';
import { isNotNil } from '@acoustic-content-sdk/utils';
import { of } from 'rxjs';
import { mapTo } from 'rxjs/operators';

import { Schema } from './schema';

const DEFAULT_CONTENT_REGEXP = /((?:.|\r|\n)*)(<!--[\s\w\.]*below[\s\w\.]*replaced[\s\w\.]*-->(?:.|\r|\n)*)/;

const DEFAULT_CONTENT = `
<!-- Schematics app default content -->
<router-outlet></router-outlet>
`;

/**
 * Replace the default content with the router outlet
 *
 * @param aHtml
 */
function _updateAppComponentHtml(aHtml: string): string {
  // replace
  return isNotNil(aHtml)
    ? aHtml.replace(DEFAULT_CONTENT_REGEXP, `\$1${DEFAULT_CONTENT}`)
    : aHtml;
}

export function updateAppComponentHtml(
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
      const htmlPath = resolve(appModulePath, '../app.component.html' as Path);

      return rxTransformTextFile(
        htmlPath,
        (aSourceFile: string, aPath: string) =>
          of(_updateAppComponentHtml(aSourceFile)),
        host
      ).pipe(mapTo(host));
    }
    // default
    return host;
  };
}
