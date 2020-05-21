import {
  createVersionString,
  ExtendedContextV2,
  LoggerService,
  RenderingContextV2,
  UrlConfig,
  SiteDeliveryContentItem,
} from '@acoustic-content-sdk/api';
import {
  DeliveryPageResolver,
  DeliverySiteResolver,
  WchPageService
} from '@acoustic-content-sdk/component-api';
import {
  boxLoggerService,
  cloneUrlConfig,
  KEY_RENDERING_CONTEXT,
  opDistinctUntilChanged,
  opFilterNotNil,
  rxCachedFunction,
  rxNext,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { combineLatest, MonoTypeOperatorFunction, Observable, of } from 'rxjs';
import { catchError, map, tap, switchMap } from 'rxjs/operators';

import { createCache } from '../../utils/cache.utils';
import { MODULE, VERSION } from './../../version';

const LOGGER = 'AbstractWchPageService';

export class AbstractWchPageService implements WchPageService {
  /**
   * Resolves the rendering context for the error page
   *
   * @returns the observable of the rendering context or undefined if it could not be found
   */
  getErrorRenderingContext: () => Observable<
    RenderingContextV2 | null | undefined
  >;

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
    aDeliverySiteResolver: DeliverySiteResolver,
    aUrlConfig$: Observable<UrlConfig>,
    aLogSvc?: LoggerService
  ) {
    // logger
    const logSvc = boxLoggerService(aLogSvc);
    // logger
    const logger = logSvc.get(LOGGER);
    // next logger
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);
    // simpler binding to the method

    // get the site content item or default to undefined
    const site$: Observable<SiteDeliveryContentItem> = rxPipe(
      aDeliverySiteResolver.getSiteDeliveryContentItem(),
      catchError(err => {
        logger.error('Failed to get site content item, falling back to page path only.', err);
        return of(undefined);
      })
    );

    const deliveryPageResolver = (path: string) =>
      rxPipe(
        site$,
        switchMap(site => aDeliveryPageResolver.getDeliveryPage(`${path}${site?.$metadata?.id ? `#${site.$metadata.id}` : ''}`)),
        opFilterNotNil,
        opDistinctUntilChanged
      );

    // simpler binding to the method
    const errorPageResolver = () =>
      rxPipe(
        site$,
        switchMap(site => aDeliveryPageResolver.getErrorPage(site?.$metadata?.id)),
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

    const getErrorRenderingContext = (): Observable<
      RenderingContextV2 | null | undefined
    > =>
      rxPipe(
        combineLatest([errorPageResolver(), $context$]),
        // debounceTime(0),
        map(([page, $context]) => ({
          ...page,
          $context
        })),
        log(KEY_RENDERING_CONTEXT)
      );

    this.getRenderingContextByPath = rxCachedFunction(
      getRenderingContextByPath,
      createCache(logger)
    );

    // no need to cache the error case
    this.getErrorRenderingContext = getErrorRenderingContext;

    // log this service
    logger.info(MODULE, createVersionString(VERSION));
  }
}
