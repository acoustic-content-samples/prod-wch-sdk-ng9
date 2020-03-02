import { LoggerService } from '@acoustic-content-sdk/api';
import { ProtectedContent } from '@acoustic-content-sdk/component-api';
import { AbstractSiteResolverService } from '@acoustic-content-sdk/component-rest';
import {
  ACOUSTIC_TOKEN_LOGGER_SERVICE,
  ACOUSTIC_TOKEN_PROTECTED_CONTENT
} from '@acoustic-content-sdk/ng-api';
import { ACOUSTIC_TOKEN_FETCH_TEXT } from '@acoustic-content-sdk/ng-rest-api';
import { FetchText } from '@acoustic-content-sdk/rest-api';
import { Inject, Injectable, Optional } from '@angular/core';

@Injectable()
export class SiteResolverService extends AbstractSiteResolverService {
  constructor(
    @Inject(ACOUSTIC_TOKEN_FETCH_TEXT)
    aFetchText: FetchText,
    @Inject(ACOUSTIC_TOKEN_PROTECTED_CONTENT)
    aProtectedContent: ProtectedContent,
    @Optional()
    @Inject(ACOUSTIC_TOKEN_LOGGER_SERVICE)
    aLogSvc: LoggerService
  ) {
    super(aFetchText, aProtectedContent, aLogSvc);
  }
}
