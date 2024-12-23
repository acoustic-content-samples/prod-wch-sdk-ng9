import {
  AuthoringPlaceholder,
  LocalizedText,
  RenderingContextProviderV2
} from '@acoustic-content-sdk/api';
import { WchEditableEvent } from '@acoustic-content-sdk/edit-api';
import {
  WchEditableDirectiveInput,
  WchEditableDirectiveOutput
} from '@acoustic-content-sdk/ng-edit-api';
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { AbstractWchEditableDirective } from './abstract.editable.directive';

/**
 * Directive that allows an element of a layout to be editable. The directive assumes that the hosting component exposes
 * a rendering context via the 'onRenderingContext' member. It will then attach to the 'WchInlineEditService' to register
 * the element for edit operations.
 */
export class WchEditableDirective extends AbstractWchEditableDirective
  implements WchEditableDirectiveOutput {
  /**
   * The accessor expression
   */
  accessor$: Observable<string>;

  /**
   * Event that tells about the inline edit process
   */
  wchEditable$: EventEmitter<WchEditableEvent>;

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

  constructor(
    aInput: WchEditableDirectiveInput,
    aProvider: RenderingContextProviderV2
  ) {
    // default
    super(aInput, aProvider);
  }
}
