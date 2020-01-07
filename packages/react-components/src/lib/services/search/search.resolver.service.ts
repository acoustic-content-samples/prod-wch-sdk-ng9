import { LoggerService } from '@acoustic-content-sdk/api';
import {
  DeliverySearchResolver,
  ProtectedContent,
  SeedResolver
} from '@acoustic-content-sdk/component-api';
import { AbstractDeliverySearchResolverService } from '@acoustic-content-sdk/component-utils';
import { FetchText } from '@acoustic-content-sdk/rest-api';

export class DeliverySearchResolverService
  extends AbstractDeliverySearchResolverService
  implements DeliverySearchResolver {
  constructor(
    aFetchText: FetchText,
    aProtected: ProtectedContent,
    aSeedResolver?: SeedResolver,
    aLogSvc?: LoggerService
  ) {
    super(aFetchText, aProtected, aSeedResolver, aLogSvc);
  }
}
