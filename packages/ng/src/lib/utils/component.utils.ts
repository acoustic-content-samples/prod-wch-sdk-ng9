import { Type } from '@angular/core';
import {
  arrayPush,
  assertArray,
  isArray,
  isFunction,
  isNotEmpty,
  isString
} from '@acoustic-content-sdk/utils';
import { Observable, ReplaySubject } from 'rxjs';

import { LayoutComponentDirective } from './../decorators/layout/layout.directive';
import { createSymbol } from './symbol';

/* Copyright IBM Corp. 2017 */

const EMPTY_ARRAY: string[] = [];
const REFLECT_ANNOTATIONS = '__annotations__';

const KEY_ANNOTATIONS = createSymbol();

/**
 * Adds one of our own annotations to the host and returns the set of
 * annotations.
 *
 * @param aAnnotation - the annotation to add
 * @param aHost - the host to add the annotations to
 *
 * @returns the list of annotations
 */
export function cmpAddAnnotation(aAnnotation: any, aHost: any): any[] {
  return arrayPush(aAnnotation, assertArray(KEY_ANNOTATIONS, aHost));
}

/**
 * Returns our annotations for a function type
 *
 * @param aHost - the type to get the annotations from
 * @returns the list of annotations
 */
function _getAnnotations(aHost: any): any[] {
  return assertArray(KEY_ANNOTATIONS, aHost);
}

/**
 * Returns all known annotations, which are a combination of our own
 * annotations and the angular annotations.
 *
 * @param aHost - the type to get the annotations from
 * @returns the list of annotations
 */
function _getAllAnnotations(aHost: any): any[] {
  /**
   *  get the differnt annotation
   */
  const ownAnnotations = _getAnnotations(aHost);
  const ngAnnotations = aHost[REFLECT_ANNOTATIONS];
  /**
   *  check for existence
   */
  const hasOwnAnnotations = isNotEmpty(ownAnnotations);
  const hasNgAnnotations = isNotEmpty(ngAnnotations);
  /**
   *  return
   */
  const result = hasOwnAnnotations
    ? hasNgAnnotations
      ? [...ownAnnotations, ...ngAnnotations]
      : ownAnnotations
    : hasNgAnnotations
    ? ngAnnotations
    : EMPTY_ARRAY;
  /**
   *  some logging
   */
  return result;
}

export interface RegisteredComponent {
  directive: LayoutComponentDirective;
  type: Type<any>;
}

/**
 *  allows to attach for modifications of the components
 */
const componentsSubject = new ReplaySubject<RegisteredComponent>();

export const __REGISTERED_COMPONENTS: Observable<
  RegisteredComponent
> = componentsSubject;

export function cmpRegisterComponent(
  aDirective: LayoutComponentDirective,
  aType: Type<any>
): void {
  /**
   *  add the component
   */
  componentsSubject.next({ directive: aDirective, type: aType });
}

/**
 * Extracts the selector
 *
 * @param aMetadata -     metadata
 * @returns the selector
 */
function _pluckSelector(aMetadata: any): any {
  return aMetadata.selector;
}

/**
 * Decodes the selector from the component
 *
 * @param aComponent -  the component
 * @returns the selectors for the component
 */
export function cmpGetSelector(
  aSelector: string | Type<any> | null | undefined
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
  } else if (isFunction(aSelector)) {
    /**
     *  analyze the existing annotations
     */
    const annotations: any[] = _getAllAnnotations(aSelector);
    /**
     *  filter the desired one
     */
    const selectors = annotations.map(_pluckSelector).filter(isString);
    result = isNotEmpty(selectors) ? selectors[0] : undefined;
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
    const annotations: any[] = _getAllAnnotations(aSelector);
    /**
     *  filter the desired one
     */
    result = annotations.map(_pluckSelector).filter(isString);
  } else {
    /**
     *  no selectors available
     */
    result = EMPTY_ARRAY;
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
  return cmpGetSelectors(aComponent.directive.selector || aComponent.type);
}
