/* Copyright IBM Corp. 2017 */
import {
  assertProvider,
  createReactProvider,
  ReactModule,
  ACOUSTIC_CONTEXT_DELIVERY_LAYOUT_MAPPING_RESOLVER,
  ACOUSTIC_CONTEXT_LOGGER_SERVICE
} from '@acoustic-content-sdk/react-api';
import { ACOUSTIC_CONTEXT_REDUX_STORE } from '@acoustic-content-sdk/react-redux-api';
import * as React from 'react';

import { DeliveryLayoutMappingResolverService } from '../layout-mapping/delivery.layout.mapping.resolver.service';

/**
 * Module that exposes the `ACOUSTIC_CONTEXT_DELIVERY_LAYOUT_MAPPING_RESOLVER` token.
 *
 * Requires `ACOUSTIC_CONTEXT_REDUX_STORE` and `ACOUSTIC_CONTEXT_LOGGER_SERVICE`
 */
const WchReactReduxLayoutMappingModule: ReactModule = ({ children }) => (
  <ACOUSTIC_CONTEXT_REDUX_STORE.Consumer>
    {(store) => (
      <ACOUSTIC_CONTEXT_LOGGER_SERVICE.Consumer>
        {(logSvc) => (
          <ACOUSTIC_CONTEXT_DELIVERY_LAYOUT_MAPPING_RESOLVER.Provider
            value={
              new DeliveryLayoutMappingResolverService(
                assertProvider(store, ACOUSTIC_CONTEXT_REDUX_STORE),
                logSvc
              )
            }
          >
            {children}
          </ACOUSTIC_CONTEXT_DELIVERY_LAYOUT_MAPPING_RESOLVER.Provider>
        )}
      </ACOUSTIC_CONTEXT_LOGGER_SERVICE.Consumer>
    )}
  </ACOUSTIC_CONTEXT_REDUX_STORE.Consumer>
);

/**
 * Declares the provider
 */
export const ACOUSTIC_PROVIDER_REDUX_DELIVERY_LAYOUT_MAPPING_RESOLVER = createReactProvider(
  WchReactReduxLayoutMappingModule,
  ACOUSTIC_CONTEXT_DELIVERY_LAYOUT_MAPPING_RESOLVER,
  [ACOUSTIC_CONTEXT_REDUX_STORE],
  [ACOUSTIC_CONTEXT_LOGGER_SERVICE]
);
