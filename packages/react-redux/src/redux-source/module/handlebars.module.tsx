/* Copyright IBM Corp. 2017 */
import {
  assertProvider,
  createReactProvider,
  ReactModule,
  WCH_CONTEXT_HANDLEBARS_RESOLVER,
  WCH_CONTEXT_LOGGER_SERVICE
} from '@acoustic-content-sdk/react-api';
import { WCH_CONTEXT_REDUX_STORE } from '@acoustic-content-sdk/react-redux-api';
import * as React from 'react';

import { HandlebarsResolverService } from '../handlebars/handlebars.resolver.service';

/**
 * Module that exposes the `WCH_CONTEXT_HANDLEBARS_RESOLVER` token.
 *
 * Requires `WCH_CONTEXT_REDUX_STORE` and `WCH_CONTEXT_LOGGER_SERVICE`
 */
const WchReactReduxHbsModule: ReactModule = ({ children }) => (
  <WCH_CONTEXT_REDUX_STORE.Consumer>
    {(store) => (
      <WCH_CONTEXT_LOGGER_SERVICE.Consumer>
        {(logSvc) => (
          <WCH_CONTEXT_HANDLEBARS_RESOLVER.Provider
            value={
              new HandlebarsResolverService(
                assertProvider(store, WCH_CONTEXT_REDUX_STORE),
                logSvc
              )
            }
          >
            {children}
          </WCH_CONTEXT_HANDLEBARS_RESOLVER.Provider>
        )}
      </WCH_CONTEXT_LOGGER_SERVICE.Consumer>
    )}
  </WCH_CONTEXT_REDUX_STORE.Consumer>
);

/**
 * Declares the provider
 */
export const WCH_PROVIDER_REDUX_HANDLEBARS_RESOLVER = createReactProvider(
  WchReactReduxHbsModule,
  WCH_CONTEXT_HANDLEBARS_RESOLVER,
  [WCH_CONTEXT_REDUX_STORE],
  [WCH_CONTEXT_LOGGER_SERVICE]
);
