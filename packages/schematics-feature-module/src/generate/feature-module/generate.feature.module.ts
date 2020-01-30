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

import { GenerateFeatureModuleSchema } from './generate.feature.module.schema';

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
export function generateFeatureModuleSchematic(
  options: GenerateFeatureModuleSchema
): Rule {
  // construct the command
  const generate = generateFeatureModule(options);

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
    // files
    return rxPipe(
      generate(readFile, logSvc),
      writeFilesOnTree(host, rootFolder),
      count(),
      mapTo(host)
    );
  };
}
