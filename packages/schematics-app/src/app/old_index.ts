import {
  chain,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
  addImportToModule,
  changeSourceFile,
  findSdkVersion,
  getAppModulePath,
  getWorkspace,
  insertImport,
  insertLines,
  ProjectType,
  rxTransformJsonFile,
  rxTransformLinesFile,
  WorkspaceProject,
  WorkspaceSchema
} from '@acoustic-content-sdk/schematics-utils';
import { cloneDeep } from '@acoustic-content-sdk/utils';
import { Observable, of } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';

import { Schema } from './schema';
import { updateAppComponentHtml } from './update.app.component.html';
import { updateAppConfig } from './update.app.config';
import { addToDevEnv, addToProdEnv } from './update.environment';
import { updateAppRoutingModule } from './update.router';
import { updateTypings } from './update.typings';
import { updateWchtoolsOptions } from './update.wchtoolsoptions';

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

      // import AcNgModule
      changeSourceFile(
        modulePath,
        (path, source) =>
          addImportToModule(
            source,
            path,
            'AcNgModule.forRoot(environment)',
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

      // import AcNgEditModule
      if (!!options.editable) {
        changeSourceFile(
          modulePath,
          (path, source) =>
            addImportToModule(
              source,
              path,
              'AcNgEditModule.forRoot()',
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

function updatePackageJson(
  options: Schema,
  project: WorkspaceProject<ProjectType>
): Rule {
  return (host: Tree, context: SchematicContext) => {
    // SDK version
    const rxSdkVersion = findSdkVersion(host);

    return rxSdkVersion.pipe(
      // transform the file
      switchMap((sdkVersion) =>
        rxTransformJsonFile(
          'package.json',
          (aPkgJson: any) => {
            // build the version
            const minVersion = `^${sdkVersion}`;

            // clone
            const pkgJson = cloneDeep(aPkgJson);

            const dependencies = pkgJson.dependencies;
            const devDependencies = pkgJson.devDependencies;

            // SDK dependencies
            dependencies['@acoustic-content-sdk/ng'] = minVersion;
            dependencies['@acoustic-content-sdk/api'] = minVersion;
            dependencies['@acoustic-content-sdk/utils'] = minVersion;
            devDependencies['@acoustic-content-sdk/cli'] = minVersion;
            devDependencies['@acoustic-content-sdk/schematics'] = minVersion;
            // check if editable
            if (options.editable) {
              dependencies['@acoustic-content-sdk/ng-edit'] = minVersion;
            }

            // tools
            devDependencies['npm-run-all'] = '^4.1.5';
            devDependencies['cpx'] = '^1.5.0';

            // add the config section
            const cfg: any = pkgJson.config || (pkgJson.config = {});
            cfg.root = '/';
            cfg.name = options.project;
            cfg.src = './src';
            cfg.data = './data';

            const CLI = 'ibm-wch-sdk-cli';
            const SCHEMATICS = 'ng g @acoustic-content-sdk/schematics';
            // add the commands

            // add scripts
            const scripts = pkgJson.scripts || (pkgJson.scripts = {});
            scripts[
              'build:production'
            ] = `${CLI} build production --skipSourcemaps --relative`;
            scripts[
              'build:development'
            ] = `${CLI} build development --relative`;
            scripts['run:wchtools'] = `${CLI} run wchtools`;
            scripts['deploy:purge'] = `${CLI} application purge`;
            scripts[
              'deploy:push'
            ] = `${CLI} application push --verbose --override --aggregated`;
            scripts['gen:canonicalize'] = `${CLI} canonicalize assets`;
            scripts['gen:components'] = `${SCHEMATICS}:components`;
            scripts['gen:layouts'] = `${SCHEMATICS}:layouts`;
            scripts['gen:pagetype'] = `${CLI} create pagetype --scss --type`;
            scripts[
              'gen:pull'
            ] = `cpx ./data/.wchtoolsoptions.json ./tmp/ && ${CLI} application pull --data ./tmp/`;
            scripts['package:addBaseUrl'] = `${CLI} add base --relative`;
            scripts['package:addEsiPolyfill'] = `${CLI} add esi-polyfill`;
            scripts[
              'package:addManifest'
            ] = `${CLI} add webappmanifest --relative`;
            scripts['package:addPrefetch'] = `${CLI} add prefetch --relative`;
            scripts['package:compress'] = `${CLI} compress assets`;
            scripts['package:copyResources'] = `${CLI} copy build`;
            scripts['package:createSite'] = `${CLI} create site`;
            scripts['show:types'] = `${CLI} show types`;
            scripts['show:url'] = `${CLI} show url`;

            scripts[
              'package:production'
            ] = `npm-run-all package:copyResources package:addPrefetch package:addBaseUrl package:addManifest package:addEsiPolyfill package:createSite`;

            scripts['deploy'] =
              'npm-run-all build:production package:production deploy:push show:url';

            // add the dependency section
            pkgJson['wchtools-dependencies'] = [cfg.data];

            return of(pkgJson);
          },
          host
        )
      ),
      mapTo(host)
    );
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
    const workspace = getWorkspace(host);
    if (!options.project) {
      throw new SchematicsException('Option "project" is required.');
    }
    const project = workspace.projects[options.project];
    if (project.projectType !== 'application') {
      throw new SchematicsException('Project must be of type "application".');
    }

    // update the packages
    context.addTask(new NodePackageInstallTask());

    return chain([
      updatePackageJson(options, project),
      updateWchtoolsOptions(options, project),
      updateEnvironment(options, project),
      updateAppModule(options, project),
      updateAppConfig(options, project),
      updateAppRoutingModule(options, project),
      updateGitIgnore(options, project, workspace),
      updateTypings(options, project),
      updateAppComponentHtml(options, project)
    ])(host, context);
  };
}
