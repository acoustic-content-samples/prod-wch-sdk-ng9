/* Copyright IBM Corp. 2017 */
import {
  WCH_TOKEN_LOGGER_SERVICE,
  WCH_TOKEN_URL_CONFIG
} from '@acoustic-content-sdk/ng-api';
import { WCH_TOKEN_FETCH_TEXT } from '@acoustic-content-sdk/ng-rest-api';
import { CommonModule } from '@angular/common';
import { NgModule, Optional } from '@angular/core';

import { createFetchText } from './../fetch-text/fetch.text';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: WCH_TOKEN_FETCH_TEXT,
      useFactory: createFetchText,
      deps: [WCH_TOKEN_URL_CONFIG, [new Optional(), WCH_TOKEN_LOGGER_SERVICE]]
    }
  ]
})
export class WchNgReduxFetchTextModule {}
