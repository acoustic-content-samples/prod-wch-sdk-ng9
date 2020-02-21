import { LoggerService } from '@acoustic-content-sdk/api';
import { MessageService } from '@acoustic-content-sdk/cross-frame-redux';
import { ACOUSTIC_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import { UNDEFINED_TYPE } from '@acoustic-content-sdk/utils';
import { Inject, Injectable, Optional } from '@angular/core';

const HAS_WINDOW = typeof window !== UNDEFINED_TYPE;

@Injectable()
export class ChildWindowMessageService extends MessageService {
  constructor(
    @Optional()
    @Inject(ACOUSTIC_TOKEN_LOGGER_SERVICE)
    aLogSvc?: LoggerService
  ) {
    super(HAS_WINDOW ? window.parent : undefined, aLogSvc);
  }
}
