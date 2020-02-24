/* Copyright IBM Corp. 2017 */
import { Inject, Injectable, Optional } from '@angular/core';
import { Image, LoggerService } from '@acoustic-content-sdk/api';
import { ACOUSTIC_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import {
  getRendition,
  ScaledImage
} from '@acoustic-content-sdk/rendition-utils';
import { boxLoggerService } from '@acoustic-content-sdk/utils';

const LOGGER = 'WchRenditionService';

@Injectable()
export class WchRenditionService {
  getRenditionUrl: (aWidth: number, aHeight: number, aImage: Image) => string;
  getRendition: (aWidth: number, aHeight: number, aImage: Image) => ScaledImage;

  constructor(
    @Optional()
    @Inject(ACOUSTIC_TOKEN_LOGGER_SERVICE)
    aLogSvc: LoggerService
  ) {
    const that = this;

    const logSvc = boxLoggerService(aLogSvc);
    const logger = logSvc.get(LOGGER);

    const internalGetRendition = (
      aWidth: number,
      aHeight: number,
      aImage: Image
    ): ScaledImage => getRendition(aWidth, aHeight, aImage, logger);

    const internalGetRenditionUrl = (
      aWidth: number,
      aHeight: number,
      aImage: Image
    ): string => internalGetRendition(aWidth, aHeight, aImage).url;

    // initialize the calls
    that.getRenditionUrl = internalGetRenditionUrl;
    that.getRendition = internalGetRendition;
  }
}
