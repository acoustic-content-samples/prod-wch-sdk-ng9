import {
  rxApplyTemplates,
  rxReadTemplates
} from '@acoustic-content-sdk/hbs-tooling';
import {
  createLoggerService,
  findProjectName,
  getWorkspace,
  readTextFileOnTree,
  writeFilesOnTree
} from '@acoustic-content-sdk/schematics-utils';
import { FileDescriptor } from '@acoustic-content-sdk/tooling';
import { rxPipe } from '@acoustic-content-sdk/utils';
import { normalize, Path } from '@angular-devkit/core';
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { join } from 'path';
import { env } from 'process';
import { Observable, of } from 'rxjs';
import { endWith, ignoreElements, map, mergeMap } from 'rxjs/operators';

import { ASSET_ROOT$ } from './../../utils/assets';
import { GenerateVersionSchema } from './generate.version.schema';

const KEY_NPM_VERSION = 'npm_package_version';

const KEY_VERSION_STRING = 'VERSION_STRING';

/**
 * Adds consistent version information
 *
 * @param options - the schematics object used to describe the version
 *
 * @returns the schematics rule that executes the transform
 */
export function generateVersionSchematic(options: GenerateVersionSchema): Rule {
  // detect version
  const version = options.version || env[KEY_NPM_VERSION];

  // locate the template dir
  const root$ = rxPipe(
    ASSET_ROOT$,
    map((root) => join(root, 'version'))
  );
  // templates
  const templates$ = rxPipe(
    root$,
    mergeMap((dir) => rxReadTemplates(dir))
  );

  /**
   * Generates the version information source files
   *
   * @param aSrcRoot - the target root file
   * @returns list of file descriptors
   */
  function generateTemplates(): Observable<FileDescriptor<string>> {
    // handlebars context
    const ctx$ = of({ [KEY_VERSION_STRING]: version });
    // apply the templates
    return rxApplyTemplates(ctx$, templates$);
  }

  /**
   * Constructs a rule that produces the templates
   *
   * @param aSrcRoot - source root
   * @returns the rule
   */
  function generateTemplatesRule(aSrcRoot: Path): Rule {
    return (host: Tree) => {
      // files
      return rxPipe(
        generateTemplates(),
        writeFilesOnTree(host, aSrcRoot),
        ignoreElements(),
        endWith(host)
      );
    };
  }

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
    // source folder
    const sourceFolder = normalize(
      project.sourceRoot ? `/${project.sourceRoot}` : `/${project.root}/src`
    );
    // generate the callbacks
    const readFile = readTextFileOnTree(host, rootFolder);

    return generateTemplatesRule(sourceFolder)(host, context);
  };
}
