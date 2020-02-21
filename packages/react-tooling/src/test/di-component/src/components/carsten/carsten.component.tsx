import {
  ReactComponent,
  createInjectableReactProvider,
  ACOUSTIC_CONTEXT_LOGGER_SERVICE
} from '@acoustic-content-sdk/react-api';

import { LoggerService } from '@acoustic-content-sdk/api';
import { rxComponent, StateFunction } from '@acoustic-content-sdk/react-utils';
import {
  NOOP_LOGGER_SERVICE,
  rxNext,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { MonoTypeOperatorFunction } from 'rxjs';
import { map, switchMap, startWith } from 'rxjs/operators';
import { ReduxRootStore, rxStore, rxSelect, rxDispatch } from '@acoustic-content-sdk/redux-store';
import { ACOUSTIC_CONTEXT_REDUX_STORE } from '@acoustic-content-sdk/react-redux-api';

import { FC } from 'react';
import * as React from 'react';

import { CarstenComponentProps, CONTEXT_CARSTEN_COMPONENT } from './carsten.component.api';

/**
 * Constructor function of the component class
 *
 * @param req - the array of required dependencies
 * @param opt - the array of optional dependencies
 *
 * @returns the component class
 */
const createComponent = (
  [
    store,
  ]: [
    ReduxRootStore,
  ],
  [logSvc = NOOP_LOGGER_SERVICE]: [LoggerService?]
): ReactComponent<CarstenComponentProps> => {

  /**
   * Interface that describes the properties of the view layer
   */
  interface ViewProps {
    // view props come here
  }

  const LOGGER = 'CarstenComponent';

  /**
   * Setup logging
   */
  const logger = logSvc.get(LOGGER);
  // next logger
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);

  /**
   * Setup redux store access
   */
  const store$ = rxStore(store);
  const dispatch = rxDispatch(store);

  // The view component
  const ViewComponent: FC<ViewProps> = (props) => <div>CarstenComponent works!</div>;

  // The controller
  const controller: StateFunction<CarstenComponentProps, ViewProps> = (props$) => {
      // derive the state from the props
    return rxPipe(props$,
      map(props => ({})),
      startWith({}),
      log('state')
    );
  }

  // The actual implementation of the component class
  return rxComponent(controller, ViewComponent);
}

/**
 * Implementation of the component
 */
export const PROVIDER_CARSTEN_COMPONENT = createInjectableReactProvider(
  createComponent,
  CONTEXT_CARSTEN_COMPONENT,
  [
    ACOUSTIC_CONTEXT_REDUX_STORE,
    // required dependencies come here
  ],
  [ACOUSTIC_CONTEXT_LOGGER_SERVICE]
);
