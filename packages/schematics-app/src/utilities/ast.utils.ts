import { isNotNil } from '@acoustic-content-sdk/utils';
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

export function isNgModuleDecorator(aDecorator: Decorator): boolean {
  return (
    isCallExpression(aDecorator.expression) &&
    isIdentifier(aDecorator.expression.expression) &&
    aDecorator.expression.expression.text === 'NgModule'
  );
}

export function isComponentDecorator(aDecorator: Decorator): boolean {
  return (
    isCallExpression(aDecorator.expression) &&
    isIdentifier(aDecorator.expression.expression) &&
    aDecorator.expression.expression.text === 'Component'
  );
}

export function hasNgModuleDecorator(aClassDecl: ClassDeclaration): boolean {
  return isNotNil(aClassDecl.decorators.find(isNgModuleDecorator));
}

export function hasComponentDecorator(aClassDecl: ClassDeclaration): boolean {
  return isNotNil(aClassDecl.decorators.find(isComponentDecorator));
}

export function findBootstrapComponent(aDecorator: Decorator): string {
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

export function findTemplate(aDecorator: Decorator): string {
  if (isCallExpression(aDecorator.expression)) {
    // find the object literal expression
    const props = aDecorator.expression.arguments
      .find(isObjectLiteralExpression)
      .properties.filter(isPropertyAssignment);

    // find the right one
    const templateUrl = props.find(
      (prop) => isIdentifier(prop.name) && prop.name.text === 'templateUrl'
    );
    if (isNotNil(templateUrl) && isStringLiteral(templateUrl.initializer)) {
      // find the first identifier
      return templateUrl.initializer.text;
    }
  }
  return undefined;
}

export function findBootstrapImport(
  aName: string,
  aAppModule: SourceFile
): string {
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

// find the ng module
export function findNgModule(aSrc: SourceFile) {
  return aSrc.statements.filter(isClassDeclaration).find(hasNgModuleDecorator);
}

// find the ngcomponent
export function findComponent(aSrc: SourceFile) {
  return aSrc.statements.filter(isClassDeclaration).find(hasComponentDecorator);
}
