import { getStoreFromParent } from '@acoustic-content-sdk/component-redux';
import {
  assertProvider,
  createReactProvider,
  ReactModule,
  ACOUSTIC_CONTEXT_LOGGER_SERVICE
} from '@acoustic-content-sdk/react-api';
import { ACOUSTIC_CONTEXT_EDIT_HOST_WINDOW } from '@acoustic-content-sdk/react-edit-api';
import { ACOUSTIC_CONTEXT_REDUX_STORE } from '@acoustic-content-sdk/react-redux-api';
import * as React from 'react';

/**
 * Module that exposes the `ACOUSTIC_CONTEXT_REDUX_STORE` token.
 *
 * Requires `ACOUSTIC_CONTEXT_EDIT_HOST_WINDOW` and `ACOUSTIC_CONTEXT_LOGGER_SERVICE`
 */
const WchReactParentFrameReduxStoreModule: ReactModule = ({ children }) => (
  <ACOUSTIC_CONTEXT_LOGGER_SERVICE.Consumer>
    {(logSvc) => (
      <ACOUSTIC_CONTEXT_EDIT_HOST_WINDOW.Consumer>
        {(wnd) => (
          <ACOUSTIC_CONTEXT_REDUX_STORE.Provider
            value={getStoreFromParent(
              assertProvider(wnd, ACOUSTIC_CONTEXT_EDIT_HOST_WINDOW),
              logSvc
            )}
          >
            {children}
          </ACOUSTIC_CONTEXT_REDUX_STORE.Provider>
        )}
      </ACOUSTIC_CONTEXT_EDIT_HOST_WINDOW.Consumer>
    )}
  </ACOUSTIC_CONTEXT_LOGGER_SERVICE.Consumer>
);

/**
 * Provides `ACOUSTIC_CONTEXT_REDUX_STORE` by reading the store from the parent frame.
 */
export const ACOUSTIC_PROVIDER_PARENT_FRAME_REDUX_STORE = createReactProvider(
  WchReactParentFrameReduxStoreModule,
  ACOUSTIC_CONTEXT_REDUX_STORE,
  [ACOUSTIC_CONTEXT_EDIT_HOST_WINDOW],
  [ACOUSTIC_CONTEXT_LOGGER_SERVICE]
);
