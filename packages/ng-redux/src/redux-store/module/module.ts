import { LoggerService } from '@acoustic-content-sdk/api';
import { MessageService } from '@acoustic-content-sdk/cross-frame-redux';
import { WCH_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import { WCH_TOKEN_REDUX_STORE } from '@acoustic-content-sdk/ng-redux-api';
import {
  createReduxRootStore,
  ReduxRootStore
} from '@acoustic-content-sdk/redux-store';
import { boxLoggerService } from '@acoustic-content-sdk/utils';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional } from '@angular/core';

import { PageSelectionService } from '../../redux-sync/selection/page-selection.service';
import { createStoreFeature } from '../feature/store.feature';
import { ChildWindowMessageService } from '../service/child.message.service';

export function createStore(
  msgService: MessageService,
  aLogSvc?: LoggerService
): ReduxRootStore {
  // resolve the logger
  const logSvc = boxLoggerService(aLogSvc);
  // our redux feature
  const storeFeature = createStoreFeature(msgService);
  const store = createReduxRootStore({ logSvc });
  store.addFeatureModule(storeFeature);
  // returns the store
  return store;
}

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    ChildWindowMessageService,
    {
      deps: [
        ChildWindowMessageService,
        [new Optional(), WCH_TOKEN_LOGGER_SERVICE]
      ],
      provide: WCH_TOKEN_REDUX_STORE,
      useFactory: createStore
    },
    PageSelectionService
  ]
})
export class WchNgReduxStoreModule {
  constructor(private pageSelectionService: PageSelectionService) {}
}
