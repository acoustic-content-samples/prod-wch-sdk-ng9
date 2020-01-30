import { Context } from 'react';
import { ReactReduxContext } from 'react-redux';
import { Store } from 'redux';

/**
 * Reverse engineering of the correct type of the `ReactReduxContext`.
 */
export interface ReactReduxContextType {
  /**
   * The redux store
   */
  store: Store;
  /**
   * some magic subscription, I could not find any doc
   */
  subscription: any;
}

/**
 * Injection token for the {@link https://react-redux.js.org/|react redux} store
 */
export const WCH_CONTEXT_REACT_REDUX: Context<ReactReduxContextType> = ReactReduxContext;
