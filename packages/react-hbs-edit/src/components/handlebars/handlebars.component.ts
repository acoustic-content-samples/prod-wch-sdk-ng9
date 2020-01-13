import { LoggerService } from '@acoustic-content-sdk/api';
import { WchInlineEditServiceV2 } from '@acoustic-content-sdk/edit-api';
import { ReactComponent } from '@acoustic-content-sdk/react-api';
import { ReduxRootStore } from '@acoustic-content-sdk/redux-store';
import { NOOP_LOGGER_SERVICE } from '@acoustic-content-sdk/utils';
import { SchedulerLike } from 'rxjs';

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
  aEditService: WchInlineEditServiceV2,
  aDoc: Document,
  aLogSvc: LoggerService = NOOP_LOGGER_SERVICE,
  aScheduler?: SchedulerLike
): ReactComponent<HandlebarsComponentProps> {
  // the renderer
  const renderer = createReactRenderer(aStore, aDoc, aLogSvc, aScheduler);
  // the layout renderer
  const LayoutRenderer = createLayoutRendererComponent(
    renderer,
    aStore,
    aEditService,
    aLogSvc
  );
  // finally the markup renderer
  return createMarkupRendererComponent(
    aStore,
    LayoutRenderer,
    aLogSvc,
    aScheduler
  );
}
