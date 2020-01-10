import { LoggerService } from '@acoustic-content-sdk/api';
import { WCH_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import {
  ElementTypeCallback,
  rxCreateReactRenderer
} from '@acoustic-content-sdk/react-utils';
import { NOOP_LOGGER_SERVICE } from '@acoustic-content-sdk/utils';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';
import { ReactNode } from 'react';
import { Observable, SchedulerLike, UnaryFunction } from 'rxjs';

/**
 * Renderer that converts a markup string into a react DOM representation. The react representation
 * might differ dependening on the content types
 *
 * @param aDocument - the target document
 * @returns the conversion function
 */
function createRenderer(
  aDoc: Document,
  aLoggerService: LoggerService = NOOP_LOGGER_SERVICE,
  aScheduler?: SchedulerLike
): UnaryFunction<string, Observable<ReactNode>> {
  // construct a logger
  const logger = aLoggerService.get('createRenderer');
  // the callback
  const cb: ElementTypeCallback = undefined;

  return rxCreateReactRenderer(cb, aDoc, aLoggerService, aScheduler);
}

@Injectable()
export class RenderService {
  // render function
  render: UnaryFunction<string, Observable<ReactNode>>;

  constructor(
    @Inject(DOCUMENT)
    aDocument: any,
    @Optional()
    @Inject(WCH_TOKEN_LOGGER_SERVICE)
    aLogSvc: LoggerService
  ) {
    // logger
    const logSvc = aLogSvc || NOOP_LOGGER_SERVICE;
    // construct the renderer
    const renderer = createRenderer(aDocument, logSvc);

    // attach
    this.render = renderer;
  }
}
