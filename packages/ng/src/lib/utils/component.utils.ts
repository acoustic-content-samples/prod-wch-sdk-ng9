import {
  AbstractRegisteredComponent,
  AbstractRegisteredLayoutMapping
} from '@acoustic-content-sdk/component-utils';
import { ComponentTypeRef } from '@acoustic-content-sdk/ng-api';
import {
  firstElement,
  isArray,
  isFunction,
  isNotNil,
  isString,
  isStringArray
} from '@acoustic-content-sdk/utils';
import { ComponentFactoryResolver, Type } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { LayoutComponentDirective } from './../decorators/layout/layout.directive';
import { createSymbol } from './symbol';

export type RegisteredComponent = AbstractRegisteredComponent<
  ComponentTypeRef<any>,
  LayoutComponentDirective
>;

export type RegisteredLayoutMapping = AbstractRegisteredLayoutMapping<
  ComponentTypeRef<any>
>;

const KEY_COMPONENT = createSymbol();
const KEY_LAYOUT_MAPPING = createSymbol();

const createRegisteredComponent = (
  type: Type<any>,
  directive: LayoutComponentDirective,
  resolver?: ComponentFactoryResolver
): RegisteredComponent => ({ type: { type, resolver }, directive });

export const registerComponent = (
  aType: Type<any>,
  aDirective: LayoutComponentDirective,
  resolver?: ComponentFactoryResolver
) =>
  (aType[KEY_COMPONENT] = createRegisteredComponent(
    aType,
    aDirective,
    resolver
  ));

export const registerLayoutMapping = (
  aType: Type<any>,
  aRegistration: RegisteredLayoutMapping
) => (aType[KEY_LAYOUT_MAPPING] = aRegistration);

const getRegisteredComponent = (aType: Type<any>): RegisteredComponent =>
  aType[KEY_COMPONENT];

/**
 *  allows to attach for modifications of the components
 */
const componentsSubject = new ReplaySubject<RegisteredComponent>();

export const __REGISTERED_COMPONENTS: Observable<RegisteredComponent> = componentsSubject;

/**
 * Decodes the selector from the component
 *
 * @param aComponent -  the component
 * @returns the selectors for the component
 */
export function cmpGetSelector(
  aSelector: string | string[] | Type<any> | null | undefined
): string | undefined {
  /**
   *  decode the selector
   */
  let result: string;
  if (isString(aSelector)) {
    /**
     *  wrap into an array
     */
    result = aSelector;
  } else if (isStringArray(aSelector)) {
    // returns the first selector
    return firstElement(aSelector);
  } else if (isFunction(aSelector)) {
    /**
     *  analyze the existing annotations
     */
    const cmp = getRegisteredComponent(aSelector);
    return isNotNil(cmp) ? cmpGetSelector(cmp.directive.selector) : undefined;
  }
  /**
   *  ok
   */
  return result;
}

/**
 * Decodes the selector from the component
 *
 * @param aComponent -  the component
 * @returns the selectors for the component
 */
export function cmpGetSelectors(
  aSelector: string | string[] | Type<any> | null | undefined
): string[] {
  /**
   *  decode the selector
   */
  let result: string[];
  /**
   *  convert to an array
   */
  if (isArray(aSelector)) {
    /**
     *  returns the array
     */
    result = aSelector as string[];
  } else if (isString(aSelector)) {
    /**
     *  wrap into an array
     */
    result = [aSelector];
  } else if (isFunction(aSelector)) {
    /**
     *  analyze the existing annotations
     */
    const cmp = getRegisteredComponent(aSelector as any);
    result = isNotNil(cmp) ? cmpGetSelectors(cmp.directive.selector) : [];
  } else {
    /**
     *  no selectors available
     */
    result = [];
  }
  /**
   *  ok
   */
  return result;
}

/**
 * Decodes the selectors for the registered component
 */
export function getSelectorsFromComponent(
  aComponent: RegisteredComponent
): string[] {
  /**
   *  use common code to get the selector
   */
  return cmpGetSelectors(aComponent.directive.selector || aComponent.type.type);
}
