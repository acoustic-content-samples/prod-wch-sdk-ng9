import {
  ACOUSTIC_TOKEN_ACTIVE_PAGE,
  ACOUSTIC_TOKEN_LOGGER_SERVICE,
  ACOUSTIC_TOKEN_URL_CONFIG
} from '@acoustic-content-sdk/ng-api';
import {
  ACOUSTIC_TOKEN_INLINE_EDIT_PROVIDER,
  ACOUSTIC_TOKEN_INLINE_EDIT_URL,
  ACOUSTIC_TOKEN_ACOUSTIC_CONFIG
} from '@acoustic-content-sdk/ng-edit-api';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule, Optional } from '@angular/core';

import { createWchHttpInlineEditProviderV2 } from './wch.http.inline.edit.provider';

/**
 * Provides token `ACOUSTIC_TOKEN_INLINE_EDIT_PROVIDER`
 *
 */
@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: ACOUSTIC_TOKEN_INLINE_EDIT_PROVIDER,
      useFactory: createWchHttpInlineEditProviderV2,
      deps: [
        HttpClient,
        ACOUSTIC_TOKEN_URL_CONFIG,
        ACOUSTIC_TOKEN_ACOUSTIC_CONFIG,
        ACOUSTIC_TOKEN_ACTIVE_PAGE,
        [new Optional(), ACOUSTIC_TOKEN_INLINE_EDIT_URL],
        [new Optional(), ACOUSTIC_TOKEN_LOGGER_SERVICE]
      ]
    }
  ]
})
export class WchNgHttpInlineEditProviderModule {}
