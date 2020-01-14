import { LoggerService } from '@acoustic-content-sdk/api';
import { ReactComponent } from '@acoustic-content-sdk/react-api';
import { rxComponent, StateFunction } from '@acoustic-content-sdk/react-utils';
import { guaranteeAuthoringContentAction } from '@acoustic-content-sdk/redux-feature-auth-content';
import { ReduxRootStore, rxDispatch } from '@acoustic-content-sdk/redux-store';
import {
  isNotEmpty,
  KEY_LAYOUT_MODE,
  NOOP_LOGGER_SERVICE,
  opDistinctUntilChanged,
  rxNext,
  rxPipe,
  rxSelectProperty
} from '@acoustic-content-sdk/utils';
import { combineLatest, MonoTypeOperatorFunction, SchedulerLike } from 'rxjs';
import { filter, map, startWith, switchMap, tap } from 'rxjs/operators';

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
  /**
   * Optional layout mode
   */
  [KEY_LAYOUT_MODE]?: string;
}

const LOGGER = 'MarkupRendererComponent';

/**
 * Extracts the ID of the content item from the combination ID and accessor
 *
 * @param aContentItemId - the ID to split
 * @returns just the ID
 */
const selectId = (aContentItemId?: string) => aContentItemId.split('#')[0];

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
  > = (props$) => {
    // select the parts
    const id$ = rxPipe(
      props$,
      rxSelectProperty('contentItemId'),
      filter(isNotEmpty),
      tap((id) => dispatch(guaranteeAuthoringContentAction(selectId(id)))),
      log('id')
    );
    const layoutMode$ = rxPipe(
      props$,
      rxSelectProperty('layoutMode'),
      log('layoutMode')
    );
    // render
    return rxPipe(
      combineLatest([id$, layoutMode$]),
      switchMap(([id, layoutMode]) => renderer(id, layoutMode)),
      opDistinctUntilChanged,
      log('markup'),
      startWith(''),
      map((html) => ({ html }))
    );
  };

  // construct the component
  return rxComponent(bloc, aLayoutRenderer);
}
