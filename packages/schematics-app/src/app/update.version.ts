import { rxApplyTemplates, rxReadTemplates } from '@acoustic-content-sdk/hbs-tooling';
import {
  createLoggerService,
  findProjectName,
  getWorkspace,
  writeFilesOnTree,
} from '@acoustic-content-sdk/schematics-utils';
import { FileDescriptor } from '@acoustic-content-sdk/tooling';
import { jsonParse, rxPipe } from '@acoustic-content-sdk/utils';
import { normalize } from '@angular-devkit/core';
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { join } from 'path';
import { Observable, of } from 'rxjs';
import { endWith, ignoreElements, map, mergeMap } from 'rxjs/operators';

import { getVersion } from '../utilities/version';
import { ASSETS_DIR$ } from './../utilities/assets';
import { Schema } from './schema';

const KEY_VERSION_STRING = 'VERSION_STRING';

const LOGGER = 'updateVersion';

export function updateVersion(options: Schema): Rule {
  // locate the template dir
  const root$ = rxPipe(
    ASSETS_DIR$,
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
   * @param aVersion - the version string
   * @returns list of file descriptors
   */
  function generateTemplates(
    aVersion: string
  ): Observable<FileDescriptor<string>> {
    // handlebars context
    const ctx$ = of({ [KEY_VERSION_STRING]: aVersion });
    // apply the templates
    return rxApplyTemplates(ctx$, templates$);
  }

  return (host: Tree, context: SchematicContext) => {
    // some logger
    const logSvc = createLoggerService(context);
    const logger = logSvc.get(LOGGER);
    // find the workspace
    const workspace = getWorkspace(host);
    // the project
    const projectName = findProjectName(workspace, options);
    // locate the project options
    const project = workspace.projects[projectName];
    // source folder
    const sourceFolder = normalize(
      project.sourceRoot ? `/${project.sourceRoot}` : `/${project.root}/src`
    );
    // actual version
    const version = getVersion(
      jsonParse(host.read('/package.json').toString())
    );
    logger.info('Version', version);
    // files
    return rxPipe(
      generateTemplates(version),
      writeFilesOnTree(host, sourceFolder),
      ignoreElements(),
      endWith(host)
    );
  };
}
