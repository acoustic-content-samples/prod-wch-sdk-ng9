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
import { ensureDirPath, relativePath } from '@acoustic-content-sdk/tooling';
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
import { merge, Observable, of } from 'rxjs';
import { ignoreElements, map, mapTo, mergeMap } from 'rxjs/operators';
import {
  ClassDeclaration,
  Decorator,
  isArrayLiteralExpression,
  isCallExpression,
  isClassDeclaration,
  isIdentifier,
  isImportClause,
  isImportDeclaration,
  isImportSpecifier,
  isNamedImports,
  isObjectLiteralExpression,
  isPropertyAssignment,
  isStringLiteral,
  SourceFile
} from 'typescript';

import { addModeToName } from '../utilities/names';
import { ASSETS_DIR$ } from './../utilities/assets';
import { Schema } from './schema';
import { KEY_MAIN, KEY_POLYFILLS, KEY_TS_CONFIG } from './update.angular.json';

const NAME_APP_MODULE = 'app.module.ts';
const NAME_MAIN = 'main.ts';
const NAME_TSCONFIG = 'tsconfig.json';

const KEY_ORIGINAL_COMPONENT_PATH = 'ORIGINAL_COMPONENT_PATH';
const KEY_ORIGINAL_APP_MODULE_PATH = 'ORIGINAL_APP_MODULE_PATH';
const KEY_ORIGINAL_APP_MODULE = 'ORIGINAL_APP_MODULE';
const KEY_ORIGINAL_COMPONENT = 'ORIGINAL_COMPONENT';
const KEY_WCH_APP_MODULE = 'WCH_APP_MODULE';
const KEY_WCH_APP_MODULE_PATH = 'WCH_APP_MODULE_PATH';
const KEY_ORIGINAL_CONFIG_PATH = 'ORIGINAL_CONFIG_PATH';
const KEY_MAIN_FILE = 'MAIN_FILE';
const KEY_POLYFILLS_FILE = 'POLYFILLS_FILE';

const SDK_CONTEXT = {
  [ArtifactMode.LIVE]: {
    [KEY_WCH_APP_MODULE]: 'WchNgAppLiveModule',
    [KEY_WCH_APP_MODULE_PATH]: '@acoustic-content-sdk/ng-app-live'
  },
  [ArtifactMode.PREVIEW]: {
    [KEY_WCH_APP_MODULE]: 'WchNgAppPreviewModule',
    [KEY_WCH_APP_MODULE_PATH]: '@acoustic-content-sdk/ng-app-preview'
  }
};

const selectOptions = (aName: string) =>
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

function transformMain(aFile: string): Observable<string> {
  // nothing special to do
  if (isNotEmpty(aFile)) {
    return of(aFile);
  }
  // read the file
  return rxPipe(
    BOOTSTRAP$,
    mergeMap((root) => rxReadTextFile(join(root, NAME_MAIN)))
  );
}

function transformApp(
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

function isNgModuleDecorator(aDecorator: Decorator): boolean {
  return (
    isCallExpression(aDecorator.expression) &&
    isIdentifier(aDecorator.expression.expression) &&
    aDecorator.expression.expression.text === 'NgModule'
  );
}

function hasNgModuleDecorator(aClassDecl: ClassDeclaration): boolean {
  return isNotNil(aClassDecl.decorators.find(isNgModuleDecorator));
}

function findBootstrapComponent(aDecorator: Decorator): string {
  if (isCallExpression(aDecorator.expression)) {
    // find the object literal expression
    const props = aDecorator.expression.arguments
      .find(isObjectLiteralExpression)
      .properties.filter(isPropertyAssignment);
    // find the right one
    const boostrap = props.find(
      (prop) => isIdentifier(prop.name) && prop.name.text === 'bootstrap'
    );
    if (isNotNil(boostrap) && isArrayLiteralExpression(boostrap.initializer)) {
      // find the first identifier
      return boostrap.initializer.elements.find(isIdentifier).text;
    }
  }
  return undefined;
}

function findBootstrapImport(aName: string, aAppModule: SourceFile): string {
  // all imports
  const imp = aAppModule.statements
    .filter(isImportDeclaration)
    .find(
      (im) =>
        isImportClause(im.importClause) &&
        isNamedImports(im.importClause.namedBindings) &&
        isNotNil(
          im.importClause.namedBindings.elements.find(
            (el) =>
              isImportSpecifier(el) &&
              isIdentifier(el.name) &&
              el.name.text === aName
          )
        )
    );
  // returns the path
  if (isNotNil(imp) && isStringLiteral(imp.moduleSpecifier)) {
    // the path
    return imp.moduleSpecifier.text;
  }
  // nothing
  return undefined;
}

function contextFromAppModule(aAppModule: SourceFile): Record<string, string> {
  // the context
  const ctx: Record<string, string> = {};
  const { dir, name } = parse(aAppModule.fileName);
  ctx[KEY_ORIGINAL_APP_MODULE_PATH] = `${dir}/${name}`;
  // find the name
  const classDecl = aAppModule.statements
    .filter(isClassDeclaration)
    .find(hasNgModuleDecorator);
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
        ctx[KEY_ORIGINAL_COMPONENT_PATH] = normalize(join(dir, imp));
      }
    }
  }
  // returns the context
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
  const tsConfig = addModeToName(origTsConfig, aMode);
  const polyfills = aOptions[KEY_POLYFILLS];
  // set up the context
  const ctx: Record<string, string> = {};
  ctx[KEY_ORIGINAL_CONFIG_PATH] = relativePath(
    ensureDirPath(tsConfig),
    ensureDirPath(origTsConfig)
  );
  ctx[KEY_MAIN_FILE] = main;
  ctx[KEY_POLYFILLS_FILE] = polyfills;
  // ok
  return ctx;
}

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
  const appTemplate$ = rxPipe(
    BOOTSTRAP$,
    mergeMap((root) => rxReadTextFile(join(root, NAME_APP_MODULE))),
    map(compiler),
    opShareLast
  );
  // template
  const tsConfigTemplate$ = rxPipe(
    BOOTSTRAP$,
    mergeMap((root) => rxReadTextFile(join(root, NAME_TSCONFIG))),
    map(compiler),
    opShareLast
  );
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
    // location of tsconfig
    const tsConfig = addModeToName(aOptions[KEY_TS_CONFIG], aMode);
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
    // location of the main file
    const main = addModeToName(aOptions[KEY_MAIN], aMode);
    // main file
    const main$ = rxTransformTextFile(main, transformMain, aHost);
    // dir of the main file
    const { dir } = parse(main);
    const app = `${dir}/${NAME_APP_MODULE}`;
    // augment the context
    const ctx = {
      ...aCtx,
      ...SDK_CONTEXT[aMode],
      [KEY_ORIGINAL_APP_MODULE_PATH]: relativePath(
        ensureDirPath(app),
        ensureDirPath(aCtx[KEY_ORIGINAL_APP_MODULE_PATH])
      ),
      [KEY_ORIGINAL_COMPONENT_PATH]: relativePath(
        ensureDirPath(app),
        ensureDirPath(aCtx[KEY_ORIGINAL_COMPONENT_PATH])
      )
    };
    // app file
    const app$ = rxPipe(
      appTemplate$,
      mergeMap((tmp) =>
        rxTransformTextFile(app, (file) => transformApp(file, ctx, tmp), aHost)
      )
    );
    // merge
    return merge(main$, app$, tsConfig$);
  }

  // the transform callback
  return (host: Tree) => {
    // get the project name
    const projectName = findProjectName(host, options);
    // filename
    const angularJson = getWorkspace(host);
    // extract the options
    const opts = selectOptions(projectName)(angularJson);
    // select the main file
    const main = opts[KEY_MAIN];
    const appModule = getAppModulePath(host, main);
    // parse the app module
    const appSource = getSourceFile(host, appModule);
    const ctx = contextFromAppModule(appSource);
    // dispatch
    const live$ = createForMode(ArtifactMode.LIVE, opts, ctx, host);
    const preview$ = createForMode(ArtifactMode.PREVIEW, opts, ctx, host);
    // merge and return
    return rxPipe(merge(live$, preview$), ignoreElements(), mapTo(host));
  };
}
