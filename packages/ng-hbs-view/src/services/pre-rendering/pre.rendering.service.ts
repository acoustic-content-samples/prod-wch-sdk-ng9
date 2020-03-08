import { LoggerService } from '@acoustic-content-sdk/api';
import { PreRenderingResolver } from '@acoustic-content-sdk/component-api';
import { ACOUSTIC_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import { boxLoggerService, rxNext, rxPipe } from '@acoustic-content-sdk/utils';
import { Inject, Injectable, Optional } from '@angular/core';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';

import { AcNgMarkupRegistryService } from '../markup/markup.registry.service';

const LOGGER = 'AcNgPreRenderingService';

@Injectable()
export class AcNgPreRenderingService implements PreRenderingResolver {
  /**
   * Generate a pre-rendering of the referenced content item
   *
   * @param aID - the ID of the item
   * @param aLayoutMode - optionally the layout mode
   *
   * @returns an observable of the result
   */
  getPreRenderedMarkup: (
    aID: string,
    aLayoutMode?: string
  ) => Observable<string>;

  constructor(
    aMarkupService: AcNgMarkupRegistryService,
    @Optional()
    @Inject(ACOUSTIC_TOKEN_LOGGER_SERVICE)
    aLogSvc?: LoggerService
  ) {
    // logger
    const logSvc = boxLoggerService(aLogSvc);
    const logger = logSvc.get(LOGGER);
    // logging
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);
    // just dispatch
    this.getPreRenderedMarkup = (aID: string, aLayoutMode?: string) =>
      rxPipe(aMarkupService.get(aID), log('markup'));
  }
}
