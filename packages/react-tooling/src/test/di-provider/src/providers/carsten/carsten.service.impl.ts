import {
  createInjectableReactProvider,
  ACOUSTIC_CONTEXT_LOGGER_SERVICE
} from '@acoustic-content-sdk/react-api';
import { LoggerService } from '@acoustic-content-sdk/api';
import {
  NOOP_LOGGER_SERVICE
} from '@acoustic-content-sdk/utils';

import { ReduxRootStore, rxStore, rxSelect, rxDispatch } from '@acoustic-content-sdk/redux-store';
import { ACOUSTIC_CONTEXT_REDUX_STORE } from '@acoustic-content-sdk/react-redux-api';

import { CarstenService, CONTEXT_CARSTEN_SERVICE } from './carsten.service.api';

/**
 * Constructor function of the provider
 *
 * @param req - the array of required dependencies
 * @param opt - the array of optional dependencies
 *
 * @returns the component class
 */
const createProvider = (
  [
    store,
  ]: [
    ReduxRootStore,
  ],
  [logSvc = NOOP_LOGGER_SERVICE]: [LoggerService?]
): CarstenService => {

  const LOGGER = 'CarstenService';

  /**
   * Setup logging
   */
  const logger = logSvc.get(LOGGER);

  /**
   * Setup redux store access
   */
  const store$ = rxStore(store);
  const dispatch = rxDispatch(store);

  // TODO: implement the actual provider
  return undefined;
}

/**
 * Implementation of the component
 */
export const PROVIDER_CARSTEN_SERVICE = createInjectableReactProvider(
  createProvider,
  CONTEXT_CARSTEN_SERVICE,
  [
    ACOUSTIC_CONTEXT_REDUX_STORE,
    // required dependencies come here
  ],
  [ACOUSTIC_CONTEXT_LOGGER_SERVICE]
);
