/* Copyright IBM Corp. 2017 */
import { createUrlConfig } from '@acoustic-content-sdk/component-redux';
import {
  assertProvider,
  createReactProvider,
  ReactModule,
  WCH_CONTEXT_URL_CONFIG
} from '@acoustic-content-sdk/react-api';
import { WCH_CONTEXT_REDUX_STORE } from '@acoustic-content-sdk/react-redux-api';
import * as React from 'react';

/**
 * Module that exposes the `WCH_CONTEXT_URL_CONFIG` token.
 *
 * Requires `WCH_CONTEXT_REDUX_STORE`
 */
const WchReactReduxUrlConfigModule: ReactModule = ({ children }) => (
  <WCH_CONTEXT_REDUX_STORE.Consumer>
    {(store) => (
      <WCH_CONTEXT_URL_CONFIG.Provider
        value={createUrlConfig(assertProvider(store, WCH_CONTEXT_REDUX_STORE))}
      >
        {children}
      </WCH_CONTEXT_URL_CONFIG.Provider>
    )}
  </WCH_CONTEXT_REDUX_STORE.Consumer>
);

/**
 * Declares the provider
 */
export const WCH_PROVIDER_REDUX_URL_CONFIG = createReactProvider(
  WchReactReduxUrlConfigModule,
  WCH_CONTEXT_URL_CONFIG,
  [WCH_CONTEXT_REDUX_STORE]
);
