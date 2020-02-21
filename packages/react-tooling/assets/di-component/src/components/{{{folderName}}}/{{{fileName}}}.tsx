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
{{#if useCarbon}}
import { settings } from 'carbon-components';
{{/if}}
{{#if useStore}}
import { ReduxRootStore, rxStore, rxSelect, rxDispatch } from '@acoustic-content-sdk/redux-store';
import { ACOUSTIC_CONTEXT_REDUX_STORE } from '@acoustic-content-sdk/react-redux-api';
{{/if}}

import { FC } from 'react';
import * as React from 'react';

import { {{{componentName}}}Props, CONTEXT_{{{constantName}}} } from './{{{fileName}}}.api';

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
    {{#if useStore}}store,{{/if}}
  ]: [
    {{#if useStore}}ReduxRootStore,{{/if}}
  ],
  [logSvc = NOOP_LOGGER_SERVICE]: [LoggerService?]
): ReactComponent<{{{componentName}}}Props> => {

  /**
   * Interface that describes the properties of the view layer
   */
  interface ViewProps {
    // view props come here
  }

  const LOGGER = '{{{componentName}}}';
  {{#if useCarbon}}

  /**
   * Use this value instead of hardcoding `bx` in your styles
   */
  const PREFIX: string = settings.prefix;
  {{/if}}

  /**
   * Setup logging
   */
  const logger = logSvc.get(LOGGER);
  // next logger
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);
{{#if useStore}}

  /**
   * Setup redux store access
   */
  const store$ = rxStore(store);
  const dispatch = rxDispatch(store);
{{/if}}

  // The view component
  const ViewComponent: FC<ViewProps> = (props) => <div>{{{componentName}}} works!</div>;

  // The controller
  const controller: StateFunction<{{{componentName}}}Props, ViewProps> = (props$) => {
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
export const PROVIDER_{{{constantName}}} = createInjectableReactProvider(
  createComponent,
  CONTEXT_{{{constantName}}},
  [
    {{#if useStore}}ACOUSTIC_CONTEXT_REDUX_STORE,{{/if}}
    // required dependencies come here
  ],
  [ACOUSTIC_CONTEXT_LOGGER_SERVICE]
);
