import {
  rxApplyTemplates,
  rxReadTemplates
} from '@acoustic-content-sdk/hbs-tooling';
import {
  createLoggerService,
  findProjectName,
  getWorkspace,
  rxTransformJsonFile,
  writeFilesOnTree
} from '@acoustic-content-sdk/schematics-utils';
import {
  createFileDescriptor,
  FileDescriptor
} from '@acoustic-content-sdk/tooling';
import {
  cloneDeep,
  isNil,
  jsonParse,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { normalize } from '@angular-devkit/core';
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { join } from 'path';
import { merge, Observable, of } from 'rxjs';
import { count, map, mapTo, mergeMap, tap } from 'rxjs/operators';

import { ASSET_ROOT$ } from '../../utils/assets';
import { GenerateFeatureModuleSchema } from './generate.feature.module.schema';

const LOGGER = 'addFeatureModuleSchematic';

const KEY_SCHEMATICS = 'schematics';

const ROOT_FOLDER = 'assets';

function updatePackageJson(aPkg: any, aRoot: string): Observable<any> {
  const newPkg = cloneDeep(aPkg);
  if (isNil(newPkg[KEY_SCHEMATICS])) {
    newPkg[KEY_SCHEMATICS] = `./${aRoot}/collection.json`;
  }
  return of(newPkg);
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
export function generateFeatureModuleSchematic(
  options: GenerateFeatureModuleSchema
): Rule {
  // extract the module
  const ngModule = options.module;
  // locate the template dir
  const root$ = rxPipe(
    ASSET_ROOT$,
    map((root) => join(root, 'feature-module'))
  );
  // templates
  const templates$ = rxPipe(
    root$,
    mergeMap((dir) => rxReadTemplates(dir))
  );

  return (host: Tree, context: SchematicContext) => {
    // some logger
    const logSvc = createLoggerService(context);
    const logger = logSvc.get(LOGGER);
    // logging
    const logFile = () =>
      tap<FileDescriptor<any>>(([name]) => logger.info(name));
    // find the workspace
    const workspace = getWorkspace(host);
    // the project
    const projectName = findProjectName(workspace, options);
    // locate the project options
    const project = workspace.projects[projectName];
    // find the package
    const pkgFile = join(project.root, 'package.json');
    const pkg = jsonParse<any>(host.read(pkgFile).toString('utf-8'));
    // the name
    const packageName = pkg.name;
    // handlebars context
    const ctx$ = of({ packageName, ngModule });
    // apply the templates
    const files$ = rxPipe(
      rxApplyTemplates(ctx$, templates$),
      writeFilesOnTree(host, normalize(ROOT_FOLDER))
    );
    // package
    const pkg$ = rxPipe(
      rxTransformJsonFile(
        pkgFile,
        (pkgData: any) => updatePackageJson(pkgData, ROOT_FOLDER),
        host
      ),
      map((data) => createFileDescriptor(pkgFile, data))
    );
    // merge these changes
    const all$ = rxPipe(merge(files$, pkg$), logFile());
    // apply
    return rxPipe(all$, count(), mapTo(host));
  };
}
