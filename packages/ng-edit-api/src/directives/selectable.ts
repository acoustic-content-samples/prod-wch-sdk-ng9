import { RenderingContextProviderV2 } from '@acoustic-content-sdk/api';
import { AccessorType } from '@acoustic-content-sdk/edit-api';
import { Generator } from '@acoustic-content-sdk/utils';
import { InjectionToken } from '@angular/core';
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
 * Implementation of the service
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
   *
   * @returns the creator function
   */
  createDirective(
    aElementRef: Generator<any>,
    aProvider: RenderingContextProviderV2,
    aInput: WchSelectableDirectiveInput,
    aInit$: Observable<any>,
    aDone$: Observable<any>
  ): WchSelectableDirectiveOutput;
}

/**
 * Injection token for the {@link WchSelectableDirectiveService}
 */
export const WCH_TOKEN_SELECTABLE_DIRECTIVE_SERVICE = new InjectionToken<
  WchSelectableDirectiveService
>('WCH_TOKEN_SELECTABLE_DIRECTIVE_SERVICE');
