import {
  createCompiler,
  TemplateType
} from '@acoustic-content-sdk/hbs-tooling';
import {
  findProjectName,
  getAppModulePath,
  getSourceFile,
  getWorkspace,
  rxReadTextFile,
  rxTransformTextFile
} from '@acoustic-content-sdk/schematics-utils';
import { ArtifactMode } from '@acoustic-content-sdk/tooling-contributions';
import {
  isNotEmpty,
  isNotNil,
  opShareLast,
  pluckPath,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { normalize } from '@angular-devkit/core';
import { Rule, Tree } from '@angular-devkit/schematics';
import { join, parse } from 'path';
import { merge, Observable, of, UnaryFunction } from 'rxjs';
import { endWith, ignoreElements, map, mergeMap } from 'rxjs/operators';
import {
  isImportDeclaration,
  isImportSpecifier,
  isNamedImports,
  isStringLiteral,
  SourceFile
} from 'typescript';

import {
  findBootstrapComponent,
  findBootstrapImport,
  findNgModule,
  isNgModuleDecorator
} from '../utilities/ast.utils';
import { addModeToName } from '../utilities/names';
import {
  importFromFileToFile,
  relativeFileToFile,
  resolveRelativePath
} from '../utilities/path';
import { ASSETS_DIR$ } from './../utilities/assets';
import { Schema } from './schema';
import { KEY_MAIN, KEY_POLYFILLS, KEY_TS_CONFIG } from './update.angular.json';

const NAME_APP_MODE_MODULE = 'app.mode.module.ts';
const NAME_APP_BASE_MODULE = 'app.base.module.ts';
const NAME_MAIN = 'main.ts';
const NAME_TSCONFIG = 'tsconfig.json';
const NAME_APP_MODULE = 'app.module.ts';

const KEY_ORIGINAL_ENV_PATH = 'ORIGINAL_ENV_PATH';
const KEY_ORIGINAL_COMPONENT_PATH = 'ORIGINAL_COMPONENT_PATH';
const KEY_ORIGINAL_APP_MODULE_PATH = 'ORIGINAL_APP_MODULE_PATH';
const KEY_ORIGINAL_APP_MODULE = 'ORIGINAL_APP_MODULE';
const KEY_ORIGINAL_COMPONENT = 'ORIGINAL_COMPONENT';
const KEY_ACOUSTIC_APP_MODULE = 'ACOUSTIC_APP_MODULE';
const KEY_ACOUSTIC_APP_MODULE_PATH = 'ACOUSTIC_APP_MODULE_PATH';
const KEY_ACOUSTIC_APP_BASE_PATH = 'KEY_ACOUSTIC_APP_BASE_PATH';
const KEY_ORIGINAL_CONFIG_PATH = 'ORIGINAL_CONFIG_PATH';
const KEY_MAIN_FILE = 'MAIN_FILE';
const KEY_POLYFILLS_FILE = 'POLYFILLS_FILE';

const SDK_CONTEXT = {
  [ArtifactMode.ALWAYS]: {
    [KEY_ACOUSTIC_APP_MODULE]: 'WchNgAppBaseModule',
    [KEY_ACOUSTIC_APP_MODULE_PATH]: '@acoustic-content-sdk/ng-app-base'
  },
  [ArtifactMode.LIVE]: {
    [KEY_ACOUSTIC_APP_MODULE]: 'WchNgAppLiveModule',
    [KEY_ACOUSTIC_APP_MODULE_PATH]: '@acoustic-content-sdk/ng-app-live'
  },
  [ArtifactMode.PREVIEW]: {
    [KEY_ACOUSTIC_APP_MODULE]: 'WchNgAppPreviewModule',
    [KEY_ACOUSTIC_APP_MODULE_PATH]: '@acoustic-content-sdk/ng-app-preview'
  }
};

const selectBuildOptions = (aName: string) =>
  pluckPath<Record<string, any>>([
    'projects',
    aName,
    'architect',
    'build',
    'options'
  ]);

const BOOTSTRAP$ = rxPipe(
  ASSETS_DIR$,
  map((dir) => join(dir, 'bootstrap'))
);

function transformTemplate(
  aFile: string,
  aCtx: Record<string, string>,
  aTemplate: TemplateType
): Observable<string> {
  // nothing special to do
  if (isNotEmpty(aFile)) {
    return of(aFile);
  }
  // tranform
  return of(aTemplate(aCtx));
}

function contextFromAppModule(aAppModule: SourceFile): Record<string, string> {
  // the context
  const ctx: Record<string, string> = {};
  ctx[KEY_ORIGINAL_APP_MODULE_PATH] = aAppModule.fileName;
  // find the name
  const classDecl = findNgModule(aAppModule);
  if (isNotNil(classDecl)) {
    ctx[KEY_ORIGINAL_APP_MODULE] = classDecl.name.text;
    // get the bootstrap path
    const bootstrap = findBootstrapComponent(
      classDecl.decorators.find(isNgModuleDecorator)
    );
    if (isNotNil(bootstrap)) {
      ctx[KEY_ORIGINAL_COMPONENT] = bootstrap;
      const imp = findBootstrapImport(bootstrap, aAppModule);
      if (isNotNil(imp)) {
        const { dir } = parse(aAppModule.fileName);
        ctx[KEY_ORIGINAL_COMPONENT_PATH] = `${normalize(join(dir, imp))}.ts`;
      }
    }
  }
  // returns the context
  return ctx;
}

function contextFromMainModule(
  aMainModule: SourceFile
): Record<string, string> {
  // context
  const ctx: Record<string, string> = {};
  // imports
  const imp = aMainModule.statements.filter(isImportDeclaration);
  const dec = imp.find(
    (im) =>
      isNamedImports(im.importClause.namedBindings) &&
      im.importClause.namedBindings.elements.find(
        (el) => isImportSpecifier(el) && el.name.text === 'environment'
      )
  );
  // returns the import clause
  if (isNotNil(dec) && isStringLiteral(dec.moduleSpecifier)) {
    ctx[KEY_ORIGINAL_ENV_PATH] = `${resolveRelativePath(
      aMainModule.fileName,
      dec.moduleSpecifier.text
    )}.ts`;
  }
  return ctx;
}

function transformTsConfig(
  aConfig: string,
  aCtx: Record<string, string>,
  aTemplate: TemplateType
): Observable<string> {
  // sanity check
  if (isNotNil(aConfig)) {
    return of(aConfig);
  }
  // create a new config

  return of(aTemplate(aCtx));
}

function createTsConfigContext(
  aMode: ArtifactMode,
  aOptions: Record<string, any>
): Record<string, string> {
  const origTsConfig = aOptions[KEY_TS_CONFIG];
  const main = addModeToName(aOptions[KEY_MAIN], aMode);
  const { dir: modeDir } = parse(main);
  const tsConfig = `${modeDir}/${NAME_TSCONFIG}`;
  const polyfills = aOptions[KEY_POLYFILLS];
  // set up the context
  const ctx: Record<string, string> = {};
  ctx[KEY_ORIGINAL_CONFIG_PATH] = relativeFileToFile(tsConfig, origTsConfig);
  ctx[KEY_MAIN_FILE] = relativeFileToFile(tsConfig, main);
  ctx[KEY_POLYFILLS_FILE] = relativeFileToFile(tsConfig, polyfills);
  // ok
  return ctx;
}

const createTemplate = (
  aName: string,
  aCompiler: UnaryFunction<string, TemplateType>
) =>
  rxPipe(
    BOOTSTRAP$,
    mergeMap((root) => rxReadTextFile(join(root, aName))),
    map(aCompiler),
    opShareLast
  );

/**
 * Generates the files responsible for the different modes
 *
 * - `main.ts` for bootstrap
 * - `app.module.ts` for the application module
 * - `tsconfig.json` for the compiler config
 */
export function generateModeFiles(options: Schema): Rule {
  // the compiler
  const compiler = createCompiler();
  // template
  const mainTemplate$ = createTemplate(NAME_MAIN, compiler);
  const appModeTemplate$ = createTemplate(NAME_APP_MODE_MODULE, compiler);
  const appBaseTemplate$ = createTemplate(NAME_APP_BASE_MODULE, compiler);
  // template
  const tsConfigTemplate$ = createTemplate(NAME_TSCONFIG, compiler);

  function createBaseModule(
    aOptions: Record<string, any>,
    aCtx: Record<string, any>,
    aHost: Tree
  ) {
    // location of the base file
    const mainBase = addModeToName(aOptions[KEY_MAIN], ArtifactMode.ALWAYS);
    const { dir: baseDir } = parse(mainBase);
    const appBase = `${baseDir}/${NAME_APP_MODULE}`;
    // augment the context
    const ctx = {
      ...aCtx,
      ...SDK_CONTEXT[ArtifactMode.ALWAYS],
      [KEY_ORIGINAL_APP_MODULE_PATH]: importFromFileToFile(
        appBase,
        aCtx[KEY_ORIGINAL_APP_MODULE_PATH]
      )
    };
    // app file
    return rxPipe(
      appBaseTemplate$,
      mergeMap((tmp) =>
        rxTransformTextFile(
          appBase,
          (file) => transformTemplate(file, ctx, tmp),
          aHost
        )
      )
    );
  }

  /**
   * Constructs the files per mode
   *
   * @param aMode - the mode
   * @param aOptions - the options
   * @param aHost - host
   */
  function createForMode(
    aMode: ArtifactMode,
    aOptions: Record<string, any>,
    aCtx: Record<string, any>,
    aHost: Tree
  ) {
    // location of the base file
    const mainBase = addModeToName(aOptions[KEY_MAIN], ArtifactMode.ALWAYS);
    const { dir: baseDir } = parse(mainBase);
    const appBase = `${baseDir}/${NAME_APP_MODULE}`;
    // location of the main file
    const mainMode = addModeToName(aOptions[KEY_MAIN], aMode);
    // main context
    const mainCtx = {
      ...aCtx,
      ...SDK_CONTEXT[aMode],
      [KEY_ORIGINAL_ENV_PATH]: importFromFileToFile(
        mainMode,
        aCtx[KEY_ORIGINAL_ENV_PATH]
      )
    };
    // main file
    const mainMode$ = rxPipe(
      mainTemplate$,
      mergeMap((mainTemplate) =>
        rxTransformTextFile(
          mainMode,
          (file) => transformTemplate(file, mainCtx, mainTemplate),
          aHost
        )
      )
    );
    // dir of the main file
    const { dir: modeDir } = parse(mainMode);
    const appMode = `${modeDir}/${NAME_APP_MODULE}`;
    // augment the context
    const ctx = {
      ...aCtx,
      ...SDK_CONTEXT[aMode],
      [KEY_ORIGINAL_APP_MODULE_PATH]: importFromFileToFile(
        appMode,
        aCtx[KEY_ORIGINAL_APP_MODULE_PATH]
      ),
      [KEY_ORIGINAL_COMPONENT_PATH]: importFromFileToFile(
        appMode,
        aCtx[KEY_ORIGINAL_COMPONENT_PATH]
      ),
      [KEY_ACOUSTIC_APP_BASE_PATH]: importFromFileToFile(appMode, appBase)
    };
    // app file
    const app$ = rxPipe(
      appModeTemplate$,
      mergeMap((tmp) =>
        rxTransformTextFile(
          appMode,
          (file) => transformTemplate(file, ctx, tmp),
          aHost
        )
      )
    );
    // location of tsconfig
    const tsConfig = `${modeDir}/${NAME_TSCONFIG}`;
    const tsConfig$ = rxPipe(
      tsConfigTemplate$,
      mergeMap((tmp) =>
        rxTransformTextFile(
          tsConfig,
          (old) =>
            transformTsConfig(old, createTsConfigContext(aMode, aOptions), tmp),
          aHost
        )
      )
    );
    // merge
    return merge(mainMode$, app$, tsConfig$);
  }

  // the transform callback
  return (host: Tree) => {
    // get the project name
    const projectName = findProjectName(host, options);
    // filename
    const angularJson = getWorkspace(host);
    // extract the options
    const opts = selectBuildOptions(projectName)(angularJson);
    // select the main file
    const main = opts[KEY_MAIN];
    const appModule = getAppModulePath(host, main);
    // parse the app module
    const appSource = getSourceFile(host, appModule);
    const appCtx = contextFromAppModule(appSource);
    // parse the main module
    const mainSource = getSourceFile(host, main);
    const mainCtx = contextFromMainModule(mainSource);
    // merge the contexts
    const ctx = { ...appCtx, ...mainCtx };
    // dispatch
    const live$ = createForMode(ArtifactMode.LIVE, opts, ctx, host);
    const preview$ = createForMode(ArtifactMode.PREVIEW, opts, ctx, host);
    const always$ = createBaseModule(opts, ctx, host);
    // merge and return
    return rxPipe(
      merge(live$, preview$, always$),
      ignoreElements(),
      endWith(host)
    );
  };
}
