import {
  AuthoringPlaceholder,
  LocalizedText,
  RenderingContextProviderV2
} from '@acoustic-content-sdk/api';
import { AccessorType } from '@acoustic-content-sdk/edit-api';
import { createReactContext } from '@acoustic-content-sdk/react-api';
import { ObservableOrT } from '@acoustic-content-sdk/utils';
import { Observable } from 'rxjs';

/**
 * type for placeholder
 */
export declare type WchDefaultPlaceholder = ObservableOrT<
  string | LocalizedText
>;

export interface WchPlaceholder {
  /**
   * The accessor expression
   */
  accessor$: Observable<string>;

  /**
   * Event exposing the current placeholder. If no placeholder exists or placeholders are disabled, this
   * will return 'undefined'.
   */
  placeholder$: Observable<AuthoringPlaceholder>;

  /**
   * Event exposing the current placeholder text. If placeholders are disabled, this will return 'undefined'. If no placeholder
   * has been defined this returns the default placeholder as specified by the application, else 'undefined'.
   */
  placeholderText$: Observable<LocalizedText>;

  /**
   * Generates the accessed data, decoded from the accessor expression
   */
  data$: Observable<any>;

  /**
   * Decodes the type of the currently accessed element
   */
  typeId$: Observable<string>;

  /**
   * Generates the text of an element, potentially replaced by the placeholder
   */
  plainText$: Observable<LocalizedText>;

  /**
   * Generates the formatted text of an element, potentially replaced by the placeholder
   */
  formattedText$: Observable<LocalizedText>;

  /**
   * Checks if we should show or hide placeholders
   */
  showPlaceholder$: Observable<boolean>;
}

export interface WchPlaceholderProvider {
  getPlaceholder: (
    aAccessor: AccessorType,
    aProvider: RenderingContextProviderV2
  ) => WchPlaceholder;
}

export const WCH_CONTEXT_PLACEHOLDER_PROVIDER = createReactContext<
  WchPlaceholderProvider
>('WCH_CONTEXT_PLACEHOLDER_PROVIDER');
