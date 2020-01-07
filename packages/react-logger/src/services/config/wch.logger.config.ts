/* Copyright IBM Corp. 2017 */
import { createReactContext } from '@acoustic-content-sdk/react-api';
import { ObservableOrT } from '@acoustic-content-sdk/utils';

/*
 * Exposes information
 */
export interface ReactLoggerConfig {
  /*
   * @see https://github.com/darekf77/ng2-logger#specifying-onlymodules-as-regular-expressions
   */
  onlyModules?: ObservableOrT<string[]>;

  /*
   * @see https://github.com/darekf77/ng2-logger#selective-debug---global-settings
   */
  onlyLevel?: ObservableOrT<string[]>;
}

export class ReactLoggerConfigService implements ReactLoggerConfig {
  /*
   * @see https://github.com/darekf77/ng2-logger#specifying-onlymodules-as-regular-expressions
   */
  readonly onlyModules?: ObservableOrT<string[]>;

  /*
   * @see https://github.com/darekf77/ng2-logger#selective-debug---global-settings
   */
  readonly onlyLevel?: ObservableOrT<string[]>;

  /**
   * Polls for changes of the configuration
   */
  readonly pollTime?: number;
}

export const WCH_CONTEXT_REACT_LOGGER_CONFIG = createReactContext<
  ReactLoggerConfigService
>('WCH_CONTEXT_REACT_LOGGER_CONFIG');
