import {
  LoggerService,
  RenderingContextProviderV2,
  UrlConfig
} from '@acoustic-content-sdk/api';
import { DeliveryTypeResolver } from '@acoustic-content-sdk/component-api';
import { AccessorType } from '@acoustic-content-sdk/edit-api';
import {
  ACOUSTIC_TOKEN_DELIVERY_TYPE_RESOLVER,
  ACOUSTIC_TOKEN_LOGGER_SERVICE,
  ACOUSTIC_TOKEN_URL_CONFIG
} from '@acoustic-content-sdk/ng-api';
import {
  ACOUSTIC_TOKEN_DEBUG_PLACEHOLDERS,
  ACOUSTIC_TOKEN_DEFAULT_PLACEHOLDER_TEXT,
  WchPlaceholder,
  WchPlaceholderProvider
} from '@acoustic-content-sdk/ng-edit-api';
import { AbstractLifeCycleComponent } from '@acoustic-content-sdk/ng-utils';
import {
  Inject,
  Injectable,
  LOCALE_ID,
  OnDestroy,
  Optional
} from '@angular/core';
import { Observable } from 'rxjs';

import { WchDefaultPlaceholderText } from '../../utils/placeholder';
import { WchInternalEditService } from '../wch.internal.edit.service';
import { WchPlaceholderImpl } from './placeholders.impl';

@Injectable({ providedIn: 'root' })
export class WchPlaceholderService extends AbstractLifeCycleComponent
  implements OnDestroy, WchPlaceholderProvider {
  getPlaceholder: (
    aAccessor: AccessorType,
    aProvider: RenderingContextProviderV2
  ) => WchPlaceholder;

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
    @Inject(ACOUSTIC_TOKEN_LOGGER_SERVICE)
    aLoggerService: LoggerService
  ) {
    super();
    const that = this;

    that.getPlaceholder = (
      aAccessor: AccessorType,
      aProvider: RenderingContextProviderV2
    ): WchPlaceholder =>
      new WchPlaceholderImpl(
        aAccessor,
        aInternal,
        aProvider,
        aTypeResolver,
        aDefaultPlaceholderText,
        aDebugPlaceholders,
        aDefaultLocale,
        aUrlConfig$,
        aLoggerService
      );
  }

  // this seems to be required in order to have AOT recognize the method
  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
