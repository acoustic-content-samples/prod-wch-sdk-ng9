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
import { ACOUSTIC_TOKEN_REDUX_STORE } from '@acoustic-content-sdk/ng-redux-api';
import { ReduxRootStore } from '@acoustic-content-sdk/redux-store';
import { rxPipe } from '@acoustic-content-sdk/utils';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnDestroy, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { WchInternalEditService } from '../services/wch.internal.edit.service';

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
    @Inject(ACOUSTIC_TOKEN_REDUX_STORE)
    aStore: ReduxRootStore,
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
      aStore,
      aDocument,
      aLogSvc
    );

    rxPipe(window.parent['@acoustic/destroy-obs'], take(1)).subscribe(() => {
      this.unsubscribe();
    })
  }

  // this seems to be required in order to have AOT recognize the method
  ngOnDestroy() {
    // send the done trigger
    this.unsubscribe();
  }
}
