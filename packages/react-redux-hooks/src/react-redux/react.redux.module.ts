import { createReactProvider } from '@acoustic-content-sdk/react-api';
import { ACOUSTIC_CONTEXT_REDUX_STORE } from '@acoustic-content-sdk/react-redux-api';
import { createElement, FC, useContext } from 'react';
import { Provider } from 'react-redux';

import { ACOUSTIC_CONTEXT_REACT_REDUX } from './react.redux.token';

/**
 * Implementation of a JSX component that provides the redux store to `react-redux`
 *
 * @remarks
 * {@link https://react-redux.js.org/next/api/provider|Provider}
 *
 * @param props - the properties
 */
const ReactReduxProvider: FC = ({ children }) => {
  // access the SDK store
  const store = useContext(ACOUSTIC_CONTEXT_REDUX_STORE);
  // provide to react-redux
  return createElement(Provider, { store }, children);
};

/**
 * Declares the provider
 */
export const ACOUSTIC_PROVIDER_REACT_REDUX = createReactProvider(
  ReactReduxProvider,
  ACOUSTIC_CONTEXT_REACT_REDUX,
  [ACOUSTIC_CONTEXT_REDUX_STORE]
);
