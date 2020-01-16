import {
  AuthoringPlaceholder,
  LocalizedText,
  LoggerService,
  RenderingContextProviderV2,
  UrlConfig
} from '@acoustic-content-sdk/api';
import { DeliveryTypeResolver } from '@acoustic-content-sdk/component-api';
import {
  WchEditableEvent,
  WchInlineEditServiceV2
} from '@acoustic-content-sdk/edit-api';
import {
  WchEditableDirectiveInput,
  WchEditableDirectiveOutput
} from '@acoustic-content-sdk/ng-edit-api';
import { Generator } from '@acoustic-content-sdk/utils';
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { WchInternalEditService } from '../../services/wch.internal.edit.service';
import { WchDefaultPlaceholderText } from '../../utils/placeholder';
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
    aElementRef: Generator<any>,
    aInternal: WchInternalEditService,
    aProvider: RenderingContextProviderV2,
    aTypeResolver: DeliveryTypeResolver,
    aDebugPlaceholders: boolean,
    aDefaultPlaceholderText: WchDefaultPlaceholderText,
    aDefaultLocale: string,
    aUrlConfig$: Observable<UrlConfig>,
    aInit$: Observable<any>,
    aDone$: Observable<any>,
    aInlineEditService: WchInlineEditServiceV2,
    aLoggerService: LoggerService
  ) {
    // default
    super(
      aInput,
      aElementRef,
      aInternal,
      aProvider,
      aTypeResolver,
      aDebugPlaceholders,
      aDefaultPlaceholderText,
      aDefaultLocale,
      aUrlConfig$,
      aInit$,
      aDone$,
      aInlineEditService,
      aLoggerService
    );
  }
}
