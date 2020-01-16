import {
  LocalizedText,
  RenderingContextProviderV2
} from '@acoustic-content-sdk/api';
import { Generator } from '@acoustic-content-sdk/utils';
import { InjectionToken, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { WchPlaceholder } from '../interfaces/placeholder';
import {
  WchEditableDirectiveInput,
  WchEditableDirectiveOutput
} from './editable';

/**
 * Potential values for the 'wchFormat' field
 */
export declare type WchEditableFormat = 'text' | 'html' | 'auto';

/**
 * Input to the editable directive service
 */
export interface WchEditablePlaceholderDirectiveInput
  extends WchEditableDirectiveInput {
  /**
   * If specified, the directive will update the textual content of the attached node with
   * either the value of the edited property or with the configured placeholder, if there is any. The
   * format flag describes if the value is considered to be plain text ('text'), formatted text ('html') or
   * if the type is to be discovered automatically.
   *
   * If missing, the property has to be updated by the designer of the template, explicitly.
   */
  wchFormat$: Observable<WchEditableFormat>;
}

/**
 * Input of the editable directive service
 */
export interface WchEditablePlaceholderDirectiveOutput
  extends WchEditableDirectiveOutput,
    WchPlaceholder {
  /**
   * Generates the text of an element, potentially replaced by the placeholder
   */
  plainText$: Observable<LocalizedText>;

  /**
   * Generates the formatted text of an element, potentially replaced by the placeholder
   */
  formattedText$: Observable<LocalizedText>;
}

/**
 * Service that returns an instance of the editable directive
 */
export interface WchEditablePlaceholderDirectiveService {
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
    aInput: WchEditablePlaceholderDirectiveInput,
    aInit$: Observable<any>,
    aDone$: Observable<any>,
    aRenderer: Renderer2
  ): WchEditablePlaceholderDirectiveOutput;
}

/**
 * Injection token for the {@link WchEditablePlaceholderDirectiveService}
 */
export const WCH_TOKEN_EDITABLE_PLACEHOLDER_DIRECTIVE_SERVICE = new InjectionToken<
  WchEditablePlaceholderDirectiveService
>('WCH_TOKEN_EDITABLE_PLACEHOLDER_DIRECTIVE_SERVICE');
