/* Copyright IBM Corp. 2017 */
import { HubInfoUrlProvider, UrlConfig } from '@acoustic-content-sdk/api';
import {
  WCH_TOKEN_API_URL,
  WCH_TOKEN_BASE_URL,
  WCH_TOKEN_RESOURCE_URL,
  WCH_TOKEN_URL_CONFIG
} from '@acoustic-content-sdk/ng-api';
import { CommonModule, DOCUMENT } from '@angular/common';
import { NgModule, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { createUrlConfig } from './wch.info.service';

export function proxyCreateUrlConfig(
  aBaseUrl?: HubInfoUrlProvider,
  aApiUrl?: HubInfoUrlProvider,
  aResourceUrl?: HubInfoUrlProvider,
  aDocument?: any
): Observable<UrlConfig> {
  return createUrlConfig(aBaseUrl, aApiUrl, aResourceUrl, aDocument);
}

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: WCH_TOKEN_URL_CONFIG,
      useFactory: proxyCreateUrlConfig,
      deps: [
        [new Optional(), WCH_TOKEN_BASE_URL],
        [new Optional(), WCH_TOKEN_API_URL],
        [new Optional(), WCH_TOKEN_RESOURCE_URL],
        [new Optional(), DOCUMENT]
      ]
    }
  ]
})
export class WchNgRestUrlConfigModule {}
