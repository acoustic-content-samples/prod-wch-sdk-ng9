import {
  addImportToModule,
  Change,
  createLoggerService,
  findPackageJson,
  findProjectName,
  getWorkspace,
  insertChanges,
  ProjectType,
  WorkspaceProject
} from '@acoustic-content-sdk/schematics-utils';
import {
  firstElement,
  isNil,
  isNotEmpty,
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
import { map, mapTo } from 'rxjs/operators';

import { splitArray } from '../utils/split';
import {
  findAllModules,
  isBaseModule,
  WCH_NG_APP_BASE_MODULE
} from './../typescript/modules';
import { AddFeatureModuleToApplicationSchema } from './feature.module.schema';

const selectSchema = pluckPath<string>(['schematic', 'description', 'schema']);
const selectPackageName = pluckPath<string>(['name']);

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
 * Adds SDK support to an existing Angular application
 *
 * @param options - the schematics object used to describe the applicatiojn
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
    const srcRoot = appProject.sourceRoot;
    // locate the main module
    const baseModule = firstElement(
      findAllModules(host, srcRoot).filter(isBaseModule)
    );
    if (isNil(baseModule)) {
      throw new SchematicsException(
        `Cannot find an "NgModule" importing "${WCH_NG_APP_BASE_MODULE}".`
      );
    }
    // insert the modules
    const [moduleName, srcFile] = baseModule;
    // log the base module
    logger.info('AppModule', moduleName, srcFile.fileName);
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
