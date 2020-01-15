import {
  KEY_ACCESSOR,
  KEY_ID,
  KEY_METADATA,
  RenderingContextProviderV2,
  RenderingContextV2
} from '@acoustic-content-sdk/api';
import { RenderingContextInput } from '@acoustic-content-sdk/component-api';
import {
  createSetterOnSubject,
  createSingleSubject,
  getProperty,
  isString,
  KEY_RENDERING_CONTEXT,
  opDistinctUntilChanged,
  pluckProperty,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { Output } from '@angular/core';
import { Observable } from 'rxjs';

import { defineProperties } from '../../utils/js.utils';
import { AbstractBaseComponent } from './abstract-base.component';

/**
 * Extracts the key field from an item
 */
const KEY_KEY = 'key';
const selectKey = pluckProperty<any, 'key'>(KEY_KEY);

/**
 * Extracts the ID field from any value
 */
const selectId = pluckProperty<any, 'id'>(KEY_ID);

/**
 * Extract the iteration key from the metadata object
 *
 * @param aIndex  - index used as a fallback
 * @param aMetaData - the metadata object

 * @returns the key
 */
const keyFromMetaData = (aIndex: number, aMetaData: any): string | number =>
  selectId(aMetaData) || getProperty(aMetaData, KEY_ACCESSOR, aIndex);

/**
 * Extracts a potential key field from the content item
 *
 * @param aItem - the item to extract from
 * @returns the extracted key field
 */
const keyFromContent = (aItem: any): string => {
  // check if we have a key
  const key = selectKey(aItem);
  return isString(key) ? key : undefined;
};

/**
 * Extracts the iteration key from the rendering context input
 *
 * @param aIndex - index used as a fallback
 * @param aCtx - the rendering context input
 *
 * @returns the key
 */
const keyFromCtx = (
  aIndex: number,
  aCtx: RenderingContextInput
): string | number =>
  isString(aCtx)
    ? aCtx
    : keyFromContent(aCtx) ||
      selectId(aCtx) ||
      keyFromMetaData(aIndex, getProperty(aCtx, KEY_METADATA));

/**
 * Convenience base class for components that work with a `RenderingContextV2`.
 */
export abstract class AbstractRenderingComponent extends AbstractBaseComponent
  implements RenderingContextProviderV2 {
  /**
   * Returns an Observable for the rendering context
   */
  @Output() readonly renderingContext$: Observable<RenderingContextV2>;

  /**
   * Returns an Observable for the layout mode
   */
  @Output() readonly layoutMode$: Observable<string>;

  /**
   * Our constructor
   */
  constructor() {
    super();
    /**
     *  our own pointer
     */
    const that = this;

    const rcSubject = createSingleSubject<RenderingContextV2>();

    /**
     *  rendering context
     */
    const renderingContext$: Observable<RenderingContextV2> = rxPipe(
      rcSubject,
      opDistinctUntilChanged
    );

    /**
     *  define getters and setters
     */
    defineProperties(that, {
      [KEY_RENDERING_CONTEXT]: createSetterOnSubject(rcSubject)
    });

    /**
     *  the handlers
     */
    this.renderingContext$ = renderingContext$;
  }

  /**
   * Generates unique IDs for elements using the following strategy:
   * - if the context is a string, use it as the ID
   * - if the context is an element then ...
   * -- if the element contains an 'id' field, use that
   * -- if the element has a '$metadata.id' field, use that
   * -- if the element has a '$metadata.accessor' field, use that
   * -- fall back to the index
   *
   * @param aIndex - index of the iteration
   * @param aCtx - the input
   *
   * @returns the unique ID
   */
  trackCtx(aIndex: number, aCtx: RenderingContextInput): string | number {
    /**
     *  uses the component ID to track the identity
     */
    return keyFromCtx(aIndex, aCtx);
  }
}
