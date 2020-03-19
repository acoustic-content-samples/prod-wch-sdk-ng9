import {
  createVersionString,
  Layout,
  LoggerService,
  RenderingContextV2
} from '@acoustic-content-sdk/api';
import {
  AbstractComponentResolver,
  AbstractComponentTypeRefResolver,
  LayoutMappingResolver,
  LayoutResolver
} from '@acoustic-content-sdk/component-api';
import {
  isNotNil,
  LAYOUT_TYPE_ANGULAR,
  boxLoggerService,
  opCacheLast,
  rxNext,
  rxPipe,
  thisThenThats
} from '@acoustic-content-sdk/utils';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { selectIdFromRenderingContext } from '../../utils/selectors';
import { MODULE, VERSION } from './../../version';
import { createComponentTypeRefResolver } from './component.type.ref.resolvers';
import {
  AbstractComponentsService,
  DEFAULT_LAYOUT_ID,
  PAGE_NOT_FOUND_LAYOUT_ID
} from './components.service';

const PAGE_NOT_FOUND_LAYOUT: Layout = {
  id: PAGE_NOT_FOUND_LAYOUT_ID,
  name: PAGE_NOT_FOUND_LAYOUT_ID,
  templateType: LAYOUT_TYPE_ANGULAR,
  template: PAGE_NOT_FOUND_LAYOUT_ID
};
const LAYOUT_NOT_FOUND_LAYOUT: Layout = {
  id: DEFAULT_LAYOUT_ID,
  name: DEFAULT_LAYOUT_ID,
  templateType: LAYOUT_TYPE_ANGULAR,
  template: DEFAULT_LAYOUT_ID
};

const LOGGER = 'AbstractComponentResolverService';

/**
 * Returns the type object by ID
 *
 * @param aLayoutMode - the layout mode to check
 * @param aRenderingContext - the rendering context
 * @param aComponentsService - the components service used to resolve the mapping from selector to type
 * @param aMapping - the mapping service used to resolve from rendering context to selector
 *
 * @returns the type
 */
function getType<TYPE>(
  aLayoutMode: string | undefined,
  aRenderingContext: RenderingContextV2,
  aComponentsService: AbstractComponentsService<TYPE>,
  aLayout: LayoutResolver,
  aMapping: LayoutMappingResolver,
  aComponentTypeRefResolver: AbstractComponentTypeRefResolver<TYPE>,
  aLogSvc: LoggerService
): Observable<TYPE> {
  // logger
  const logger = aLogSvc.get(LOGGER);
  // next logger
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);
  /**
   * content item id
   */
  const contentId = selectIdFromRenderingContext(aRenderingContext);

  /**
   *  get type from layout
   */
  const layout$ = rxPipe(
    aLayout.resolveLayout(aLayoutMode, aRenderingContext),
    opCacheLast
  );
  const typeFromLayout$ = rxPipe(
    layout$,
    switchMap((layout) =>
      aComponentsService.getTypeByLayout(layout, aLayoutMode)
    )
  );
  /**
   *  get type from selector
   */
  const selector = aMapping.getSelector(aLayoutMode, aRenderingContext);
  const typeFromSelector$ = aComponentsService.getTypeBySelector(
    selector,
    aLayoutMode
  );
  /**
   * default
   */
  const defaultLayout = isNotNil(contentId)
    ? LAYOUT_NOT_FOUND_LAYOUT
    : PAGE_NOT_FOUND_LAYOUT;
  /**
   *  final fallback, now use a fallback
   */
  const typeFromDefault$ = aComponentsService.getTypeByLayout(
    defaultLayout,
    aLayoutMode
  );
  /**
   * Type from injectors
   */
  const typeFromResolver$ = rxPipe(
    layout$,
    switchMap((layout) =>
      aComponentTypeRefResolver.getTypeByLayout(layout, aLayoutMode)
    )
  );
  /**
   *  combine the fallbacks
   */
  return rxPipe(
    thisThenThats(
      typeFromDefault$,
      typeFromResolver$,
      typeFromSelector$,
      typeFromLayout$
    ),
    log('type')
  );
}

/**
 * Base class for component type resolvers
 */
export class AbstractComponentResolverService<TYPE>
  implements AbstractComponentResolver<TYPE> {
  resolveComponent: (
    aRenderingContext: RenderingContextV2,
    aLayoutMode?: string
  ) => Observable<TYPE>;

  protected constructor(
    aComponentsService: AbstractComponentsService<TYPE>,
    aLayoutResolverService: LayoutResolver,
    aLayoutMappingService: LayoutMappingResolver,
    aComponentTypeRefResolvers?: AbstractComponentTypeRefResolver<TYPE>[],
    aLogSvc?: LoggerService
  ) {
    // logger service
    const logSvc = boxLoggerService(aLogSvc);
    // logger
    const logger = logSvc.get(LOGGER);
    /**
     * Compose
     */
    const componentTypeRefResolver = createComponentTypeRefResolver(
      aComponentTypeRefResolvers
    );

    const resolveComponent = (
      aRenderingContext: RenderingContextV2,
      aLayoutMode?: string
    ): Observable<TYPE> =>
      getType(
        aLayoutMode,
        aRenderingContext,
        aComponentsService,
        aLayoutResolverService,
        aLayoutMappingService,
        componentTypeRefResolver,
        aLogSvc
      );

    this.resolveComponent = resolveComponent;

    // log this service
    logger.info(MODULE, createVersionString(VERSION));
  }
}
