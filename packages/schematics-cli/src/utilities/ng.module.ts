import { isNotEmpty, isNotNil } from '@acoustic-content-sdk/utils';
import {
  ClassDeclaration,
  Decorator,
  isCallExpression,
  isClassDeclaration,
  isIdentifier,
  Statement
} from 'typescript';

export function isNgModuleDecorator(aDecorator: Decorator): boolean {
  return (
    isCallExpression(aDecorator.expression) &&
    isIdentifier(aDecorator.expression.expression) &&
    aDecorator.expression.expression.text === 'NgModule'
  );
}

export function isNgModule(
  aStatement: Statement
): aStatement is ClassDeclaration {
  // must be a class declaration
  return (
    isClassDeclaration(aStatement) &&
    isNotEmpty(aStatement.decorators) &&
    isNotNil(aStatement.decorators.find(isNgModuleDecorator))
  );
}
