import {
  ActivePage,
  LoggerService,
  UrlConfig,
  WchHttp
} from '@acoustic-content-sdk/api';

import {
  ACOUSTIC_ACTIVE_PAGE_MODULE,
  ACOUSTIC_CONFIG_MODULE,
  ACOUSTIC_HTTP_MODULE,
  ACOUSTIC_INFO_MODULE,
  ACOUSTIC_LOGGER_MODULE
} from './modules';
import { WchConfig } from './wch.config';

/**
 * Helper interface that defines the mappings
 * from module name to actual type
 */
export interface WchInlineEditRequireMap {
  [ACOUSTIC_HTTP_MODULE]: PromiseLike<WchHttp>;
  [ACOUSTIC_CONFIG_MODULE]: PromiseLike<WchConfig>;
  [ACOUSTIC_INFO_MODULE]: PromiseLike<UrlConfig>;
  [ACOUSTIC_LOGGER_MODULE]: PromiseLike<LoggerService>;
  [ACOUSTIC_ACTIVE_PAGE_MODULE]: PromiseLike<ActivePage>;
}

/**
 * Interface of the require function, strongly typed
 *
 * @param the - module identifier
 * @returns the resulting service or resource
 */
export type WchInlineEditRequire = (<T extends keyof WchInlineEditRequireMap>(
  aModule: T
) => WchInlineEditRequireMap[T]) &
  ((aModule: string) => PromiseLike<string>);
