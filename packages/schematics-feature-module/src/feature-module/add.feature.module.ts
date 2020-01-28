import {
  addImportToModule,
  Change,
  findProjectName,
  getWorkspace,
  insertChanges,
  ProjectType,
  WorkspaceProject
} from '@acoustic-content-sdk/schematics-utils';
import { firstElement, isNil } from '@acoustic-content-sdk/utils';
import {
  Rule,
  SchematicContext,
  SchematicsException,
  Tree
} from '@angular-devkit/schematics';

import { splitArray } from '../utils/split';
import {
  findAllModules,
  isBaseModule,
  WCH_NG_APP_BASE_MODULE
} from './../typescript/modules';
import { AddFeatureModuleToApplicationSchema } from './feature.module.schema';

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
  // split the modules
  const modules = splitArray(options.module);

  return (host: Tree, context: SchematicContext) => {
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
    const module = firstElement(
      findAllModules(host, srcRoot).filter(isBaseModule)
    );
    if (isNil(module)) {
      throw new SchematicsException(
        `Cannot find an "NgModule" importing "${WCH_NG_APP_BASE_MODULE}".`
      );
    }
    // insert the modules
    const [, srcFile] = module;
    const importPath = 'importPath';
    const changes = modules.reduce(
      (dst: Change[], mod: string) =>
        dst.concat(
          addImportToModule(srcFile, srcFile.fileName, mod, importPath)
        ),
      []
    );
    // update
    const recorder = host.beginUpdate(srcFile.fileName);
    insertChanges(changes, recorder);

    host.commitUpdate(recorder);

    // returns the tree
    return host;
  };
}
