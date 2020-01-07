import { LoggerService } from '@acoustic-content-sdk/api';
import { HandlebarsResolver } from '@acoustic-content-sdk/component-api';
import { AbstractHandlebarsResolverService } from '@acoustic-content-sdk/component-redux';
import { ReduxRootStore } from '@acoustic-content-sdk/redux-store';

export class HandlebarsResolverService extends AbstractHandlebarsResolverService
  implements HandlebarsResolver {
  constructor(aStore: ReduxRootStore, aLogSvc?: LoggerService) {
    super(aStore, aLogSvc);
  }
}
