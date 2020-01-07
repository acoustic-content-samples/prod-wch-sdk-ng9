import { IsPredicate, Predicate } from '@acoustic-content-sdk/utils';
import { UnaryFunction } from 'rxjs';
import {
  Decorator,
  isCallExpression,
  isIdentifier,
  isPropertyAssignment,
  ObjectLiteralExpression,
  PropertyAssignment
} from 'typescript';

/**
 * Finds a decorator of a particular name
 *
 * @param aName - the name
 * @returns a predicate for that decorator
 */
export function isDecorator(aName: string): Predicate<Decorator> {
  return (aDecorator) =>
    isCallExpression(aDecorator.expression) &&
    isIdentifier(aDecorator.expression.expression) &&
    aDecorator.expression.expression.text === aName;
}

export const isLayoutComponentDecorator: Predicate<Decorator> = isDecorator(
  'LayoutComponent'
);

export const isNgComponentDecorator: Predicate<Decorator> = isDecorator(
  'Component'
);

export const isNgModuleDecorator: Predicate<Decorator> = isDecorator(
  'NgModule'
);

export function isProperty(aName: string): IsPredicate<PropertyAssignment> {
  return (aProp: any): aProp is PropertyAssignment =>
    isPropertyAssignment(aProp) &&
    isIdentifier(aProp.name) &&
    aProp.name.text === aName;
}

export function findProperty(
  aName: string
): UnaryFunction<ObjectLiteralExpression, PropertyAssignment> {
  // callback
  const predicate = isProperty(aName);
  // dispatch
  return (exp) => exp.properties.find(predicate);
}
