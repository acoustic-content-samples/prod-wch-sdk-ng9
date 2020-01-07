import { LoggerService } from '@acoustic-content-sdk/api';
import { AbstractInlineEditSelectionProvider } from '@acoustic-content-sdk/component-redux';
import { InlineEditSelectionProvider } from '@acoustic-content-sdk/edit-api';
import { ReduxRootStore } from '@acoustic-content-sdk/redux-store';

export class InlineEditSelectionProviderService
  extends AbstractInlineEditSelectionProvider
  implements InlineEditSelectionProvider {
  constructor(aStore: ReduxRootStore, aLogSvc?: LoggerService) {
    super(aStore, aLogSvc);
  }
}
