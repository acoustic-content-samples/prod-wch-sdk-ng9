import { createVersionString, Logger } from '@acoustic-content-sdk/api';
import {
  addImportToModule,
  Change,
  createLoggerService,
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
  chain,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree
} from '@angular-devkit/schematics';
import { MonoTypeOperatorFunction, of } from 'rxjs';
import { endWith, ignoreElements, map } from 'rxjs/operators';
import { SourceFile } from 'typescript';

import { splitArray } from '../utils/split';
import { findAllModules, isBaseModule } from './../typescript/modules';
import { MODULE, VERSION } from './../version';
import { addPeerDependencies } from './add.peer.dependencies';
import { AddFeatureModuleToApplicationSchema } from './feature.module.schema';
import { findPackageName } from './utils';

const selectMain = pluckPath<string>(['architect', 'build', 'options', 'main']);

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
 * Adds an import classifier
 *
 * @param aSrcFile - source file
 * @param aModule - module name, may contain a '#' to discriminate between import path and module name
 * @param aPath - fallback import path
 *
 * @returns the list of changes
 */
function addImport(
  aSrcFile: SourceFile,
  aModule: string,
  aPath: string
): Change[] {
  // module name and import path
  let moduleName = aModule;
  let importPath = aPath;
  // check if this is full reference
  const idx = aModule.indexOf('#');
  if (idx >= 0) {
    // split
    const path = aModule.substr(0, idx);
    moduleName = aModule.substr(idx + 1);
    // check the path
    if (isNotEmpty(path)) {
      importPath = path;
    }
  }
  // actually add the import
  return addImportToModule(aSrcFile, aSrcFile.fileName, moduleName, importPath);
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

  const addModule = (host: Tree, context: SchematicContext) => {
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
            dst.concat(addImport(srcFile, mod, path)),
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
    return rxPipe(updates$, ignoreElements(), endWith(host));
  };

  // peer dependencies
  const addPeers = addPeerDependencies(options);

  return (host: Tree, context: SchematicContext) =>
    chain([addModule, addPeers])(host, context);
}
