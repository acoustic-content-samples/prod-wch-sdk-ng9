/* Copyright IBM Corp. 2017 */
import {
  ACOUSTIC_TOKEN_LOGGER_SERVICE,
  ACOUSTIC_TOKEN_URL_CONFIG
} from '@acoustic-content-sdk/ng-api';
import { ACOUSTIC_TOKEN_FETCH_TEXT } from '@acoustic-content-sdk/ng-rest-api';
import { CommonModule } from '@angular/common';
import { NgModule, Optional } from '@angular/core';

import { createFetchText } from './../fetch-text/fetch.text';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: ACOUSTIC_TOKEN_FETCH_TEXT,
      useFactory: createFetchText,
      deps: [ACOUSTIC_TOKEN_URL_CONFIG, [new Optional(), ACOUSTIC_TOKEN_LOGGER_SERVICE]]
    }
  ]
})
export class AcNgReduxFetchTextModule {}
