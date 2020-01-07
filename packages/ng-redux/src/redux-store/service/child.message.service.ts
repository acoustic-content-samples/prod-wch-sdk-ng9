import { Inject, Injectable, Optional } from '@angular/core';
import { LoggerService } from '@acoustic-content-sdk/api';
import { MessageService } from '@acoustic-content-sdk/cross-frame-redux';
import { WCH_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import { NOOP_LOGGER_SERVICE, UNDEFINED_TYPE } from '@acoustic-content-sdk/utils';

const HAS_WINDOW = typeof window !== UNDEFINED_TYPE;

@Injectable()
export class ChildWindowMessageService extends MessageService {
  constructor(
    @Optional()
    @Inject(WCH_TOKEN_LOGGER_SERVICE)
    aLogSvc: LoggerService = NOOP_LOGGER_SERVICE
  ) {
    super(HAS_WINDOW ? window.parent : undefined, aLogSvc);
  }
}
