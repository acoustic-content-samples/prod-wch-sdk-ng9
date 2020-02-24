import { LoggerService } from '@acoustic-content-sdk/api';
import {
  DeliverySearchResolver,
  ProtectedContent,
  SeedResolver
} from '@acoustic-content-sdk/component-api';
import { AbstractDeliverySearchResolverService } from '@acoustic-content-sdk/component-utils';
import {
  ACOUSTIC_TOKEN_LOGGER_SERVICE,
  ACOUSTIC_TOKEN_PROTECTED_CONTENT,
  ACOUSTIC_TOKEN_SEED_RESOLVER
} from '@acoustic-content-sdk/ng-api';
import { ACOUSTIC_TOKEN_FETCH_TEXT } from '@acoustic-content-sdk/ng-rest-api';
import { FetchText } from '@acoustic-content-sdk/rest-api';
import { Inject, Injectable, Optional } from '@angular/core';

@Injectable()
export class DeliverySearchResolverService
  extends AbstractDeliverySearchResolverService
  implements DeliverySearchResolver {
  constructor(
    @Inject(ACOUSTIC_TOKEN_FETCH_TEXT)
    aFetchText: FetchText,
    @Inject(ACOUSTIC_TOKEN_PROTECTED_CONTENT)
    aProtected: ProtectedContent,
    @Optional()
    @Inject(ACOUSTIC_TOKEN_SEED_RESOLVER)
    aSeedResolver: SeedResolver,
    @Optional()
    @Inject(ACOUSTIC_TOKEN_LOGGER_SERVICE)
    aLogSvc: LoggerService
  ) {
    super(aFetchText, aProtected, aSeedResolver, aLogSvc);
  }
}
