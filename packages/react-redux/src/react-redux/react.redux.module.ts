import { createReactProvider } from '@acoustic-content-sdk/react-api';
import {
  WCH_CONTEXT_REACT_REDUX,
  WCH_CONTEXT_REDUX_STORE
} from '@acoustic-content-sdk/react-redux-api';
import { createElement, FC, useContext } from 'react';
import { Provider } from 'react-redux';

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
  const store = useContext(WCH_CONTEXT_REDUX_STORE);
  // provide to react-redux
  return createElement(Provider, { store }, children);
};

/**
 * Declares the provider
 */
export const WCH_PROVIDER_REACT_REDUX = createReactProvider(
  ReactReduxProvider,
  WCH_CONTEXT_REACT_REDUX,
  [WCH_CONTEXT_REDUX_STORE]
);
