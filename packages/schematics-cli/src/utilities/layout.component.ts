import {
  cmpStrings,
  getPath,
  isNil,
  isNotNil,
  reduceForIn
} from '@acoustic-content-sdk/utils';
import {
  ClassDeclaration,
  Decorator,
  isCallExpression,
  isClassDeclaration,
  isIdentifier,
  isStringLiteral,
  SourceFile,
  Statement
} from 'typescript';

import {
  isImportDeclarationForToken,
  isRelativeImport,
  resolveRelativeFileName
} from './imports';

function isLayoutComponentDecorator(aDecorator: Decorator): boolean {
  return (
    isCallExpression(aDecorator.expression) &&
    isIdentifier(aDecorator.expression.expression) &&
    aDecorator.expression.expression.text === 'LayoutComponent'
  );
}

function isComponentDecorator(aDecorator: Decorator): boolean {
  return (
    isCallExpression(aDecorator.expression) &&
    isIdentifier(aDecorator.expression.expression) &&
    aDecorator.expression.expression.text === 'Component'
  );
}

function isLayoutComponent(
  aStatement: Statement
): aStatement is ClassDeclaration {
  // must be a class declaration
  if (!isClassDeclaration(aStatement) || isNil(aStatement.decorators)) {
    return false;
  }
  // find the decorators
  const layoutComponentDecorator = aStatement.decorators.find(
    isLayoutComponentDecorator
  );
  const componentDecorator = aStatement.decorators.find(isComponentDecorator);
  // check for these decorators
  return isNotNil(layoutComponentDecorator) && isNotNil(componentDecorator);
}

/**
 * Compares class declarations by name
 *
 * @param aLeft    - left class
 * @param aRight    - right class
 *
 * @returns the comparion result
 */
export function compareClassDeclarations(
  aLeft: ClassDeclaration,
  aRight: ClassDeclaration
): number {
  return cmpStrings(aLeft.name.text, aRight.name.text);
}

function getBaseClass(aClassDeclaration: ClassDeclaration): string {
  // just use the first heritage clause
  return getPath(aClassDeclaration, [
    'heritageClauses',
    '0',
    'types',
    '0',
    'expression',
    'text'
  ]);
}

function isClassDeclarationForToken(aToken: string) {
  return (statement: Statement): statement is ClassDeclaration => {
    return isClassDeclaration(statement) && statement.name.text === aToken;
  };
}

function doResolveClassHierarchy(
  aAllFiles: Record<string, SourceFile>,
  aRes: Record<string, ClassDeclaration>,
  aClassDeclaration: ClassDeclaration
): Record<string, ClassDeclaration> {
  // path from source file
  const sourceFile = aClassDeclaration.getSourceFile();
  const fileName = sourceFile.fileName;
  const className = aClassDeclaration.name.text;
  const key = `${fileName}#${className}`;
  // protect against cycles
  const oldDecl = aRes[key];
  if (isNil(oldDecl)) {
    // update
    aRes[key] = aClassDeclaration;
    // get the base class
    const baseClass = getBaseClass(aClassDeclaration);
    if (isNotNil(baseClass)) {
      // find the import statement
      const decl = sourceFile.statements.find(
        isImportDeclarationForToken(baseClass)
      );
      if (isNotNil(decl) && isStringLiteral(decl.moduleSpecifier)) {
        // get the source
        const moduleSrc = decl.moduleSpecifier.text;
        if (isRelativeImport(moduleSrc)) {
          // find the actual class
          const modulePath = resolveRelativeFileName(fileName, moduleSrc);
          const module = aAllFiles[modulePath];
          if (isNotNil(module)) {
            // find the class
            const baseClassDeclaration = module.statements.find(
              isClassDeclarationForToken(baseClass)
            );
            if (isNotNil(baseClassDeclaration)) {
              doResolveClassHierarchy(aAllFiles, aRes, baseClassDeclaration);
            }
          }
        }
      }
    }
  }
  // ok
  return aRes;
}

/**
 * Finds the class declarations of all classes along the class hierarchy
 *
 * @param aAllFiles - all possible files
 * @param aClassDeclaration - the class declaration to resolve
 *
 * @returns the resulting map
 */
export function resolveClassHierarchy(
  aAllFiles: Record<string, SourceFile>,
  aClassDeclaration: ClassDeclaration
): Record<string, ClassDeclaration> {
  // the result
  return doResolveClassHierarchy(aAllFiles, {}, aClassDeclaration);
}

/** Locates the layout component from the source file that represents the layout component declaration. */
export function findLayoutComponent(aSource: SourceFile): ClassDeclaration {
  // find all class declarations
  return aSource.statements.find(isLayoutComponent);
}

/**
 * From these files extract all layout components
 */
export function getLayoutComponents(
  aAllFiles: Record<string, SourceFile>
): Record<string, ClassDeclaration> {
  return reduceForIn(
    aAllFiles,
    (
      aResult: Record<string, ClassDeclaration>,
      aSource: SourceFile,
      aPath: string
    ) => {
      // locate the component
      const lc = findLayoutComponent(aSource);
      if (isNotNil(lc)) {
        aResult[aPath] = lc;
      }
      // ok
      return aResult;
    },
    {}
  );
}
