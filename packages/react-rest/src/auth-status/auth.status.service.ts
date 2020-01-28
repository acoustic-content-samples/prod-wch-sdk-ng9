import { AuthStatus, LoggerService } from '@acoustic-content-sdk/api';
import { AbstractAuthStatusService } from '@acoustic-content-sdk/component-rest';
import { FetchText } from '@acoustic-content-sdk/rest-api';

export class AuthStatusService extends AbstractAuthStatusService
  implements AuthStatus {
  constructor(aFetchText: FetchText, aLogSvc?: LoggerService) {
    super(aFetchText, aLogSvc);
  }
}
