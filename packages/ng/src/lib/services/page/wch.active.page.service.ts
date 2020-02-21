import {
  ActivePageV2,
  createVersionString,
  LoggerService,
  RenderingContextV2
} from '@acoustic-content-sdk/api';
import { ACOUSTIC_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import {
  KEY_RENDERING_CONTEXT,
  boxLoggerService,
  rxNext,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { Inject, Injectable, Optional } from '@angular/core';
import { MonoTypeOperatorFunction, Observable, Subject } from 'rxjs';

import { MODULE, VERSION } from './../../../version';
import { ACOUSTIC_TOKEN_INTERNAL_ACTIVE_PAGE } from './internal.active.page.service';

const LOGGER = 'WchActivePageService';

@Injectable({ providedIn: 'root' })
export class WchActivePageService implements ActivePageV2 {
  readonly renderingContext$: Observable<RenderingContextV2>;

  constructor(
    @Inject(ACOUSTIC_TOKEN_INTERNAL_ACTIVE_PAGE)
    aActivePage: Subject<RenderingContextV2>,
    @Optional()
    @Inject(ACOUSTIC_TOKEN_LOGGER_SERVICE)
    aLogSvc: LoggerService
  ) {
    // get the logger
    const logSvc = boxLoggerService(aLogSvc);
    const logger = logSvc.get(LOGGER);
    // next logger
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);
    /**
     * Rendering context based on the current page
     */
    this.renderingContext$ = rxPipe(aActivePage, log(KEY_RENDERING_CONTEXT));

    // log this service
    logger.info(MODULE, createVersionString(VERSION));
  }
}
