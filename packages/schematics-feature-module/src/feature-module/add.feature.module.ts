import { createVersionString, Logger } from '@acoustic-content-sdk/api';
import {
  addImportToModule,
  Change,
  createLoggerService,
  findPackageJson,
  findProjectName,
  getAppModulePath,
  getSourceFile,
  getWorkspace,
  insertChanges,
  ProjectType,
  WorkspaceProject
} from '@acoustic-content-sdk/schematics-utils';
import {
  firstElement,
  isNotEmpty,
  isNotNil,
  pluckPath,
  rxNext,
  rxPipe
} from '@acoustic-content-sdk/utils';
import {
  Rule,
  SchematicContext,
  SchematicsException,
  Tree
} from '@angular-devkit/schematics';
import { parse } from 'path';
import { MonoTypeOperatorFunction, Observable, of } from 'rxjs';
import { map, mapTo, tap } from 'rxjs/operators';
import { SourceFile } from 'typescript';

import { splitArray } from '../utils/split';
import { findAllModules, isBaseModule } from './../typescript/modules';
import { MODULE, VERSION } from './../version';
import { AddFeatureModuleToApplicationSchema } from './feature.module.schema';

const selectSchema = pluckPath<string>(['schematic', 'description', 'schema']);
const selectPackageName = pluckPath<string>(['name']);
const selectMain = pluckPath<string>(['architect', 'build', 'options', 'main']);

/**
 * Locates the package name
 *
 * @param context - the schematic context
 * @returns the name of the package running the schematic
 */
function findPackageName(context: SchematicContext): Observable<string> {
  // find the schema
  const schema = selectSchema(context);
  const { dir } = parse(schema);
  // locate the package
  return rxPipe(findPackageJson(dir), map(selectPackageName));
}

const LOGGER = 'addFeatureModuleToApplication';

/**
 * Locates the source file for the application module
 *
 * @param aHost  - the host
 * @param aProject - the selected project
 * @param aLogger - some logging
 *
 * @returns the source file
 */
function findAppModule(
  aHost: Tree,
  aProject: WorkspaceProject<ProjectType.Application>,
  aLogger: Logger
): SourceFile {
  // access the root folder
  const srcRoot = aProject.sourceRoot;
  // locate the main module
  const baseModule = firstElement(
    findAllModules(aHost, srcRoot).filter(isBaseModule)
  );
  if (isNotNil(baseModule)) {
    // insert the modules
    const [moduleName, srcFile] = baseModule;
    // log the base module
    aLogger.info('AppModule', moduleName, srcFile.fileName);
    // returns the source file
    return srcFile;
  }
  // try to locate it using the default way
  const mainPath = selectMain(aProject);
  const modulePath = getAppModulePath(aHost, mainPath);
  // log the base module
  aLogger.info('AppModule', modulePath);
  // load the file
  return getSourceFile(aHost, modulePath);
}

/**
 * Adds a feature module to an application. The feature module is defined as part of the input options.
 * The schematics fill locate the correct application module and then imports the feature module into the
 * application module.
 *
 * The command is modeled such that it can be referenced from a feature module without any additional coding involved.
 *
 * @param options - the schematics object used to describe the feature module
 *
 * @returns the schematics rule that executes the transform
 */
export function addFeatureModuleToApplication(
  options: AddFeatureModuleToApplicationSchema
): Rule {
  // access the parameters
  const { module, importPath } = options;
  // split the modules
  const modules = splitArray(module);

  return (host: Tree, context: SchematicContext) => {
    // some logger
    const logSvc = createLoggerService(context);
    const logger = logSvc.get(LOGGER);
    // logging
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);
    // log some version information
    logger.info(MODULE, createVersionString(VERSION));
    // access the position of the schema
    const importPath$ = isNotEmpty(importPath)
      ? of(importPath)
      : findPackageName(context);
    // find the workspace
    const workspace = getWorkspace(host);
    // the project
    const projectName = findProjectName(workspace, options);
    // locate the project options
    const project = workspace.projects[projectName];
    if (project.projectType !== ProjectType.Application) {
      throw new SchematicsException(
        `Project must be of type "${ProjectType.Application}".`
      );
    }
    // we can safely cast
    const appProject = project as WorkspaceProject<ProjectType.Application>;
    // locate the source file
    const srcFile = findAppModule(host, appProject, logger);
    // apply the changes
    const changes$ = rxPipe(
      importPath$,
      map((path) =>
        modules.reduce(
          (dst: Change[], mod: string) =>
            dst.concat(addImportToModule(srcFile, srcFile.fileName, mod, path)),
          []
        )
      ),
      log('changes')
    );
    // updates
    const updates$ = rxPipe(
      changes$,
      map((changes) => {
        // update
        const recorder = host.beginUpdate(srcFile.fileName);
        insertChanges(changes, recorder);

        host.commitUpdate(recorder);
      })
    );
    // returns the tree
    return rxPipe(updates$, mapTo(host));
  };
}
