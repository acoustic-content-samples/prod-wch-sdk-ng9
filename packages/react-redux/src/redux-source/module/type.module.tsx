/* Copyright IBM Corp. 2017 */
import {
  assertProvider,
  createReactProvider,
  ReactModule,
  WCH_CONTEXT_DELIVERY_TYPE_RESOLVER,
  WCH_CONTEXT_LOGGER_SERVICE
} from '@acoustic-content-sdk/react-api';
import { WCH_CONTEXT_REDUX_STORE } from '@acoustic-content-sdk/react-redux-api';
import * as React from 'react';

import { DeliveryTypeResolverService } from '../type/delivery.type.resolver.service';

/**
 * Module that exposes the `WCH_CONTEXT_DELIVERY_TYPE_RESOLVER` token.
 *
 * Requires `WCH_CONTEXT_REDUX_STORE` and `WCH_CONTEXT_LOGGER_SERVICE`
 */
const WchReactReduxTypeModule: ReactModule = ({ children }) => (
  <WCH_CONTEXT_REDUX_STORE.Consumer>
    {(store) => (
      <WCH_CONTEXT_LOGGER_SERVICE.Consumer>
        {(logSvc) => (
          <WCH_CONTEXT_DELIVERY_TYPE_RESOLVER.Provider
            value={
              new DeliveryTypeResolverService(
                assertProvider(store, WCH_CONTEXT_REDUX_STORE),
                logSvc
              )
            }
          >
            {children}
          </WCH_CONTEXT_DELIVERY_TYPE_RESOLVER.Provider>
        )}
      </WCH_CONTEXT_LOGGER_SERVICE.Consumer>
    )}
  </WCH_CONTEXT_REDUX_STORE.Consumer>
);

/**
 * Declares the provider
 */
export const WCH_PROVIDER_REDUX_DELIVERY_TYPE_RESOLVER = createReactProvider(
  WchReactReduxTypeModule,
  WCH_CONTEXT_DELIVERY_TYPE_RESOLVER,
  [WCH_CONTEXT_REDUX_STORE],
  [WCH_CONTEXT_LOGGER_SERVICE]
);
