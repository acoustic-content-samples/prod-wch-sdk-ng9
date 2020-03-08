/* Copyright IBM Corp. 2017 */
import { HubInfoUrlProvider, UrlConfig } from '@acoustic-content-sdk/api';
import {
  ACOUSTIC_TOKEN_API_URL,
  ACOUSTIC_TOKEN_BASE_URL,
  ACOUSTIC_TOKEN_RESOURCE_URL,
  ACOUSTIC_TOKEN_URL_CONFIG
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

/**
 * {@link https://angular.io/guide/ngmodules|Angular Module} that exposes an implementation of `ACOUSTIC_TOKEN_URL_CONFIG`.
 */
@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: ACOUSTIC_TOKEN_URL_CONFIG,
      useFactory: proxyCreateUrlConfig,
      deps: [
        [new Optional(), ACOUSTIC_TOKEN_BASE_URL],
        [new Optional(), ACOUSTIC_TOKEN_API_URL],
        [new Optional(), ACOUSTIC_TOKEN_RESOURCE_URL],
        [new Optional(), DOCUMENT]
      ]
    }
  ]
})
export class AcNgRestUrlConfigModule {}
