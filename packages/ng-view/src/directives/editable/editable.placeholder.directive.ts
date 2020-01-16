import {
  AuthoringPlaceholder,
  LocalizedText,
  RenderingContextProviderV2
} from '@acoustic-content-sdk/api';
import { WchEditableEvent } from '@acoustic-content-sdk/edit-api';
import {
  WchEditablePlaceholderDirectiveInput,
  WchEditablePlaceholderDirectiveOutput
} from '@acoustic-content-sdk/ng-edit-api';
import { UNDEFINED$ } from '@acoustic-content-sdk/utils';
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { AbstractWchEditableDirective } from './abstract.editable.directive';

/**
 * Directive that allows an element of a layout to be editable. The directive assumes that the hosting component exposes
 * a rendering context via the 'onRenderingContext' member. It will then attach to the 'WchInlineEditService' to register
 * the element for edit operations.
 */
export class WchEditablePlaceholderDirective
  extends AbstractWchEditableDirective
  implements WchEditablePlaceholderDirectiveOutput {
  /**
   * The accessor expression
   */
  accessor$: Observable<string>;
  /**
   * Event that tells about the inline edit process
   */
  wchEditable$: EventEmitter<WchEditableEvent>;

  /**
   * Event exposing the current placeholder. Note that this fill only fire if the application
   * runs in preview mode. In live mode this is just the empty event.
   */
  placeholder$: Observable<AuthoringPlaceholder>;

  /**
   * Event exposing the current placeholder text. Note that this fill only fire if the application
   * runs in preview mode. In live mode this is just the empty event. If no placeholder
   * has been defined this returns the default placeholder as specified by the application
   */
  placeholderText$: Observable<LocalizedText> = UNDEFINED$;

  /**
   * Generates the text of an element, potentially replaced by the placeholder
   */
  plainText$: Observable<LocalizedText> = UNDEFINED$;

  /**
   * Generates the formatted text of an element, potentially replaced by the placeholder
   */
  formattedText$: Observable<LocalizedText>;

  /**
   * Generates the accessed data, decoded from the accessor expression
   */
  data$: Observable<any>;

  /**
   * Generates the type of the current element
   */
  typeId$: Observable<string>;

  /**
   * Checks if we should show or hide placeholders
   */
  showPlaceholder$: Observable<boolean>;

  constructor(
    aInput: WchEditablePlaceholderDirectiveInput,
    aProvider: RenderingContextProviderV2
  ) {
    // default
    super(aInput, aProvider);
  }
}
