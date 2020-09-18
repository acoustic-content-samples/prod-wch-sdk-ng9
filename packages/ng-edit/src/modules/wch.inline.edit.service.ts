import { LoggerService, UrlConfig } from '@acoustic-content-sdk/api';
import { AbstractWchInlineEditService } from '@acoustic-content-sdk/component-edit';
import {
  WchInlineEditProviderV2,
  WchInlineEditServiceV2
} from '@acoustic-content-sdk/edit-api';
import {
  ACOUSTIC_TOKEN_LOGGER_SERVICE,
  ACOUSTIC_TOKEN_URL_CONFIG
} from '@acoustic-content-sdk/ng-api';
import { ACOUSTIC_TOKEN_INLINE_EDIT_PROVIDER } from '@acoustic-content-sdk/ng-edit-api';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnDestroy, Optional } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { WchInternalEditService } from '../services/wch.internal.edit.service';
import { ACOUSTIC_TOKEN_DESTROY_SUBJECT } from '@acoustic-content-sdk/ng-api';

/**
 * Implementation of the `WchInlineEditServiceV2` that loads the inline edit library and allows
 * to attach to that library.
 */
@Injectable()
export class WchInlineEditService extends AbstractWchInlineEditService
  implements WchInlineEditServiceV2, OnDestroy {
  constructor(
    aInternal: WchInternalEditService,
    @Inject(ACOUSTIC_TOKEN_INLINE_EDIT_PROVIDER)
    aProvider$: Observable<WchInlineEditProviderV2>,
    @Inject(ACOUSTIC_TOKEN_URL_CONFIG)
    aUrlConfig$: Observable<UrlConfig>,
    @Inject(ACOUSTIC_TOKEN_DESTROY_SUBJECT)
    aDestroySubject: Subject<any>,
    @Optional()
    @Inject(DOCUMENT)
    aDocument?: any,
    @Optional()
    @Inject(ACOUSTIC_TOKEN_LOGGER_SERVICE)
    aLogSvc?: LoggerService
  ) {
    // default handling
    super(
      aInternal.inlineEditConsumer,
      aProvider$,
      aUrlConfig$,
      aDestroySubject,
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
