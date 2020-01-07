import { LoggerService, UrlConfig } from '@acoustic-content-sdk/api';
import { AbstractWchInlineEditService } from '@acoustic-content-sdk/component-edit';
import {
  WchInlineEditProviderV2,
  WchInlineEditServiceV2
} from '@acoustic-content-sdk/edit-api';
import {
  WCH_TOKEN_LOGGER_SERVICE,
  WCH_TOKEN_URL_CONFIG
} from '@acoustic-content-sdk/ng-api';
import { WCH_TOKEN_INLINE_EDIT_PROVIDER } from '@acoustic-content-sdk/ng-edit-api';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnDestroy, Optional } from '@angular/core';
import { Observable } from 'rxjs';

import { WchInternalEditService } from '../services/wch.internal.edit.service';

/**
 * Implementation of the {@link WchInlineEditService} that loads the inline edit library and allows
 * to attach to that library.
 */
@Injectable()
export class WchInlineEditService extends AbstractWchInlineEditService
  implements WchInlineEditServiceV2, OnDestroy {
  constructor(
    aInternal: WchInternalEditService,
    @Inject(WCH_TOKEN_INLINE_EDIT_PROVIDER)
    aProvider$: Observable<WchInlineEditProviderV2>,
    @Inject(WCH_TOKEN_URL_CONFIG)
    aUrlConfig$: Observable<UrlConfig>,
    @Optional()
    @Inject(DOCUMENT)
    aDocument?: any,
    @Optional()
    @Inject(WCH_TOKEN_LOGGER_SERVICE)
    aLogSvc?: LoggerService
  ) {
    // default handling
    super(
      aInternal.inlineEditConsumer,
      aProvider$,
      aUrlConfig$,
      aDocument,
      aLogSvc
    );
  }

  // this seems to be required in order to have AOT recognize the method
  ngOnDestroy() {
    // send the done trigger
    this.unsubscribe();
  }
}
