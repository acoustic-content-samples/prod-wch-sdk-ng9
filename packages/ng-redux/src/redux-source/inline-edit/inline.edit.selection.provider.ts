import { LoggerService } from '@acoustic-content-sdk/api';
import { AbstractInlineEditSelectionProvider } from '@acoustic-content-sdk/component-redux';
import { InlineEditSelectionProvider } from '@acoustic-content-sdk/edit-api';
import { WCH_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import { WCH_TOKEN_REDUX_STORE } from '@acoustic-content-sdk/ng-redux-api';
import { ReduxRootStore } from '@acoustic-content-sdk/redux-store';
import { Inject, Injectable, Optional } from '@angular/core';

@Injectable()
export class InlineEditSelectionProviderService
  extends AbstractInlineEditSelectionProvider
  implements InlineEditSelectionProvider {
  constructor(
    @Inject(WCH_TOKEN_REDUX_STORE)
    aStore: ReduxRootStore,
    @Optional()
    @Inject(WCH_TOKEN_LOGGER_SERVICE)
    aLogSvc?: LoggerService
  ) {
    super(aStore, aLogSvc);
  }
}
