/* Copyright IBM Corp. 2017 */
import { createWchConfig } from '@acoustic-content-sdk/component-redux';
import {
  assertProvider,
  createReactProvider,
  ReactModule
} from '@acoustic-content-sdk/react-api';
import { WCH_CONTEXT_WCH_CONFIG } from '@acoustic-content-sdk/react-edit-api';
import { WCH_CONTEXT_REDUX_STORE } from '@acoustic-content-sdk/react-redux-api';
import * as React from 'react';

/**
 * Module that exposes the `WCH_CONTEXT_WCH_CONFIG` token.
 *
 * Requires `WCH_CONTEXT_REDUX_STORE`
 */
const WchReactReduxWchConfigModule: ReactModule = ({ children }) => (
  <WCH_CONTEXT_REDUX_STORE.Consumer>
    {(store) => (
      <WCH_CONTEXT_WCH_CONFIG.Provider
        value={createWchConfig(assertProvider(store, WCH_CONTEXT_REDUX_STORE))}
      >
        {children}
      </WCH_CONTEXT_WCH_CONFIG.Provider>
    )}
  </WCH_CONTEXT_REDUX_STORE.Consumer>
);

/**
 * Declares the provider
 */
export const WCH_PROVIDER_REDUX_WCH_CONFIG = createReactProvider(
  WchReactReduxWchConfigModule,
  WCH_CONTEXT_WCH_CONFIG,
  [WCH_CONTEXT_REDUX_STORE]
);
