import { Store, Action } from 'redux';
import { Consumer } from '@acoustic-content-sdk/utils';
import { Logger } from '@acoustic-content-sdk/api';

/**
 * Log the dispatch calls
 *
 * @param aStore - store to dispatch to
 * @param aLogger - logger
 *
 * @returns the dispatcher
 */
export const logDispatch = (
  aStore: Store,
  aLogger: Logger
): Consumer<Action> => (aAction) => {
  // log this
  aLogger.info('dispatching', aAction);
  // dispatch
  aStore.dispatch(aAction);
};
