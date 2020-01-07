import {
  AuthStatus,
  LoggerService,
  UrlConfig
} from '@acoustic-content-sdk/api';
import { ProtectedContent } from '@acoustic-content-sdk/component-api';
import { AbstractProtectedContentService } from '@acoustic-content-sdk/component-utils';
import { Observable } from 'rxjs';

export class ReactProtectedContentService
  extends AbstractProtectedContentService
  implements ProtectedContent {
  constructor(
    aUrlConfig: Observable<UrlConfig>,
    aAuthStatus: AuthStatus,
    aLogSvc?: LoggerService
  ) {
    super(aUrlConfig, aAuthStatus, aLogSvc);
  }
}
