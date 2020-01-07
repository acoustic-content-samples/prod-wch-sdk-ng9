import {
  AuthStatus,
  LoggerService,
  UrlConfig
} from '@acoustic-content-sdk/api';
import { ProtectedContent } from '@acoustic-content-sdk/component-api';
import {
  isNotNil,
  NOOP_LOGGER_SERVICE,
  opDistinctUntilChanged,
  opShareLast,
  rxNext,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { combineLatest, MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

const LOGGER = 'AbstractProtectedContentService';

/**
 * Service to tell whether or not to serve protected content
 */
export class AbstractProtectedContentService implements ProtectedContent {
  protected$: Observable<boolean>;

  protected constructor(
    aUrlConfig$: Observable<UrlConfig>,
    aAuthStatus: AuthStatus,
    aLogSvc?: LoggerService
  ) {
    // logging
    const logSvc = aLogSvc || NOOP_LOGGER_SERVICE;
    const logger = logSvc.get(LOGGER);
    // next logger
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);

    // config
    const isPreview$ = rxPipe(
      aUrlConfig$,
      startWith(null),
      map((cfg) => isNotNil(cfg) && cfg.isPreviewMode),
      opDistinctUntilChanged
    );

    // authenticated
    const isAuthenticated$ = rxPipe(
      aAuthStatus.authenticated$,
      startWith(false),
      opDistinctUntilChanged
    );

    // check if we need to serve protected content
    this.protected$ = rxPipe(
      combineLatest([isPreview$, isAuthenticated$]),
      map(([isPreview, isAuthenticated]) => isPreview || isAuthenticated),
      opDistinctUntilChanged,
      log('protected'),
      opShareLast
    );
  }
}
