/* Copyright IBM Corp. 2017 */
import { createUrlConfig } from '@acoustic-content-sdk/component-redux';
import {
  assertProvider,
  createReactProvider,
  ReactModule,
  ACOUSTIC_CONTEXT_URL_CONFIG
} from '@acoustic-content-sdk/react-api';
import { ACOUSTIC_CONTEXT_REDUX_STORE } from '@acoustic-content-sdk/react-redux-api';
import * as React from 'react';

/**
 * Module that exposes the `ACOUSTIC_CONTEXT_URL_CONFIG` token.
 *
 * Requires `ACOUSTIC_CONTEXT_REDUX_STORE`
 */
const WchReactReduxUrlConfigModule: ReactModule = ({ children }) => (
  <ACOUSTIC_CONTEXT_REDUX_STORE.Consumer>
    {(store) => (
      <ACOUSTIC_CONTEXT_URL_CONFIG.Provider
        value={createUrlConfig(assertProvider(store, ACOUSTIC_CONTEXT_REDUX_STORE))}
      >
        {children}
      </ACOUSTIC_CONTEXT_URL_CONFIG.Provider>
    )}
  </ACOUSTIC_CONTEXT_REDUX_STORE.Consumer>
);

/**
 * Declares the provider
 */
export const ACOUSTIC_PROVIDER_REDUX_URL_CONFIG = createReactProvider(
  WchReactReduxUrlConfigModule,
  ACOUSTIC_CONTEXT_URL_CONFIG,
  [ACOUSTIC_CONTEXT_REDUX_STORE]
);
