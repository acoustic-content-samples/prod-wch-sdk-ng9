import { AuthStatus, LoggerService } from '@acoustic-content-sdk/api';
import { AbstractAuthStatusService } from '@acoustic-content-sdk/component-redux';
import { ReduxRootStore } from '@acoustic-content-sdk/redux-store';

export class ReactAuthStatusService extends AbstractAuthStatusService
  implements AuthStatus {
  constructor(aStore: ReduxRootStore, aLogSvc?: LoggerService) {
    super(aStore, aLogSvc);
  }
}
