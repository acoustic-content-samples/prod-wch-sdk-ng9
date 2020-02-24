import { InjectionToken } from '@angular/core';
import { ReduxRootStore } from '@acoustic-content-sdk/redux-store';

/**
 * Injection token for the redux store
 */
export const ACOUSTIC_TOKEN_REDUX_STORE = new InjectionToken<ReduxRootStore>(
  'ACOUSTIC_TOKEN_REDUX_STORE'
);
