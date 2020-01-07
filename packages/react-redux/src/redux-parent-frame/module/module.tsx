import { getStoreFromParent } from '@acoustic-content-sdk/component-redux';
import {
  assertProvider,
  createReactProvider,
  ReactModule,
  WCH_CONTEXT_LOGGER_SERVICE
} from '@acoustic-content-sdk/react-api';
import { WCH_CONTEXT_EDIT_HOST_WINDOW } from '@acoustic-content-sdk/react-edit-api';
import { WCH_CONTEXT_REDUX_STORE } from '@acoustic-content-sdk/react-redux-api';
import * as React from 'react';

/**
 * Module that exposes the `WCH_CONTEXT_REDUX_STORE` token.
 *
 * Requires `WCH_CONTEXT_EDIT_HOST_WINDOW` and `WCH_CONTEXT_LOGGER_SERVICE`
 */
const WchReactParentFrameReduxStoreModule: ReactModule = ({ children }) => (
  <WCH_CONTEXT_LOGGER_SERVICE.Consumer>
    {(logSvc) => (
      <WCH_CONTEXT_EDIT_HOST_WINDOW.Consumer>
        {(wnd) => (
          <WCH_CONTEXT_REDUX_STORE.Provider
            value={getStoreFromParent(
              assertProvider(wnd, WCH_CONTEXT_EDIT_HOST_WINDOW),
              logSvc
            )}
          >
            {children}
          </WCH_CONTEXT_REDUX_STORE.Provider>
        )}
      </WCH_CONTEXT_EDIT_HOST_WINDOW.Consumer>
    )}
  </WCH_CONTEXT_LOGGER_SERVICE.Consumer>
);

/**
 * Provides `WCH_CONTEXT_REDUX_STORE` by reading the store from the parent frame.
 */
export const WCH_PROVIDER_PARENT_FRAME_REDUX_STORE = createReactProvider(
  WchReactParentFrameReduxStoreModule,
  WCH_CONTEXT_REDUX_STORE,
  [WCH_CONTEXT_EDIT_HOST_WINDOW],
  [WCH_CONTEXT_LOGGER_SERVICE]
);
