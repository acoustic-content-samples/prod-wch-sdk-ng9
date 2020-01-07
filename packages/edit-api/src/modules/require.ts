import {
  ActivePage,
  LoggerService,
  UrlConfig,
  WchHttp
} from '@acoustic-content-sdk/api';

import {
  WCH_ACTIVE_PAGE_MODULE,
  WCH_CONFIG_MODULE,
  WCH_HTTP_MODULE,
  WCH_INFO_MODULE,
  WCH_LOGGER_MODULE
} from './modules';
import { WchConfig } from './wch.config';

/**
 * Helper interface that defines the mappings
 * from module name to actual type
 */
export interface WchInlineEditRequireMap {
  [WCH_HTTP_MODULE]: PromiseLike<WchHttp>;
  [WCH_CONFIG_MODULE]: PromiseLike<WchConfig>;
  [WCH_INFO_MODULE]: PromiseLike<UrlConfig>;
  [WCH_LOGGER_MODULE]: PromiseLike<LoggerService>;
  [WCH_ACTIVE_PAGE_MODULE]: PromiseLike<ActivePage>;
}

/**
 * Interface of the require function, strongly typed
 *
 * @param the module identifier
 * @returns the resulting service or resource
 */
export type WchInlineEditRequire = (<T extends keyof WchInlineEditRequireMap>(
  aModule: T
) => WchInlineEditRequireMap[T]) &
  ((aModule: string) => PromiseLike<string>);
