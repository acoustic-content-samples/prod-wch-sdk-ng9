import {
  AbstractLayoutComponentDirective,
  LayoutMappingDirective
} from '@acoustic-content-sdk/component-api';
import {
  assignObject,
  BiConsumer,
  isNotNil,
  isPlainObject,
  isString,
  isStringArray
} from '@acoustic-content-sdk/utils';

import {
  layoutMappingFromLayoutComponent,
  layoutMappingFromMappingDirective
} from './../../utils/component.mapping.utils';
import {
  AbstractRegisteredComponent,
  AbstractRegisteredLayoutMapping
} from './layout.registrations';

/**
 * Layout decorator and metadata.
 */
export function createLayoutComponentDecorator<
  TYPE,
  DIRECTIVE extends AbstractLayoutComponentDirective
>(
  aComponentConsumer: BiConsumer<
    TYPE,
    AbstractRegisteredComponent<TYPE, DIRECTIVE>
  >,
  aLayoutMappingConsumer: BiConsumer<
    TYPE,
    AbstractRegisteredLayoutMapping<TYPE>
  >
) {
  return function LayoutComponent<T extends TYPE>(
    aDirective?: DIRECTIVE
  ): (cls: T) => void {
    /**
     *  export the decorator function
     */
    return (aClass: T) => {
      /**
       *  register this component
       */
      if (isNotNil(aDirective)) {
        aComponentConsumer(aClass, { directive: aDirective, type: aClass });
      }
      /**
       *  register a potential mapping
       */
      const mapping = layoutMappingFromLayoutComponent(aClass, aDirective);
      if (isNotNil(mapping)) {
        aLayoutMappingConsumer(aClass, mapping);
      }
    };
  };
}

/**
 * Tests if a value is a string or a string array
 */
function _isStringOrArray(aValue: any): aValue is string | string[] {
  return isString(aValue) || isStringArray(aValue);
}

/**
 * Implementation of the layout mapping decorator
 *
 * @param aLayoutMappingConsumer - consumer of the registered mapping
 * @param aID - ID or directive
 * @param aSelector - the actual selector
 * @param aLayoutMode - optionally the layout mode
 *
 * @returns the decorator function
 */
function LayoutMappingDecorator<TYPE, T extends TYPE>(
  aLayoutMappingConsumer: BiConsumer<
    TYPE,
    AbstractRegisteredLayoutMapping<TYPE>
  >,
  aID: string | string[] | LayoutMappingDirective,
  aSelector?: string | string[] | TYPE,
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
     *  dispatch
     */
    aLayoutMappingConsumer(
      cls,
      layoutMappingFromMappingDirective(cls, directive)
    );
  };
}

/**
 * Constructs the laout mapping decorator. Will callback
 * the given function with the decorated object
 */
export function createLayoutMappingDecorator<TYPE>(
  aLayoutMappingConsumer: BiConsumer<
    TYPE,
    AbstractRegisteredLayoutMapping<TYPE>
  >
) {
  // the actual decorato
  function LayoutMapping<T extends TYPE>(
    aID: string | string[] | LayoutMappingDirective,
    aSelector?: string | string[] | TYPE,
    aLayoutMode?: string | string[]
  ) {
    return LayoutMappingDecorator<TYPE, T>(
      aLayoutMappingConsumer,
      aID,
      aSelector,
      aLayoutMode
    );
  }
  // returns the decorator
  return LayoutMapping;
}
