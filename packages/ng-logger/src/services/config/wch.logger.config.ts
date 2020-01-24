/** Copyright IBM Corp. 2017 */
import { Injectable } from '@angular/core';
import { ObservableOrT } from '@acoustic-content-sdk/utils';

/*
 * Configuration for the logger
 */
export interface Ng2LoggerConfig {
  /**
   * Logging configuration for modules
   *
   * @see https://github.com/darekf77/ng2-logger#specifying-onlymodules-as-regular-expressions
   */
  onlyModules?: ObservableOrT<string[]>;

  /**
   * Logging configuration for levels
   *
   * @see https://github.com/darekf77/ng2-logger#selective-debug---global-settings
   */
  onlyLevel?: ObservableOrT<string[]>;
}

@Injectable()
export class Ng2LoggerConfigService implements Ng2LoggerConfig {
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
