import {
  createVersionString,
  ExtendedContextV2,
  LoggerService,
  RenderingContextV2,
  UrlConfig
} from '@acoustic-content-sdk/api';
import {
  DeliveryPageResolver,
  WchPageService
} from '@acoustic-content-sdk/component-api';
import {
  cloneUrlConfig,
  KEY_RENDERING_CONTEXT,
  NOOP_LOGGER_SERVICE,
  opDistinctUntilChanged,
  opFilterNotNil,
  rxCachedFunction,
  rxNext,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { combineLatest, MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { createCache } from '../../utils/cache.utils';
import { MODULE, VERSION } from './../../version';

const LOGGER = 'AbstractWchPageService';

export class AbstractWchPageService implements WchPageService {
  /**
   * Resolves the rendering context given the path
   *
   * @param aPath - the path as a string
   *
   * @returns the observable of the rendering context or undefined if it could not be found
   */
  getRenderingContextByPath: (
    aPath: string
  ) => Observable<RenderingContextV2 | null | undefined>;

  protected constructor(
    aDeliveryPageResolver: DeliveryPageResolver,
    aUrlConfig$: Observable<UrlConfig>,
    aLogSvc?: LoggerService
  ) {
    // logger
    const logSvc = aLogSvc || NOOP_LOGGER_SERVICE;
    // logger
    const logger = logSvc.get(LOGGER);
    // next logger
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);
    // simpler binding to the method
    const deliveryPageResolver = (path: string) =>
      rxPipe(
        aDeliveryPageResolver.getDeliveryPage(path),
        opFilterNotNil,
        opDistinctUntilChanged
      );

    // base context
    const $context$: Observable<Partial<ExtendedContextV2>> = rxPipe(
      aUrlConfig$,
      map((urlConfig) => ({
        hub: cloneUrlConfig(urlConfig)
      })),
      log('$context')
    );

    const getRenderingContextByPath = (
      aPath: string
    ): Observable<RenderingContextV2 | null | undefined> =>
      rxPipe(
        combineLatest([deliveryPageResolver(aPath), $context$]),
        // debounceTime(0),
        map(([page, $context]) => ({
          ...page,
          $context
        })),
        log(KEY_RENDERING_CONTEXT, aPath)
      );

    this.getRenderingContextByPath = rxCachedFunction(
      getRenderingContextByPath,
      createCache(logger)
    );

    // log this service
    logger.info(MODULE, createVersionString(VERSION));
  }
}
