import {
  ActivePageV2,
  LoggerService,
  UrlConfig
} from '@acoustic-content-sdk/api';

import {
  WCH_ACTIVE_PAGE_MODULE,
  WCH_CONFIG_MODULE,
  WCH_INFO_MODULE,
  WCH_LOGGER_MODULE
} from './../../modules/modules';
import { WchConfig } from './../../modules/wch.config';

/**
 * Helper interface that defines the mappings
 * from module name to actual type. This is a simple
 * dependency injection mechanism from the inline edit host to the inline edit provider.
 */
export interface WchInlineEditRequireMapV2 {
  //  [WCH_HTTP_MODULE]: PromiseLike<WchHttp>;
  [WCH_CONFIG_MODULE]: PromiseLike<WchConfig>;
  [WCH_INFO_MODULE]: PromiseLike<UrlConfig>;
  [WCH_LOGGER_MODULE]: PromiseLike<LoggerService>;
  [WCH_ACTIVE_PAGE_MODULE]: PromiseLike<ActivePageV2>;
}

/**
 * Interface of the require function, strongly typed
 *
 * @param the - module identifier
 * @returns the resulting service or resource
 */
export type WchInlineEditRequireV2 = (<
  T extends keyof WchInlineEditRequireMapV2
>(
  aModule: T
) => WchInlineEditRequireMapV2[T]) &
  ((aModule: string) => PromiseLike<string>);
