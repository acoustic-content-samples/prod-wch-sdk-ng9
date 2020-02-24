/* Copyright IBM Corp. 2017 */
import {
  assertProvider,
  createReactProvider,
  ReactModule,
  ACOUSTIC_CONTEXT_DELIVERY_PAGE_RESOLVER,
  ACOUSTIC_CONTEXT_DELIVERY_SEARCH_RESOLVER,
  ACOUSTIC_CONTEXT_LOGGER_SERVICE
} from '@acoustic-content-sdk/react-api';
import { ACOUSTIC_CONTEXT_REDUX_STORE } from '@acoustic-content-sdk/react-redux-api';
import * as React from 'react';

import { DeliveryPageResolverService } from '../page/delivery.page.resolver.service';

/**
 * Module that exposes the `ACOUSTIC_CONTEXT_DELIVERY_PAGE_RESOLVER` token.
 *
 * Requires `ACOUSTIC_CONTEXT_DELIVERY_SEARCH_RESOLVER`, `ACOUSTIC_CONTEXT_REDUX_STORE` and `ACOUSTIC_CONTEXT_LOGGER_SERVICE`
 */
const WchReactReduxPageModule: ReactModule = ({ children }) => (
  <ACOUSTIC_CONTEXT_REDUX_STORE.Consumer>
    {(store) => (
      <ACOUSTIC_CONTEXT_DELIVERY_SEARCH_RESOLVER.Consumer>
        {(search) => (
          <ACOUSTIC_CONTEXT_LOGGER_SERVICE.Consumer>
            {(logSvc) => (
              <ACOUSTIC_CONTEXT_DELIVERY_PAGE_RESOLVER.Provider
                value={
                  new DeliveryPageResolverService(
                    assertProvider(store, ACOUSTIC_CONTEXT_REDUX_STORE),
                    assertProvider(
                      search,
                      ACOUSTIC_CONTEXT_DELIVERY_SEARCH_RESOLVER
                    ),
                    logSvc
                  )
                }
              >
                {children}
              </ACOUSTIC_CONTEXT_DELIVERY_PAGE_RESOLVER.Provider>
            )}
          </ACOUSTIC_CONTEXT_LOGGER_SERVICE.Consumer>
        )}
      </ACOUSTIC_CONTEXT_DELIVERY_SEARCH_RESOLVER.Consumer>
    )}
  </ACOUSTIC_CONTEXT_REDUX_STORE.Consumer>
);

/**
 * Declares the provider
 */
export const ACOUSTIC_PROVIDER_REDUX_DELIVERY_PAGE_RESOLVER = createReactProvider(
  WchReactReduxPageModule,
  ACOUSTIC_CONTEXT_DELIVERY_PAGE_RESOLVER,
  [ACOUSTIC_CONTEXT_REDUX_STORE, ACOUSTIC_CONTEXT_DELIVERY_SEARCH_RESOLVER],
  [ACOUSTIC_CONTEXT_LOGGER_SERVICE]
);
