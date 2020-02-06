import { RenderingContextProviderV2 } from '@acoustic-content-sdk/api';
import { AccessorType } from '@acoustic-content-sdk/edit-api';
import { Generator } from '@acoustic-content-sdk/utils';
import { InjectionToken, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Input to the editable directive service
 */
export interface WchSelectableDirectiveInput {
  /**
   * Main input value for the directive. It denotes the element that can be selected.
   */
  wchSelectable$: Observable<AccessorType>;
}

/**
 * Output of the editable directive service
 */
export interface WchSelectableDirectiveOutput {}

/**
 * Service that returns an instance of the selectable directive
 */
export interface WchSelectableDirectiveService {
  /**
   * Constructs an instance of the directive
   *
   * @param aElementRef - lazy reference to the element
   * @param aProvider - the rendering context provider
   * @param aInput - the input properties
   * @param aInit$ - init lifecycle
   * @param aDone$ - done lifecycle
   * @param aRenderer - the renderer, since we cannot instantiate it in a service
   *
   * @returns the creator function
   *
   * @internal
   */
  _create(
    aElementRef: Generator<any>,
    aProvider: RenderingContextProviderV2,
    aInput: WchSelectableDirectiveInput,
    aInit$: Observable<any>,
    aDone$: Observable<any>,
    aRenderer: Renderer2
  ): WchSelectableDirectiveOutput;
}

/**
 * Injection token for the {@link WchSelectableDirectiveService}
 *
 * @internal
 */
export const WCH_TOKEN_SELECTABLE_DIRECTIVE_SERVICE = new InjectionToken<
  WchSelectableDirectiveService
>('WCH_TOKEN_SELECTABLE_DIRECTIVE_SERVICE');
