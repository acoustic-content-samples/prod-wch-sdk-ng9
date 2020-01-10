import { LoggerService } from '@acoustic-content-sdk/api';
import { ReactComponent } from '@acoustic-content-sdk/react-api';
import { rxComponent, StateFunction } from '@acoustic-content-sdk/react-utils';
import { guaranteeAuthoringContentAction } from '@acoustic-content-sdk/redux-feature-auth-content';
import { ReduxRootStore, rxDispatch } from '@acoustic-content-sdk/redux-store';
import {
  NOOP_LOGGER_SERVICE,
  opDistinctUntilChanged,
  rxNext,
  rxSelectProperty
} from '@acoustic-content-sdk/utils';
import { MonoTypeOperatorFunction, pipe, SchedulerLike } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';

import { createMarkupRenderer } from '../../services/markup-renderer/markup.renderer';
import { LayoutRendererComponentProps } from '../layout-renderer/layout-renderer.component';

/**
 * Property interface of the {@link MarkupRenderer}.
 */
export interface MarkupRendererComponentProps {
  /**
   * ID of the item to render
   */
  contentItemId?: string;
}

const LOGGER = 'MarkupRendererComponent';

export function createMarkupRendererComponent(
  aStore: ReduxRootStore,
  aLayoutRenderer: ReactComponent<LayoutRendererComponentProps>,
  aLogSvc: LoggerService,
  aScheduler?: SchedulerLike
): ReactComponent<MarkupRendererComponentProps> {
  // logger
  const logSvc = aLogSvc || NOOP_LOGGER_SERVICE;
  const logger = logSvc.get(LOGGER);
  // next logger
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);

  // attach to the store
  const dispatch = rxDispatch(aStore);

  // renderer that produces the markup
  const renderer = createMarkupRenderer(aStore, logSvc, aScheduler);

  // business logic
  const bloc: StateFunction<
    MarkupRendererComponentProps,
    LayoutRendererComponentProps
  > = pipe(
    rxSelectProperty('contentItemId'),
    tap((id) => dispatch(guaranteeAuthoringContentAction(id))),
    switchMap(renderer),
    opDistinctUntilChanged,
    log('markup'),
    startWith(''),
    map((html) => ({ html }))
  );

  // construct the component
  return rxComponent(bloc, aLayoutRenderer);
}
