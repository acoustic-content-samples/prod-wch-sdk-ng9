import {
  AuthoringPlaceholder,
  LocalizedText,
  RenderingContextProviderV2
} from '@acoustic-content-sdk/api';
import { AccessorType, WchEditableEvent } from '@acoustic-content-sdk/edit-api';
import { Generator } from '@acoustic-content-sdk/utils';
import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Input to the editable directive service
 */
export interface WchEditableDirectiveInput {
  /**
   * Main input value for the directive. It denotes the element that is being edited.
   */
  wchEditable$: Observable<AccessorType>;
}

/**
 * Input of the editable directive service
 */
export interface WchEditableDirectiveOutput {
  /**
   * The accessor expression
   */
  accessor$: Observable<string>;

  /**
   * Event that tells about the inline edit process
   */
  wchEditable$: Observable<WchEditableEvent>;

  /**
   * Event exposing the current placeholder. If no placeholder exists or placeholders are disabled, this
   * will return `undefined`.
   */
  placeholder$: Observable<AuthoringPlaceholder>;

  /**
   * Event exposing the current placeholder text. If placeholders are disabled, this will return. If no placeholder
   * has been defined this returns the default placeholder as specified by the application
   */
  placeholderText$: Observable<LocalizedText>;

  /**
   * Checks if we should show or hide placeholders
   */
  showPlaceholder$: Observable<boolean>;

  /**
   * Generates the type of the current element
   */
  typeId$: Observable<string>;

  /**
   * Generates the accessed data, decoded from the accessor expression
   */
  data$: Observable<any>;
}

/**
 * Service that returns an instance of the editable directive
 *
 * @internal
 */
export interface WchEditableDirectiveService {
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
   *
   * @internal
   */
  _create(
    aElementRef: Generator<any>,
    aProvider: RenderingContextProviderV2,
    aInput: WchEditableDirectiveInput,
    aInit$: Observable<any>,
    aDone$: Observable<any>
  ): WchEditableDirectiveOutput;
}

/**
 * Injection token for the {@link WchEditableDirectiveService}
 *
 * @internal
 */
export const ACOUSTIC_TOKEN_EDITABLE_DIRECTIVE_SERVICE = new InjectionToken<
  WchEditableDirectiveService
>('ACOUSTIC_TOKEN_EDITABLE_DIRECTIVE_SERVICE');
