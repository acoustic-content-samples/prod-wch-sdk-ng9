import { getPath, isNotNil, reduceForIn } from '@acoustic-content-sdk/utils';
import { UnaryFunction } from 'rxjs';
import {
  ClassDeclaration,
  Expression,
  isArrayLiteralExpression,
  isIdentifier,
  isObjectLiteralExpression,
  isPropertyAssignment,
  isStringLiteral,
  NodeArray,
  PropertyAssignment,
  SourceFile,
  Statement
} from 'typescript';

import {
  isImportDeclarationForToken,
  isRelativeImport,
  resolveRelativeFileName
} from './imports';
import { isNgModule, isNgModuleDecorator } from './ng.module';

function isExportsPropertyAssignment(aItem: any): aItem is PropertyAssignment {
  return (
    isPropertyAssignment(aItem) &&
    isIdentifier(aItem.name) &&
    aItem.name.text === 'exports'
  );
}

/**
 * Resolves the import path of a token relative to a source file
 *
 * @param aToken    - the token to resolve
 * @param aSource   - the source file
 *
 * @returns the full path or undefined
 */
function getImportPath(aToken: string, aSource: SourceFile): string {
  // find the import statement
  const decl = aSource.statements.find(isImportDeclarationForToken(aToken));
  if (isNotNil(decl) && isStringLiteral(decl.moduleSpecifier)) {
    // get the source
    const moduleSrc = decl.moduleSpecifier.text;
    if (isRelativeImport(moduleSrc)) {
      // find the actual class
      return resolveRelativeFileName(aSource.fileName, moduleSrc);
    }
  }
  // nothing
  return undefined;
}

/** Returns a search function for an input token */
function hasImportPath(
  aSource: SourceFile,
  aLayoutClasses: Record<string, ClassDeclaration>
) {
  return (token: Expression) => {
    // test
    if (!isIdentifier(token)) {
      return false;
    }
    // resolve
    const name = token.text;
    const importPath = getImportPath(name, aSource);
    const clz = aLayoutClasses[importPath];
    return isNotNil(clz) && clz.name.text === name;
  };
}

/**
 * Returns a function that identifies if a module is a valid layout module, i.e. if
 * it exports one of our layouts.
 *
 * @param aLayoutClasses    - the layouts
 * @returns the test function
 */
function checkLayoutModule(aLayoutClasses: Record<string, ClassDeclaration>) {
  function isLayoutModule(
    aStatement: Statement
  ): aStatement is ClassDeclaration {
    // test for a module in general
    if (!isNgModule(aStatement)) {
      return false;
    }
    // find the ng module decorator
    const ngModule = aStatement.decorators.find(isNgModuleDecorator);
    // check the arguments
    const args = getPath<NodeArray<Expression>>(ngModule, [
      'expression',
      'arguments'
    ]);
    const objLit = args.find(isObjectLiteralExpression);
    if (isNotNil(objLit)) {
      // find the exports
      const exports = objLit.properties.find(isExportsPropertyAssignment);
      return (
        isNotNil(exports) &&
        isArrayLiteralExpression(exports.initializer) &&
        isNotNil(
          exports.initializer.elements.find(
            hasImportPath(aStatement.getSourceFile(), aLayoutClasses)
          )
        )
      );
    }
    // no match
    return false;
  }

  return isLayoutModule;
}

/**
 * Returns a finder for layout modules
 *
 * @param aLayoutClasses  - record of classes
 * @returns the finder
 */
export function findLayoutModule(
  aLayoutClasses: Record<string, ClassDeclaration>
): UnaryFunction<SourceFile, ClassDeclaration> {
  // test function
  const checkModule = checkLayoutModule(aLayoutClasses);
  // returns the finder
  return (aSource) => aSource.statements.find(checkModule);
}

/**
 * Locates the layout modules
 *
 * @param aAllFiles     - all source files
 * @param aLayoutClasses   - the layout classes
 *
 * @returns all modules that export the classes
 */
export function getLayoutModules(
  aAllFiles: Record<string, SourceFile>,
  aLayoutClasses: Record<string, ClassDeclaration>
): Record<string, ClassDeclaration> {
  // test function
  const checkModule = checkLayoutModule(aLayoutClasses);
  // dispatch
  return reduceForIn(
    aAllFiles,
    (aResult: Record<string, ClassDeclaration>, aFile: SourceFile) => {
      // find the module
      const moduleClz = aFile.statements.find(checkModule);
      if (isNotNil(moduleClz)) {
        aResult[aFile.fileName] = moduleClz;
      }
      // ok
      return aResult;
    },
    {}
  );
}
