import {
  LoggerService,
  RenderingContextProviderV2,
  UrlConfig
} from '@acoustic-content-sdk/api';
import { DeliveryTypeResolver } from '@acoustic-content-sdk/component-api';
import { WchInlineEditServiceV2 } from '@acoustic-content-sdk/edit-api';
import {
  ACOUSTIC_TOKEN_DELIVERY_TYPE_RESOLVER,
  ACOUSTIC_TOKEN_LOGGER_SERVICE,
  ACOUSTIC_TOKEN_URL_CONFIG
} from '@acoustic-content-sdk/ng-api';
import {
  WchEditableDirectiveInput,
  WchEditableDirectiveOutput,
  WchEditableDirectiveService,
  ACOUSTIC_TOKEN_DEBUG_PLACEHOLDERS,
  ACOUSTIC_TOKEN_DEFAULT_PLACEHOLDER_TEXT,
  ACOUSTIC_TOKEN_INLINE_EDIT_SERVICE
} from '@acoustic-content-sdk/ng-edit-api';
import { Generator } from '@acoustic-content-sdk/utils';
import { Inject, Injectable, LOCALE_ID, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { WchInternalEditService } from '../../services/wch.internal.edit.service';
import { WchDefaultPlaceholderText } from '../../utils/placeholder';
import { WchEditableDirective } from './editable.directive';

@Injectable()
export class WchEditableDirectiveServiceImpl
  implements WchEditableDirectiveService {
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
  _create: (
    aElementRef: Generator<any>,
    aProvider: RenderingContextProviderV2,
    aInput: WchEditableDirectiveInput,
    aInit$: Observable<any>,
    aDone$: Observable<any>
  ) => WchEditableDirectiveOutput;

  constructor(
    aInternal: WchInternalEditService,
    @Inject(ACOUSTIC_TOKEN_DELIVERY_TYPE_RESOLVER)
    aTypeResolver: DeliveryTypeResolver,
    @Optional()
    @Inject(ACOUSTIC_TOKEN_DEBUG_PLACEHOLDERS)
    aDebugPlaceholders: boolean,
    @Optional()
    @Inject(ACOUSTIC_TOKEN_DEFAULT_PLACEHOLDER_TEXT)
    aDefaultPlaceholderText: WchDefaultPlaceholderText,
    @Inject(LOCALE_ID) aDefaultLocale: string,
    @Inject(ACOUSTIC_TOKEN_URL_CONFIG)
    aUrlConfig$: Observable<UrlConfig>,
    @Optional()
    @Inject(ACOUSTIC_TOKEN_INLINE_EDIT_SERVICE)
    aInlineEditService: WchInlineEditServiceV2,
    @Optional()
    @Inject(ACOUSTIC_TOKEN_LOGGER_SERVICE)
    aLoggerService: LoggerService
  ) {
    // attach the directive creator
    this._create = (
      aElementRef: Generator<HTMLElement>,
      aProvider: RenderingContextProviderV2,
      aInput: WchEditableDirectiveInput,
      aInit$: Observable<any>,
      aDone$: Observable<any>
    ): WchEditableDirectiveOutput =>
      new WchEditableDirective(
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
