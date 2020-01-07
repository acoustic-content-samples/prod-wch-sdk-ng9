import {
  AuthoringPlaceholder,
  LocalizedText,
  LoggerService,
  RenderingContextProviderV2,
  UrlConfig
} from '@acoustic-content-sdk/api';
import { DeliveryTypeResolver } from '@acoustic-content-sdk/component-api';
import {
  AccessorType,
  WchEditableEvent,
  WchInlineEditServiceV2
} from '@acoustic-content-sdk/edit-api';
import {
  WCH_TOKEN_DELIVERY_TYPE_RESOLVER,
  WCH_TOKEN_LOGGER_SERVICE,
  WCH_TOKEN_RENDERING_CONTEXT_PROVIDER,
  WCH_TOKEN_URL_CONFIG
} from '@acoustic-content-sdk/ng-api';
import {
  WCH_TOKEN_DEBUG_PLACEHOLDERS,
  WCH_TOKEN_DEFAULT_PLACEHOLDER_TEXT,
  WCH_TOKEN_INLINE_EDIT_SERVICE
} from '@acoustic-content-sdk/ng-edit-api';
import {
  Directive,
  EventEmitter,
  Inject,
  Input,
  LOCALE_ID,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  ViewContainerRef
} from '@angular/core';
import { Observable } from 'rxjs';

import { WchInternalEditService } from '../../services/wch.internal.edit.service';
import { WchDefaultPlaceholderText } from '../../utils/placeholder';
import { AbstractWchEditableDirective } from './abstract.editable.directive';

/**
 * Directive that allows an element of a layout to be editable. The directive assumes that the hosting component exposes
 * a rendering context via the 'onRenderingContext' member. It will then attach to the 'WchInlineEditService' to register
 * the element for edit operations.
 */
@Directive({
  selector: ':not(wch-placeholder)[wchEditable]:not([wchFormat])',
  exportAs: 'wchEditable'
})
export class WchEditableDirective extends AbstractWchEditableDirective
  implements OnInit, OnDestroy {
  /**
   * Main input value for the directive. It denotes the element that is being edited.
   */
  @Input()
  wchEditable: AccessorType;

  /**
   * Event that tells about the inline edit process
   */
  @Output()
  wchEditable$: EventEmitter<WchEditableEvent>;

  /**
   * Event exposing the current placeholder. If no placeholder exists or placeholders are disabled, this
   * will return `undefined`.
   */
  @Output()
  placeholder$: Observable<AuthoringPlaceholder>;

  /**
   * Event exposing the current placeholder text. If placeholders are disabled, this will return. If no placeholder
   * has been defined this returns the default placeholder as specified by the application
   */
  @Output()
  placeholderText$: Observable<LocalizedText>;

  /**
   * Checks if we should show or hide placeholders
   */
  @Output()
  showPlaceholder$: Observable<boolean>;

  /**
   * Generates the type of the current element
   */
  @Output()
  typeId$: Observable<string>;

  /**
   * Generates the accessed data, decoded from the accessor expression
   */
  @Output()
  data$: Observable<any>;

  constructor(
    vcRef: ViewContainerRef,
    aInternal: WchInternalEditService,
    @Inject(WCH_TOKEN_RENDERING_CONTEXT_PROVIDER)
    aProvider: RenderingContextProviderV2,
    @Inject(WCH_TOKEN_DELIVERY_TYPE_RESOLVER)
    aTypeResolver: DeliveryTypeResolver,
    @Optional()
    @Inject(WCH_TOKEN_DEBUG_PLACEHOLDERS)
    aDebugPlaceholders: boolean,
    @Optional()
    @Inject(WCH_TOKEN_DEFAULT_PLACEHOLDER_TEXT)
    aDefaultPlaceholderText: WchDefaultPlaceholderText,
    @Inject(LOCALE_ID) aDefaultLocale: string,
    @Inject(WCH_TOKEN_URL_CONFIG)
    aUrlConfig$: Observable<UrlConfig>,
    @Optional()
    @Inject(WCH_TOKEN_INLINE_EDIT_SERVICE)
    aInlineEditService: WchInlineEditServiceV2,
    @Optional()
    @Inject(WCH_TOKEN_LOGGER_SERVICE)
    aLoggerService: LoggerService
  ) {
    // default
    super(
      vcRef,
      aInternal,
      aProvider,
      aTypeResolver,
      aDebugPlaceholders,
      aDefaultPlaceholderText,
      aDefaultLocale,
      aUrlConfig$,
      aInlineEditService,
      aLoggerService
    );
  }

  // this seems to be required in order to have AOT recognize the method
  ngOnInit() {
    super.ngOnInit();
  }

  // this seems to be required in order to have AOT recognize the method
  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
