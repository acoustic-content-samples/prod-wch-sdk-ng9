/* Copyright IBM Corp. 2018 */
import { RenderingContextV2 } from '@acoustic-content-sdk/api';
import { Observable } from 'rxjs';

import { AccessorType } from '../../interfaces/inline.edit.service';
import { WchInlineEditRegistrationResult } from '../../provider/inline.edit.provider';

/**
 * Type definition of the register method that allows to register
 * DOM elements with an inline edit provider.
 */
export type WchInlineEditRegistrationV2 = (
  nativeElement: any,
  accessor: AccessorType,
  renderingContext$: Observable<RenderingContextV2>
) => WchInlineEditRegistrationResult;

/**
 * Interface exposed by an inline edit provider implementation
 *
 * Implementors may also implement `EventTargetLike` to send item independent events
 */
export interface WchInlineEditProviderV2 {
  /**
   * The register method that allows to register DOM elements with the provider
   *
   * @param nativeElement - The DOM element that gets registered for inline edit
   * @param accessor - the accessor expression relative to the content item identified by the rendering context
   * @param renderingContext$ - the observable stream of rendering contexts for the item
   *
   * @returns an event emitter that sends item dependent inline edit events
   */
  register: WchInlineEditRegistrationV2;
}
