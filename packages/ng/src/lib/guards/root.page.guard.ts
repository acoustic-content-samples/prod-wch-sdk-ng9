import { Logger, LoggerService } from '@acoustic-content-sdk/api';
import { DeliveryPageResolver } from '@acoustic-content-sdk/component-api';
import {
  WCH_TOKEN_DELIVERY_PAGE_RESOLVER,
  WCH_TOKEN_LOGGER_SERVICE
} from '@acoustic-content-sdk/ng-api';
import { boxLoggerService, rxNext, TRUE$ } from '@acoustic-content-sdk/utils';
import { Inject, Injectable, Optional } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';

import { pathGetPathFromUrlSegments } from '../utils/site.utils';

const LOGGER = 'WchSelectFirstRootPageGuard';

@Injectable({ providedIn: 'root' })
export class WchSelectFirstRootPageGuard implements CanActivate {
  private readonly logger: Logger;

  constructor(
    @Inject(WCH_TOKEN_DELIVERY_PAGE_RESOLVER)
    private aDeliveryPageResolver: DeliveryPageResolver,
    private aRouter: Router,
    @Optional()
    @Inject(WCH_TOKEN_LOGGER_SERVICE)
    aLogSvc: LoggerService
  ) {
    // access the logger
    const logSvc = boxLoggerService(aLogSvc);
    this.logger = logSvc.get(LOGGER);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // logger
    const logger = this.logger;
    // next logger
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);
    // the current route
    const path = pathGetPathFromUrlSegments(route.url);
    // the path
    logger.info('checking path', path);
    /**
     *  find the best route
     */
    // TODO check implementation
    /**    return rxPipe(
      this.aDeliveryPageResolver.getDeliveryPage(path),
      filter
      map(
        pluckPath<string>(['documents', '0', 'path'])
      ),
      filter(isNotEmpty),
      first(),
      tap((rte) => this.aRouter.navigateByUrl(rte)),
      mapTo(false)
    ); */
    return TRUE$;
  }
}
