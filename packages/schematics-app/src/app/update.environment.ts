import { logging } from '@angular-devkit/core';
import {
  byName,
  byType,
  Change,
  getSourceNodes,
  InsertChange
} from '@acoustic-content-sdk/schematics-utils';
import {
  ObjectLiteralExpression,
  SourceFile,
  SyntaxKind,
  VariableDeclaration
} from 'typescript';

const API_URL = `
apiUrl,`;

const DEV_HTTP_OPTIONS = `
httpOptions: {
    pollTime: 20 * 1000
},`;

const DEV_PREVIEW_HTTP_OPTIONS = `
httpPreviewOptions: {
    pollTime: 10 * 1000
},`;

const PROD_HTTP_OPTIONS = `
httpOptions: {
    pollTime: 20 * 60 * 1000
},`;

const PROD_PREVIEW_HTTP_OPTIONS = `
httpPreviewOptions: {
    pollTime: 20 * 1000
},`;

export function addToDevEnv(
  aSource: SourceFile,
  aPath: string,
  aLogger: logging.LoggerApi
): Change[] {
  // list of changes
  const changes: Change[] = [];
  // locate the environment declaration
  const envDeclaration = getSourceNodes(aSource)
    .filter(byType(SyntaxKind.VariableDeclaration))
    .map(value => value as VariableDeclaration)
    .find(byName('environment'));

  if (envDeclaration) {
    // get the expression
    const expression = envDeclaration.initializer;
    if (expression && expression.kind === SyntaxKind.ObjectLiteralExpression) {
      // cast
      const objLit = expression as ObjectLiteralExpression;
      const props = objLit.properties;

      // check for the httpOptions property
      const httpOptions = props.find(byName('httpOptions'));
      if (!httpOptions) {
        // add to api url
        changes.push(
          new InsertChange(aPath, objLit.getStart() + 1, DEV_HTTP_OPTIONS)
        );
      }

      // check for the httpOptions property
      const httpPreview = props.find(byName('httpPreviewOptions'));
      if (!httpPreview) {
        // add to api url
        changes.push(
          new InsertChange(
            aPath,
            objLit.getStart() + 1,
            DEV_PREVIEW_HTTP_OPTIONS
          )
        );
      }

      // check if we have the apiUrl property
      const apiUrl = props.find(byName('apiUrl'));
      if (!apiUrl) {
        // add to api url
        changes.push(new InsertChange(aPath, objLit.getStart() + 1, API_URL));
        // insert import at beginning of file
        changes.push(
          new InsertChange(
            aPath,
            aSource.getStart(),
            `import { apiUrl } from './../app/app.config';\n`
          )
        );
      }
    } else {
      // expected an environment declaration
      aLogger.warn(
        `Expected the "environment" expression to have an initializer in [${aPath}].`
      );
    }
  } else {
    // expected an environment declaration
    aLogger.warn(`Expected an "environment" expression in [${aPath}].`);
  }
  // returns the changes
  return changes;
}

export function addToProdEnv(
  aSource: SourceFile,
  aPath: string,
  aLogger: logging.LoggerApi
): Change[] {
  // list of changes
  const changes: Change[] = [];
  // locate the environment declaration
  const envDeclaration = getSourceNodes(aSource)
    .filter(byType(SyntaxKind.VariableDeclaration))
    .map(value => value as VariableDeclaration)
    .find(byName('environment'));

  if (envDeclaration) {
    // get the expression
    const expression = envDeclaration.initializer;
    if (expression && expression.kind === SyntaxKind.ObjectLiteralExpression) {
      // cast
      const objLit = expression as ObjectLiteralExpression;
      const props = objLit.properties;

      // check for the httpOptions property
      const httpOptions = props.find(byName('httpOptions'));
      if (!httpOptions) {
        // add to api url
        changes.push(
          new InsertChange(aPath, objLit.getStart() + 1, PROD_HTTP_OPTIONS)
        );
      }

      // check for the httpOptions property
      const httpPreview = props.find(byName('httpPreviewOptions'));
      if (!httpPreview) {
        // add to api url
        changes.push(
          new InsertChange(
            aPath,
            objLit.getStart() + 1,
            PROD_PREVIEW_HTTP_OPTIONS
          )
        );
      }
    } else {
      // expected an environment declaration
      aLogger.warn(
        `Expected the "environment" expression to have an initializer in [${aPath}].`
      );
    }
  } else {
    // expected an environment declaration
    aLogger.warn(`Expected an "environment" expression in [${aPath}].`);
  }
  // returns the changes
  return changes;
}
