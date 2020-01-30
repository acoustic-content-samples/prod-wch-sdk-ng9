import { LoggerService } from '@acoustic-content-sdk/api';
import {
  rxApplyTemplates,
  rxReadTemplates
} from '@acoustic-content-sdk/hbs-tooling';
import {
  canonicalizeJson,
  createFileDescriptor,
  FileDescriptor,
  ReadTextFile,
  rxReadJsonFile,
  serializeJson
} from '@acoustic-content-sdk/tooling';
import {
  cloneDeep,
  isNil,
  NOOP_LOGGER_SERVICE,
  opShareLast,
  rxPipe,
  rxSelectProperty
} from '@acoustic-content-sdk/utils';
import { join } from 'path';
import { merge, Observable, of } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';

import { ASSET_ROOT$ } from '../../utils/assets';
import { GenerateFeatureModuleSchema } from './generate.feature.module.schema';

const LOGGER = 'generateFeatureModule';

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
 * Command to add `ng-add` support to a feature module.
 *
 * @param options - the schematics object used to describe the feature module
 *
 * @returns the command
 */
export function generateFeatureModule(options: GenerateFeatureModuleSchema) {
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

  return (
    aReadText: ReadTextFile,
    aLogSvc?: LoggerService
  ): Observable<FileDescriptor<string>> => {
    // some logger
    const logSvc = aLogSvc || NOOP_LOGGER_SERVICE;
    const logger = logSvc.get(LOGGER);
    // logging
    const logFile = () =>
      tap<FileDescriptor<any>>(([name]) => logger.info(name));
    // find the package
    const pkgFile = '/package.json';
    const pkg$ = rxPipe(rxReadJsonFile<any>(pkgFile, aReadText), opShareLast);
    // the name
    const packageName$ = rxPipe(pkg$, rxSelectProperty('name'));
    // handlebars context
    const ctx$ = rxPipe(
      packageName$,
      map((packageName) => ({ packageName, ngModule }))
    );
    // apply the templates
    const files$ = rxApplyTemplates(ctx$, templates$);
    // package
    const package$ = rxPipe(
      pkg$,
      mergeMap((pkgData) => updatePackageJson(pkgData, ROOT_FOLDER)),
      map(canonicalizeJson),
      map(serializeJson),
      map((data) => createFileDescriptor(pkgFile, data))
    );
    // merge these changes
    return rxPipe(merge(files$, package$), logFile());
  };
}
