import {
  byName,
  byText,
  getFirstNgModuleName,
  getSourceFile
} from '@acoustic-content-sdk/schematics-utils';
import {
  arrayPush,
  firstElement,
  isNotEmpty,
  isNotNil
} from '@acoustic-content-sdk/utils';
import { Tree } from '@angular-devkit/schematics';
import {
  ClassDeclaration,
  Decorator,
  isArrayLiteralExpression,
  isCallExpression,
  isClassDeclaration,
  isIdentifier,
  isObjectLiteralExpression,
  isPropertyAssignment,
  ObjectLiteralExpression,
  SourceFile
} from 'typescript';

export type SourceModule = [string, SourceFile];

export function findAllModules(aTree: Tree, aSrcFolder: string) {
  // the directory
  const dirEntry = aTree.getDir(aSrcFolder);
  // assemble all modules
  const modules: SourceModule[] = [];
  // visit
  dirEntry.visit((path) => {
    // parse the beast
    const src = getSourceFile(aTree, path);
    const ngModuleName = getFirstNgModuleName(src);
    if (isNotNil(ngModuleName)) {
      arrayPush([ngModuleName, src], modules);
    }
  });
  // ok
  return modules;
}

function isNgModuleDecorator(aDec: Decorator): boolean {
  const { expression } = aDec;
  return (
    isCallExpression(expression) &&
    isIdentifier(expression.expression) &&
    expression.expression.text === 'NgModule'
  );
}

function getNgModuleDecorator(aDecl: ClassDeclaration): Decorator {
  return firstElement(aDecl.decorators.filter(isNgModuleDecorator));
}

export const ACOUSTIC_NG_APP_BASE_MODULE = 'AcNgAppBaseModule';

function hasLiteralBaseImport(aExpr: ObjectLiteralExpression): boolean {
  return isNotEmpty(
    aExpr.properties
      .filter(isPropertyAssignment)
      .filter(byName('imports'))
      .map((prop) => prop.initializer)
      .filter(isArrayLiteralExpression)
      .map((prop) => prop.elements)
      .map((el) => el.filter(byText(ACOUSTIC_NG_APP_BASE_MODULE)))
      .filter(isNotEmpty)
  );
}

function hasDecoratorBaseImport(aDec: Decorator): boolean {
  const { expression } = aDec;
  if (isCallExpression(expression)) {
    // locate the imports
    return isNotEmpty(
      expression.arguments
        .filter(isObjectLiteralExpression)
        .filter(hasLiteralBaseImport)
    );
  }
  return false;
}

export function isBaseModule([name, src]: SourceModule): boolean {
  // find the class
  return isNotEmpty(
    src.statements
      .filter(isClassDeclaration)
      .filter(byName(name))
      .filter((cls) => hasDecoratorBaseImport(getNgModuleDecorator(cls)))
  );
}
