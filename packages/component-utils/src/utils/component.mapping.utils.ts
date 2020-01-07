import {
  AbstractLayoutComponentDirective,
  LayoutMappingDirective
} from '@acoustic-content-sdk/component-api';
import { isNotNil, Maybe, pluckProperty } from '@acoustic-content-sdk/utils';

import { AbstractRegisteredLayoutMapping } from '../decorators/layout/layout.registrations';

const selectMappingId = pluckProperty<
  AbstractLayoutComponentDirective,
  'mappingId'
>('mappingId');

/**
 * Register a mapping from the description of a layout component
 *
 * @param aDirective -     the directive
 * @param aType -     the associated type
 */
export function layoutMappingFromLayoutComponent<
  DIRECTIVE extends AbstractLayoutComponentDirective,
  TYPE
>(
  aType: TYPE,
  aDirective?: DIRECTIVE
): Maybe<AbstractRegisteredLayoutMapping<TYPE>> {
  /**
   *  add the component
   */
  const mappingId = selectMappingId(aDirective);
  return isNotNil(mappingId)
    ? { selector: aType, id: mappingId, layoutMode: aDirective.layoutMode }
    : undefined;
}

/**
 * Register a mapping from the description of a layout directive
 *
 * @param aDirective -     the directive
 * @param aType -     the associated type
 */
export function layoutMappingFromMappingDirective<TYPE>(
  aComponent: TYPE,
  aDirective: LayoutMappingDirective
): AbstractRegisteredLayoutMapping<TYPE> {
  /**
   *  add the component
   */
  return {
    ...aDirective,
    selector: aDirective.selector || aComponent
  };
}
