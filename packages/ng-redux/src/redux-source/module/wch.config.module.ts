/* Copyright IBM Corp. 2017 */
import { createWchConfig } from '@acoustic-content-sdk/component-redux';
import { WchConfig } from '@acoustic-content-sdk/edit-api';
import { ACOUSTIC_TOKEN_ACOUSTIC_CONFIG } from '@acoustic-content-sdk/ng-edit-api';
import { ACOUSTIC_TOKEN_REDUX_STORE } from '@acoustic-content-sdk/ng-redux-api';
import { ReduxRootState } from '@acoustic-content-sdk/redux-store';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Store } from 'redux';
import { Observable } from 'rxjs';

export function proxyCreateWchConfig(
  aStore: Store<ReduxRootState>
): Observable<WchConfig> {
  return createWchConfig(aStore);
}

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: ACOUSTIC_TOKEN_ACOUSTIC_CONFIG,
      useFactory: createWchConfig,
      deps: [ACOUSTIC_TOKEN_REDUX_STORE]
    }
  ]
})
export class AcNgReduxWchConfigModule {}
