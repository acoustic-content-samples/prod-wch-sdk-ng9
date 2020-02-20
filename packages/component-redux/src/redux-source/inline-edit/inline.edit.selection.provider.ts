import { LoggerService } from '@acoustic-content-sdk/api';
import { InlineEditSelectionProvider } from '@acoustic-content-sdk/edit-api';
import {
  selectInlineEditFeature,
  selectInlineEditSelectedCell
} from '@acoustic-content-sdk/redux-feature-inline-edit';
import {
  ReduxRootStore,
  rxSelect,
  rxStore
} from '@acoustic-content-sdk/redux-store';
import { boxLoggerService, rxNext, rxPipe } from '@acoustic-content-sdk/utils';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';

const LOGGER = 'AbstractInlineEditSelectionProvider';

export class AbstractInlineEditSelectionProvider
  implements InlineEditSelectionProvider {
  selectedCell$: Observable<string | undefined>;

  protected constructor(aStore: ReduxRootStore, aLogSvc?: LoggerService) {
    // some logging
    const logSvc = boxLoggerService(aLogSvc);
    const logger = logSvc.get(LOGGER);
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);
    // attach to the store
    const store$ = rxStore(aStore);
    const inlineEditFeature$ = rxPipe(
      store$,
      rxSelect(selectInlineEditFeature)
    );
    // select the cell
    const selectedCell$ = rxPipe(
      inlineEditFeature$,
      rxSelect(selectInlineEditSelectedCell),
      log('selectedCell')
    );
    // ok
    this.selectedCell$ = selectedCell$;
  }
}
