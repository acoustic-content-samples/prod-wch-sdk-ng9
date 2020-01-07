import { getPath, isNotNil } from '@acoustic-content-sdk/utils';
import { join, normalize, parse } from 'path';
import {
  ImportDeclaration,
  ImportSpecifier,
  isImportDeclaration,
  NodeArray,
  Statement
} from 'typescript';

export function isRelativeImport(aPath: string): boolean {
  return !!aPath && (aPath.startsWith('./') || aPath.startsWith('../'));
}

/**
 * Locates the file
 *
 * @param aAbsFileName
 * @param aRelFileName
 */
export function resolveRelativeFileName(
  aAbsFileName: string,
  aRelFileName: string
): string {
  // parse
  const parsed = parse(aAbsFileName);
  return normalize(join(normalize(parsed.dir), aRelFileName + '.ts'));
}

export function isImportDeclarationForToken(aToken: string) {
  function isImportSpecifierForToken(aSpecifier: ImportSpecifier): boolean {
    return aSpecifier.name.text === aToken;
  }

  return (statement: Statement): statement is ImportDeclaration => {
    // check
    if (!isImportDeclaration(statement)) {
      return false;
    }
    // the expressions
    const expressions = getPath<NodeArray<ImportSpecifier>>(statement, [
      'importClause',
      'namedBindings',
      'elements'
    ]);
    return (
      isNotNil(expressions) &&
      isNotNil(expressions.find(isImportSpecifierForToken))
    );
  };
}
