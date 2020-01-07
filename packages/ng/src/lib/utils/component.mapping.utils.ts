import { Type } from '@angular/core';
import { CONTENT_ITEM_KIND } from '@acoustic-content-sdk/api';
import { isNotNil } from '@acoustic-content-sdk/utils';
import { Observable, ReplaySubject } from 'rxjs';

import {
  LayoutComponentDirective,
  LayoutMappingDirective
} from './../decorators/layout/layout.directive';

export interface RegisteredMapping {
  /**
   * Defines the mapping between the layout controller
   * to the layout implementation. If this property is missing, the selector
   * of the component will be used instead.
   */
  selector: string | string[] | Type<any>;

  /**
   * An optional layout mode used with this layout mapping.
   */
  layoutMode?: string | string[];

  /**
   * Type IDs or content IDs to map this to
   */
  id?: string | string[];

  /**
   * Type IDs to map this to
   */
  kind?: CONTENT_ITEM_KIND | CONTENT_ITEM_KIND[];
}

/**
 *  allows to attach for modifications of the components
 */
const MAPPINGS_SUBJECT = new ReplaySubject<RegisteredMapping>();

/**
 * Returns the set of registered mappings
 * @returns the observable of the mapping
 */
export const REGISTERED_MAPPINGS: Observable<
  RegisteredMapping
> = MAPPINGS_SUBJECT;

/**
 * Register a mapping from the description of a layout component
 *
 * @param aDirective -     the directive
 * @param aType -     the associated type
 */
export function mappingRegisterFromLayoutComponent(
  aDirective: LayoutComponentDirective,
  aType: Type<any>
): void {
  /**
   *  add the component
   */
  const mappingId = aDirective.mappingId;
  if (isNotNil(mappingId)) {
    /**
     *  register
     */
    MAPPINGS_SUBJECT.next({
      selector: aType,
      id: mappingId,
      layoutMode: aDirective.layoutMode
    });
  }
}

/**
 * Register a mapping from the description of a layout directive
 *
 * @param aDirective -     the directive
 * @param aType -     the associated type
 */
export function mappingRegisterFromMappingDirective(
  aDirective: LayoutMappingDirective,
  aComponent: Type<any>
): void {
  /**
   *  add the component
   */
  const mapping: RegisteredMapping = {
    ...aDirective,
    selector: aDirective.selector || aComponent
  };
  /**
   *  register
   */
  MAPPINGS_SUBJECT.next(mapping);
}
