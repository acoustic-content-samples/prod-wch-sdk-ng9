import {
  WCH_TOKEN_ACTIVE_PAGE,
  WCH_TOKEN_LOGGER_SERVICE,
  WCH_TOKEN_URL_CONFIG
} from '@acoustic-content-sdk/ng-api';
import {
  WCH_TOKEN_INLINE_EDIT_PROVIDER,
  WCH_TOKEN_INLINE_EDIT_URL,
  WCH_TOKEN_WCH_CONFIG
} from '@acoustic-content-sdk/ng-edit-api';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule, Optional } from '@angular/core';

import { createWchHttpInlineEditProviderV2 } from './wch.http.inline.edit.provider';

/**
 * Provides token `WCH_TOKEN_INLINE_EDIT_PROVIDER`
 *
 */
@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: WCH_TOKEN_INLINE_EDIT_PROVIDER,
      useFactory: createWchHttpInlineEditProviderV2,
      deps: [
        HttpClient,
        WCH_TOKEN_URL_CONFIG,
        WCH_TOKEN_WCH_CONFIG,
        WCH_TOKEN_ACTIVE_PAGE,
        [new Optional(), WCH_TOKEN_INLINE_EDIT_URL],
        [new Optional(), WCH_TOKEN_LOGGER_SERVICE]
      ]
    }
  ]
})
export class WchNgHttpInlineEditProviderModule {}
