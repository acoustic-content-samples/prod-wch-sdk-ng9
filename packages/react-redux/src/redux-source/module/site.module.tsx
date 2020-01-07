/* Copyright IBM Corp. 2017 */
import {
  assertProvider,
  createReactProvider,
  ReactModule,
  WCH_CONTEXT_DELIVERY_CONTENT_RESOLVER,
  WCH_CONTEXT_DELIVERY_SITE_RESOLVER,
  WCH_CONTEXT_LOGGER_SERVICE
} from '@acoustic-content-sdk/react-api';
import { WCH_CONTEXT_REDUX_STORE } from '@acoustic-content-sdk/react-redux-api';
import * as React from 'react';

import { SiteResolverService } from '../site/site.resolver.service';

/**
 * Module that exposes the `WCH_CONTEXT_DELIVERY_SITE_RESOLVER` token.
 *
 * Requires `WCH_CONTEXT_DELIVERY_CONTENT_RESOLVER`, `WCH_CONTEXT_REDUX_STORE` and `WCH_CONTEXT_LOGGER_SERVICE`
 */
const WchReactReduxSiteModule: ReactModule = ({ children }) => (
  <WCH_CONTEXT_REDUX_STORE.Consumer>
    {(store) => (
      <WCH_CONTEXT_DELIVERY_CONTENT_RESOLVER.Consumer>
        {(content) => (
          <WCH_CONTEXT_LOGGER_SERVICE.Consumer>
            {(logSvc) => (
              <WCH_CONTEXT_DELIVERY_SITE_RESOLVER.Provider
                value={
                  new SiteResolverService(
                    assertProvider(store, WCH_CONTEXT_REDUX_STORE),
                    assertProvider(
                      content,
                      WCH_CONTEXT_DELIVERY_CONTENT_RESOLVER
                    ),
                    logSvc
                  )
                }
              >
                {children}
              </WCH_CONTEXT_DELIVERY_SITE_RESOLVER.Provider>
            )}
          </WCH_CONTEXT_LOGGER_SERVICE.Consumer>
        )}
      </WCH_CONTEXT_DELIVERY_CONTENT_RESOLVER.Consumer>
    )}
  </WCH_CONTEXT_REDUX_STORE.Consumer>
);

/**
 * Declares the provider
 */
export const WCH_PROVIDER_REDUX_DELIVERY_SITE_RESOLVER = createReactProvider(
  WchReactReduxSiteModule,
  WCH_CONTEXT_DELIVERY_SITE_RESOLVER,
  [WCH_CONTEXT_REDUX_STORE, WCH_CONTEXT_DELIVERY_CONTENT_RESOLVER],
  [WCH_CONTEXT_LOGGER_SERVICE]
);
