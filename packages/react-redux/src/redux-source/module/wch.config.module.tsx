/* Copyright IBM Corp. 2017 */
import { createWchConfig } from '@acoustic-content-sdk/component-redux';
import {
  assertProvider,
  createReactProvider,
  ReactModule
} from '@acoustic-content-sdk/react-api';
import { ACOUSTIC_CONTEXT_ACOUSTIC_CONFIG } from '@acoustic-content-sdk/react-edit-api';
import { ACOUSTIC_CONTEXT_REDUX_STORE } from '@acoustic-content-sdk/react-redux-api';
import * as React from 'react';

/**
 * Module that exposes the `ACOUSTIC_CONTEXT_ACOUSTIC_CONFIG` token.
 *
 * Requires `ACOUSTIC_CONTEXT_REDUX_STORE`
 */
const WchReactReduxWchConfigModule: ReactModule = ({ children }) => (
  <ACOUSTIC_CONTEXT_REDUX_STORE.Consumer>
    {(store) => (
      <ACOUSTIC_CONTEXT_ACOUSTIC_CONFIG.Provider
        value={createWchConfig(assertProvider(store, ACOUSTIC_CONTEXT_REDUX_STORE))}
      >
        {children}
      </ACOUSTIC_CONTEXT_ACOUSTIC_CONFIG.Provider>
    )}
  </ACOUSTIC_CONTEXT_REDUX_STORE.Consumer>
);

/**
 * Declares the provider
 */
export const ACOUSTIC_PROVIDER_REDUX_ACOUSTIC_CONFIG = createReactProvider(
  WchReactReduxWchConfigModule,
  ACOUSTIC_CONTEXT_ACOUSTIC_CONFIG,
  [ACOUSTIC_CONTEXT_REDUX_STORE]
);
