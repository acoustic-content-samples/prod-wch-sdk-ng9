import { LoggerService } from '@acoustic-content-sdk/api';
import { getStoreFromParent } from '@acoustic-content-sdk/component-redux';
import { WCH_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import { WCH_TOKEN_EDIT_HOST_WINDOW } from '@acoustic-content-sdk/ng-edit-api';
import { WCH_TOKEN_REDUX_STORE } from '@acoustic-content-sdk/ng-redux-api';
import { logModule } from '@acoustic-content-sdk/utils';
import { CommonModule } from '@angular/common';
import { Inject, NgModule, Optional } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PageSelectionService } from '../../redux-sync/selection/page-selection.service';
import { MODULE, VERSION } from './../../version';

const LOGGER = 'WchNgParentFrameReduxStoreModule';

/**
 * Module that exposes an implementation of `WCH_TOKEN_REDUX_STORE`. The implementation
 * accesses the store from the parent iframe. Prerequisite is that the parent (the shell)
 * and the application that uses this module run on the same origin.
 *
 * Depends on: `WCH_TOKEN_EDIT_HOST_WINDOW`
 */
@NgModule({
  imports: [CommonModule, RouterModule],
  providers: [
    {
      deps: [
        WCH_TOKEN_EDIT_HOST_WINDOW,
        [new Optional(), WCH_TOKEN_LOGGER_SERVICE]
      ],
      provide: WCH_TOKEN_REDUX_STORE,
      useFactory: getStoreFromParent
    },
    PageSelectionService
  ]
})
export class WchNgParentFrameReduxStoreModule {
  constructor(
    private pageSelectionService: PageSelectionService,
    @Optional() @Inject(WCH_TOKEN_LOGGER_SERVICE) aLogSvc: LoggerService
  ) {
    // log module startup
    logModule(VERSION, MODULE, aLogSvc);
  }
}
