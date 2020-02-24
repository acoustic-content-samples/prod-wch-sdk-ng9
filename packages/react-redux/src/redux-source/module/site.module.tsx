/* Copyright IBM Corp. 2017 */
import {
  assertProvider,
  createReactProvider,
  ReactModule,
  ACOUSTIC_CONTEXT_DELIVERY_CONTENT_RESOLVER,
  ACOUSTIC_CONTEXT_DELIVERY_SITE_RESOLVER,
  ACOUSTIC_CONTEXT_LOGGER_SERVICE
} from '@acoustic-content-sdk/react-api';
import { ACOUSTIC_CONTEXT_REDUX_STORE } from '@acoustic-content-sdk/react-redux-api';
import * as React from 'react';

import { SiteResolverService } from '../site/site.resolver.service';

/**
 * Module that exposes the `ACOUSTIC_CONTEXT_DELIVERY_SITE_RESOLVER` token.
 *
 * Requires `ACOUSTIC_CONTEXT_DELIVERY_CONTENT_RESOLVER`, `ACOUSTIC_CONTEXT_REDUX_STORE` and `ACOUSTIC_CONTEXT_LOGGER_SERVICE`
 */
const WchReactReduxSiteModule: ReactModule = ({ children }) => (
  <ACOUSTIC_CONTEXT_REDUX_STORE.Consumer>
    {(store) => (
      <ACOUSTIC_CONTEXT_DELIVERY_CONTENT_RESOLVER.Consumer>
        {(content) => (
          <ACOUSTIC_CONTEXT_LOGGER_SERVICE.Consumer>
            {(logSvc) => (
              <ACOUSTIC_CONTEXT_DELIVERY_SITE_RESOLVER.Provider
                value={
                  new SiteResolverService(
                    assertProvider(store, ACOUSTIC_CONTEXT_REDUX_STORE),
                    assertProvider(
                      content,
                      ACOUSTIC_CONTEXT_DELIVERY_CONTENT_RESOLVER
                    ),
                    logSvc
                  )
                }
              >
                {children}
              </ACOUSTIC_CONTEXT_DELIVERY_SITE_RESOLVER.Provider>
            )}
          </ACOUSTIC_CONTEXT_LOGGER_SERVICE.Consumer>
        )}
      </ACOUSTIC_CONTEXT_DELIVERY_CONTENT_RESOLVER.Consumer>
    )}
  </ACOUSTIC_CONTEXT_REDUX_STORE.Consumer>
);

/**
 * Declares the provider
 */
export const ACOUSTIC_PROVIDER_REDUX_DELIVERY_SITE_RESOLVER = createReactProvider(
  WchReactReduxSiteModule,
  ACOUSTIC_CONTEXT_DELIVERY_SITE_RESOLVER,
  [ACOUSTIC_CONTEXT_REDUX_STORE, ACOUSTIC_CONTEXT_DELIVERY_CONTENT_RESOLVER],
  [ACOUSTIC_CONTEXT_LOGGER_SERVICE]
);
