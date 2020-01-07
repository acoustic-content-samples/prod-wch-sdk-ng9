import {
  Layout,
  LoggerService,
  RenderingContextV2
} from '@acoustic-content-sdk/api';
import {
  LayoutMappingResolver,
  LayoutResolver
} from '@acoustic-content-sdk/component-api';
import {
  ComponentResolver,
  ComponentTypeRef,
  ComponentTypeRefResolver,
  WCH_TOKEN_COMPONENT_TYPE_REF_RESOLVERS,
  WCH_TOKEN_LOGGER_SERVICE
} from '@acoustic-content-sdk/ng-api';
import {
  isNotNil,
  LAYOUT_TYPE_ANGULAR,
  NOOP_LOGGER_SERVICE,
  opCacheLast,
  rxNext,
  rxPipe,
  thisThenThats
} from '@acoustic-content-sdk/utils';
import { Inject, Injectable, Optional } from '@angular/core';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { selectIdFromRenderingContext } from '../../utils/selectors';
import { LayoutResolverService } from '../layout/layout.resolver.service';
import { LayoutMappingService } from '../mappings/mappings.service';
import { createComponentTypeRefResolver } from './component.type.ref.resolvers';
import {
  ComponentsService,
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

const LOGGER = 'ComponentResolverService';

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
function getType(
  aLayoutMode: string | undefined,
  aRenderingContext: RenderingContextV2,
  aComponentsService: ComponentsService,
  aLayout: LayoutResolver,
  aMapping: LayoutMappingResolver,
  aComponentTypeRefResolver: ComponentTypeRefResolver,
  aLogSvc: LoggerService
): Observable<ComponentTypeRef<any>> {
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
    )
  );
}

@Injectable({
  providedIn: 'root'
})
export class ComponentResolverService implements ComponentResolver {
  resolveComponent: (
    aRenderingContext: RenderingContextV2,
    aLayoutMode?: string
  ) => Observable<ComponentTypeRef<any>>;

  constructor(
    aComponentsService: ComponentsService,
    aLayoutResolverService: LayoutResolverService,
    aLayoutMappingService: LayoutMappingService,
    @Optional()
    @Inject(WCH_TOKEN_COMPONENT_TYPE_REF_RESOLVERS)
    aComponentTypeRefResolvers: ComponentTypeRefResolver[],
    @Optional()
    @Inject(WCH_TOKEN_LOGGER_SERVICE)
    aLogSvc: LoggerService = NOOP_LOGGER_SERVICE
  ) {
    // logger
    const logger = aLogSvc.get(LOGGER);
    // next logger
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);
    /**
     * Compose
     */
    const componentTypeRefResolver = createComponentTypeRefResolver(
      aComponentTypeRefResolvers
    );

    const resolveComponent = (
      aRenderingContext: RenderingContextV2,
      aLayoutMode?: string
    ): Observable<ComponentTypeRef<any>> =>
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
  }
}
