import { LoggerService } from '@acoustic-content-sdk/api';
import {
  DeliverySearchResolver,
  ProtectedContent,
  SeedResolver
} from '@acoustic-content-sdk/component-api';
import { AbstractDeliverySearchResolverService } from '@acoustic-content-sdk/component-utils';
import {
  WCH_TOKEN_LOGGER_SERVICE,
  WCH_TOKEN_PROTECTED_CONTENT,
  WCH_TOKEN_SEED_RESOLVER
} from '@acoustic-content-sdk/ng-api';
import { WCH_TOKEN_FETCH_TEXT } from '@acoustic-content-sdk/ng-rest-api';
import { FetchText } from '@acoustic-content-sdk/rest-api';
import { Inject, Injectable, Optional } from '@angular/core';

@Injectable()
export class DeliverySearchResolverService
  extends AbstractDeliverySearchResolverService
  implements DeliverySearchResolver {
  constructor(
    @Inject(WCH_TOKEN_FETCH_TEXT)
    aFetchText: FetchText,
    @Inject(WCH_TOKEN_PROTECTED_CONTENT)
    aProtected: ProtectedContent,
    @Optional()
    @Inject(WCH_TOKEN_SEED_RESOLVER)
    aSeedResolver: SeedResolver,
    @Optional()
    @Inject(WCH_TOKEN_LOGGER_SERVICE)
    aLogSvc: LoggerService
  ) {
    super(aFetchText, aProtected, aSeedResolver, aLogSvc);
  }
}
