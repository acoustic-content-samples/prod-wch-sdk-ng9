import {
  assignObject,
  isPlainObject,
  isString,
  isStringArray
} from '@acoustic-content-sdk/utils';
import { Type } from '@angular/core';

import {
  registerComponent,
  registerLayoutMapping
} from './../../utils/component.utils';
import {
  LayoutComponentDirective,
  LayoutMappingDirective
} from './layout.directive';

/**
 * Layout decorator and metadata.
 */
export function LayoutComponent<T extends Type<any>>(
  aDirective: LayoutComponentDirective = {}
): (cls: T) => void {
  /**
   *  export the decorator function
   */
  return (aClass: T) => {
    /**
     *  register
     */
    registerComponent(aClass, aDirective);
  };
}

/**
 * Tests if a value is a string or a string array
 */
function _isStringOrArray(aValue: any): aValue is string | string[] {
  return isString(aValue) || isStringArray(aValue);
}

/**
 * Layout mapping decorator and metadata
 */
export function LayoutMapping<T extends Type<any>>(
  aID: string | string[] | LayoutMappingDirective,
  aSelector?: string | string[] | Type<any>,
  aLayoutMode?: string | string[]
): (cls: T) => void {
  /**
   *  export the decorator function
   */
  return (cls: T) => {
    /**
     *  init the structure
     */
    const directive: LayoutMappingDirective = {};
    if (_isStringOrArray(aID)) {
      directive.id = aID;
    } else if (isPlainObject(aID)) {
      assignObject(directive, aID);
    }
    /**
     *  augment the selector
     */
    if (_isStringOrArray(aSelector)) {
      directive.selector = aSelector;
    }
    /**
     *  augment the mode
     */
    if (_isStringOrArray(aLayoutMode)) {
      directive.layoutMode = aLayoutMode;
    }
    /**
     *  register
     */
    registerLayoutMapping(cls, directive as any);
  };
}
