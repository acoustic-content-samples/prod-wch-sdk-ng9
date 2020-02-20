import {
  createVersionString,
  LoggerService,
  RenderingContextV2,
  UrlConfig
} from '@acoustic-content-sdk/api';
import { DeliveryPageResolver } from '@acoustic-content-sdk/component-api';
import { AbstractWchPageService } from '@acoustic-content-sdk/component-utils';
import {
  WCH_TOKEN_DELIVERY_PAGE_RESOLVER,
  WCH_TOKEN_LOGGER_SERVICE,
  WCH_TOKEN_URL_CONFIG,
  WchNgPageService
} from '@acoustic-content-sdk/ng-api';
import {
  boxLoggerService,
  opDistinctUntilChanged,
  rxPipe,
  safeSwitchMap
} from '@acoustic-content-sdk/utils';
import { Inject, Injectable, Optional } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { pathGetPathFromUrlSegments } from '../../utils/site.utils';
import { MODULE, VERSION } from './../../../version';

const LOGGER = 'WchSitesPageService';

@Injectable({ providedIn: 'root' })
export class WchSitesPageService extends AbstractWchPageService
  implements WchNgPageService {
  /**
   * Resolves the rendering context given the url segments
   *
   * @param aSegments - the segments
   *
   * @returns the observable of the rendering context or undefined if it could not be found
   */
  getRenderingContextByUrlSegments: (
    aSegments: UrlSegment[]
  ) => Observable<RenderingContextV2 | null | undefined>;

  /**
   * Resolves the rendering context given the router
   *
   * @param aRoute - the activated route
   *
   * @returns the observable of the rendering context or undefined if it could not be found
   */
  getRenderingContextByActivatedRoute: (
    aRoute: ActivatedRoute
  ) => Observable<RenderingContextV2 | null | undefined>;

  constructor(
    @Inject(WCH_TOKEN_DELIVERY_PAGE_RESOLVER)
    aDeliveryPageResolver: DeliveryPageResolver,
    @Inject(WCH_TOKEN_URL_CONFIG) aUrlConfig$: Observable<UrlConfig>,
    @Optional()
    @Inject(WCH_TOKEN_LOGGER_SERVICE)
    aLogSvc: LoggerService
  ) {
    // default
    super(aDeliveryPageResolver, aUrlConfig$, aLogSvc);
    // logger
    const logSvc = boxLoggerService(aLogSvc);
    // logger
    const logger = logSvc.get(LOGGER);
    // delegate
    const getRenderingContextByPath = (aPath: string) =>
      this.getRenderingContextByPath(aPath);

    const getRenderingContextByUrlSegments = (
      aSegments: UrlSegment[]
    ): Observable<RenderingContextV2 | null | undefined> =>
      getRenderingContextByPath(pathGetPathFromUrlSegments(aSegments));

    const getRenderingContextByActivatedRoute = (
      aRoute: ActivatedRoute
    ): Observable<RenderingContextV2 | null | undefined> =>
      rxPipe(
        aRoute.url,
        map(pathGetPathFromUrlSegments),
        opDistinctUntilChanged,
        safeSwitchMap(getRenderingContextByPath)
      );

    this.getRenderingContextByActivatedRoute = getRenderingContextByActivatedRoute;
    this.getRenderingContextByUrlSegments = getRenderingContextByUrlSegments;

    // log this service
    logger.info(MODULE, createVersionString(VERSION));
  }
}
