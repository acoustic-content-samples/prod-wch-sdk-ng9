import {
  addImportToModule,
  changeSourceFile,
  getAppModulePath,
  insertImport,
  insertLines,
  ProjectType,
  rxTransformLinesFile,
  WorkspaceProject,
  WorkspaceSchema
} from '@acoustic-content-sdk/schematics-utils';
import {
  chain,
  Rule,
  SchematicContext,
  Tree
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { Observable, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';

import { generateModeFiles } from './generate.modes';
import { Schema } from './schema';
import { updateAngularJson } from './update.angular.json';
import { updateAppComponentHtml } from './update.app.component.html';
import { addToDevEnv, addToProdEnv } from './update.environment';
import { updatePackageJson } from './update.package.json';

function updateEnvironment(
  options: Schema,
  project: WorkspaceProject<ProjectType>
): Rule {
  return (host: Tree, context: SchematicContext) => {
    // root
    const src = project.sourceRoot || 'src';
    // fix dev environment
    changeSourceFile(
      `/${src}/environments/environment.ts`,
      (path, source) => addToDevEnv(source, path, context.logger),
      host
    );
    // fix prod environment
    changeSourceFile(
      `/${src}/environments/environment.prod.ts`,
      (path, source) => addToProdEnv(source, path, context.logger),
      host
    );

    return host;
  };
}

const GITIGNORE = [
  '*.tgz',
  '.wchtoolshashes',
  '*.conflict',
  'wchtools*.log',
  '*.$gen',
  'yarn-error.log',
  'tmp/',
  'yarn.lock',
  'package-lock.json',
  '**.log.*',
  'data/assets/index.html',
  'doc/',
  '.history/'
];

function updateGitIgnore(
  options: Schema,
  project: WorkspaceProject<ProjectType>,
  workspace: WorkspaceSchema
): Rule {
  // the options
  const opts = [...GITIGNORE, `data/assets/${workspace.defaultProject}`];

  return (host: Tree, context: SchematicContext): Observable<Tree> =>
    rxTransformLinesFile(
      '.gitignore',
      (lines: string[]) => of(insertLines(lines, opts)),
      host
    ).pipe(mapTo(host));
}

function updateAppModule(
  options: Schema,
  project: WorkspaceProject<ProjectType>
): Rule {
  return (host: Tree, context: SchematicContext) => {
    // sanity check on the type
    if (project.projectType === ProjectType.Application) {
      // we can safely cast
      const appProject = project as WorkspaceProject<ProjectType.Application>;

      const mainPath = appProject.architect!.build!.options.main;
      const modulePath = getAppModulePath(host, mainPath);

      // import WchNgModule
      changeSourceFile(
        modulePath,
        (path, source) =>
          addImportToModule(
            source,
            path,
            'WchNgModule.forRoot(environment)',
            '@acoustic-content-sdk/ng'
          ),
        host
      );

      // import router
      changeSourceFile(
        modulePath,
        (path, source) =>
          addImportToModule(
            source,
            path,
            'AppRoutingModule',
            './app-routing.module'
          ),
        host
      );

      // import environment
      changeSourceFile(
        modulePath,
        (path, source) => [
          insertImport(
            source,
            path,
            'environment',
            '../environments/environment'
          )
        ],
        host
      );

      // import WchNgEditModule
      if (!!options.editable) {
        changeSourceFile(
          modulePath,
          (path, source) =>
            addImportToModule(
              source,
              path,
              'WchNgEditModule.forRoot()',
              '@acoustic-content-sdk/ng-edit'
            ),
          host
        );
      }
    }
    // done
    return host;
  };
}

/**
 * Adds SDK support to an existing Angular application
 *
 * @param options - the schematics object used to describe the applicatiojn
 *
 * @returns the schematics rule that executes the transform
 */
export function addToApplication(options: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {
    // update the packages
    context.addTask(new NodePackageInstallTask());

    return chain([
      updateAngularJson(options),
      generateModeFiles(options),
      updatePackageJson(options),
      updateAppComponentHtml(options)

      /*
      updateWchtoolsOptions(options, project),
      updateEnvironment(options, project),
      updateAppModule(options, project),
      updateAppConfig(options, project),
      updateAppRoutingModule(options, project),
      updateGitIgnore(options, project, workspace),
      updateTypings(options, project)*/
    ])(host, context);
  };
}
