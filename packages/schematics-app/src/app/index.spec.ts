import { logging } from '@angular-devkit/core';
import {
  byName,
  byType,
  getSourceNodes,
  isImported
} from '@acoustic-content-sdk/schematics-utils';
import {
  createSourceFile,
  ObjectLiteralExpression,
  ScriptTarget,
  SourceFile,
  SyntaxKind,
  VariableDeclaration
} from 'typescript';

import { applyChanges } from '../test';
import { addToDevEnv, addToProdEnv } from './update.environment';

function getTsSource(path: string, content: string): SourceFile {
  return createSourceFile(path, content, ScriptTarget.Latest, true);
}

describe('add to app', () => {
  const envSource = `
  import { DEFAULT_SETTINGS, apiUrl } from './../app/app.config';
  // The file contents for the current environment will overwrite these during build.
  // The build system defaults to the dev environment which uses environment.ts, but if you do
  // ng build --env=prod then environment.prod.ts will be used instead.
  // The list of which env maps to which file can be found in

  export const environment = {
    production: false
  };
  /*
   * In development mode, to ignore zone related error stack frames such as
   * zone.run, zoneDelegate.invokeTask for easier debugging, you can
   * import the following file, but please comment it out in production mode
   * because it will have performance impact when throw error
   */
  import 'zone.js/dist/zone-error'; // Included with Angular CLI.
  `;

  const envSourceEmpty = `
  // The file contents for the current environment will overwrite these during build.
  // The build system defaults to the dev environment which uses environment.ts, but if you do
  // ng build --env=prod then environment.prod.ts will be used instead.
  // The list of which env maps to which file can be found in

  export const environment = {
    production: false
  };
  /*
   * In development mode, to ignore zone related error stack frames such as
   * zone.run, zoneDelegate.invokeTask for easier debugging, you can
   * import the following file, but please comment it out in production mode
   * because it will have performance impact when throw error
   */
  `;

  const envSourceRewritten = `
  import { apiUrl } from './../app/app.config';

  export const environment = {
    apiUrl,
    httpOptions: { pollTime: 20 * 1000 },
    httpPreviewOptions: { pollTime: 10 * 1000 },
    production: false
  };

  /*
   * In development mode, to ignore zone related error stack frames such as
   * import the following file, but please comment it out in production mode
   * because it will have performance impact when throw error
   */
  // import 'zone.js/dist/zone-error';  // Included with Angular CLI.
    `;

  function _testDevEnv(aSource: string) {
    // parse the file
    const path = '/src/environments/environment.ts';
    const source = getTsSource(path, aSource);
    expect(source).toBeDefined();

    const logger = new logging.Logger('test').asApi();

    const changes = addToDevEnv(source, path, logger);

    const rewrittenSource = applyChanges(path, aSource, changes);

    const rewritten = getTsSource(path, rewrittenSource);
    _validateDevEnvironment(rewritten);
  }

  function _testProdEnv(aSource: string) {
    // parse the file
    const path = '/src/environments/environment.prod.ts';
    const source = getTsSource(path, aSource);
    expect(source).toBeDefined();

    const logger = new logging.Logger('test').asApi();

    const changes = addToProdEnv(source, path, logger);

    const rewrittenSource = applyChanges(path, aSource, changes);

    const rewritten = getTsSource(path, rewrittenSource);
    _validateProdEnvironment(rewritten);
  }

  function _validateDevEnvironment(aSource: SourceFile) {
    const envDeclaration = getSourceNodes(aSource)
      .filter(byType(SyntaxKind.VariableDeclaration))
      .map(value => value as VariableDeclaration)
      .find(byName('environment'));

    expect(envDeclaration).toBeDefined();

    // get the expression
    const expression = envDeclaration!.initializer;
    expect(expression).toBeDefined();

    // cast
    const objLit = expression as ObjectLiteralExpression;
    const props = objLit.properties;

    expect(props.find(byName('apiUrl'))).toBeDefined();
    expect(props.find(byName('httpOptions'))).toBeDefined();
    expect(props.find(byName('httpPreviewOptions'))).toBeDefined();

    // make sure we have an import
    expect(isImported(aSource, 'apiUrl', './../app/app.config')).toBeTruthy();
  }

  function _validateProdEnvironment(aSource: SourceFile) {
    const envDeclaration = getSourceNodes(aSource)
      .filter(byType(SyntaxKind.VariableDeclaration))
      .map(value => value as VariableDeclaration)
      .find(byName('environment'));

    expect(envDeclaration).toBeDefined();

    // get the expression
    const expression = envDeclaration!.initializer;
    expect(expression).toBeDefined();

    // cast
    const objLit = expression as ObjectLiteralExpression;
    const props = objLit.properties;

    expect(props.find(byName('httpOptions'))).toBeDefined();
    expect(props.find(byName('httpPreviewOptions'))).toBeDefined();
  }

  it('should not rewrite twice prod', () => _testProdEnv(envSourceRewritten));

  it('should not rewrite twice dev', () => _testDevEnv(envSourceRewritten));

  it('should modify the default prod environment', () =>
    _testProdEnv(envSourceEmpty));

  it('should modify the default dev environment', () =>
    _testDevEnv(envSourceEmpty));

  it('should modify the dev environment with import', () =>
    _testDevEnv(envSource));
});
