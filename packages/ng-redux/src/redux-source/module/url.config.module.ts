/* Copyright IBM Corp. 2017 */
import { UrlConfig } from '@acoustic-content-sdk/api';
import { createUrlConfig } from '@acoustic-content-sdk/component-redux';
import { ACOUSTIC_TOKEN_URL_CONFIG } from '@acoustic-content-sdk/ng-api';
import { ACOUSTIC_TOKEN_REDUX_STORE } from '@acoustic-content-sdk/ng-redux-api';
import { ReduxRootState } from '@acoustic-content-sdk/redux-store';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Store } from 'redux';
import { Observable } from 'rxjs';

export function proxyCreateUrlConfig(
  aStore: Store<ReduxRootState>
): Observable<UrlConfig> {
  return createUrlConfig(aStore);
}

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: ACOUSTIC_TOKEN_URL_CONFIG,
      useFactory: proxyCreateUrlConfig,
      deps: [ACOUSTIC_TOKEN_REDUX_STORE]
    }
  ]
})
export class AcNgReduxUrlConfigModule {}
