import {
  createInjectableReactProvider,
  WCH_CONTEXT_LOGGER_SERVICE
} from '@acoustic-content-sdk/react-api';
import { LoggerService } from '@acoustic-content-sdk/api';
import {
  NOOP_LOGGER_SERVICE
} from '@acoustic-content-sdk/utils';

{{#if useStore}}
import { ReduxRootStore, rxStore, rxSelect, rxDispatch } from '@acoustic-content-sdk/redux-store';
import { WCH_CONTEXT_REDUX_STORE } from '@acoustic-content-sdk/react-redux-api';
{{/if}}

import { {{{providerName}}}, CONTEXT_{{{constantName}}} } from './{{{fileName}}}.api';

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
    {{#if useStore}}store,{{/if}}
  ]: [
    {{#if useStore}}ReduxRootStore,{{/if}}
  ],
  [logSvc = NOOP_LOGGER_SERVICE]: [LoggerService?]
): {{{providerName}}} => {

  const LOGGER = '{{{providerName}}}';

  /**
   * Setup logging
   */
  const logger = logSvc.get(LOGGER);
  {{#if useStore}}

  /**
   * Setup redux store access
   */
  const store$ = rxStore(store);
  const dispatch = rxDispatch(store);
{{/if}}

  // TODO: implement the actual provider
  return undefined;
}

/**
 * Implementation of the component
 */
export const PROVIDER_{{{constantName}}} = createInjectableReactProvider(
  createProvider,
  CONTEXT_{{{constantName}}},
  [
    {{#if useStore}}WCH_CONTEXT_REDUX_STORE,{{/if}}
    // required dependencies come here
  ],
  [WCH_CONTEXT_LOGGER_SERVICE]
);
