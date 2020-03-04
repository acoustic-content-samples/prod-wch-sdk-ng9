import {
  createLoggerService,
  findProjectName,
  getWorkspace,
  readTextFileOnTree,
  writeFilesOnTree
} from '@acoustic-content-sdk/schematics-utils';
import { generateFeatureModule } from '@acoustic-content-sdk/tooling-feature-module';
import { rxPipe } from '@acoustic-content-sdk/utils';
import { normalize } from '@angular-devkit/core';
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { count, mapTo } from 'rxjs/operators';

import { GenerateVersionSchema } from './generate.version.schema';

/**
 * Adds consistent version information
 *
 * @param options - the schematics object used to describe the version
 *
 * @returns the schematics rule that executes the transform
 */
export function generateVersionSchematic(options: GenerateVersionSchema): Rule {
  return (host: Tree, context: SchematicContext) => {
    // some logger
    const logSvc = createLoggerService(context);
    // find the workspace
    const workspace = getWorkspace(host);
    // the project
    const projectName = findProjectName(workspace, options);
    // locate the project options
    const project = workspace.projects[projectName];
    // root folder
    const rootFolder = normalize(project.root);
    // generate the callbacks
    const readFile = readTextFileOnTree(host, rootFolder);
  };
}
