import { ExtendedContextV2, LoggerService } from '@acoustic-content-sdk/api';
import { DeliveryContentResolver } from '@acoustic-content-sdk/component-api';
import { WchInlineEditServiceV2 } from '@acoustic-content-sdk/edit-api';
import { ReactComponent } from '@acoustic-content-sdk/react-api';
import { selectUrlConfigFeature } from '@acoustic-content-sdk/redux-feature-url-config';
import {
  ReduxRootStore,
  rxSelect,
  rxStore
} from '@acoustic-content-sdk/redux-store';
import {
  cloneUrlConfig,
  KEY_LAYOUT_MODE,
  NOOP_LOGGER_SERVICE,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { Observable, SchedulerLike } from 'rxjs';
import { map } from 'rxjs/operators';

import { createReactRenderer } from '../../services/react-renderer/react.renderer';
import { createLayoutRendererComponent } from '../layout-renderer/layout-renderer.component';
import { createMarkupRendererComponent } from '../markup-renderer/markup.renderer.component';

/**
 * Property interface of the handlebars components
 */
export interface HandlebarsComponentProps {
  /**
   * ID of the item to render
   */
  contentItemId?: string;
  /**
   * Optional layout mode
   */
  [KEY_LAYOUT_MODE]?: string;
}

/**
 * Returns a React component that renders the content item passed into its properties. Markup elements
 * annotated with inline edit controls will be registered with the inline edit service.
 *
 * @param aStore - the redux store that contains all metadata
 * @param aEditService - the edit service
 * @param aDoc - the document, used to instantiate a template node
 * @param aLogSvc - optionally a logger service
 * @param aScheduler - optionally a scheduler
 *
 * @returns a component that renders a content item based on the handlebars templates from the redux store
 */
export function createHandlebarsComponent(
  aStore: ReduxRootStore,
  aDeliveryContent: DeliveryContentResolver,
  aEditService: WchInlineEditServiceV2,
  aDoc: Document,
  aLogSvc?: LoggerService,
  aScheduler?: SchedulerLike
): ReactComponent<HandlebarsComponentProps> {
  // resolve the logger
  const logSvc = aLogSvc || NOOP_LOGGER_SERVICE;
  // access the url config
  const store$ = rxStore(aStore);
  // context
  const urlConfig$ = rxPipe(store$, rxSelect(selectUrlConfigFeature));
  // base context
  const $context$: Observable<Partial<ExtendedContextV2>> = rxPipe(
    urlConfig$,
    map((urlConfig) => ({
      hub: cloneUrlConfig(urlConfig)
    }))
  );
  // the renderer
  const renderer = createReactRenderer(aStore, aDoc, logSvc, aScheduler);
  // the layout renderer
  const LayoutRenderer = createLayoutRendererComponent(
    renderer,
    aDeliveryContent,
    aEditService,
    $context$,
    logSvc
  );
  // finally the markup renderer
  return createMarkupRendererComponent(
    aStore,
    LayoutRenderer,
    logSvc,
    aScheduler
  );
}
