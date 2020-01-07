import {
  AuthoringLayoutMapping,
  AuthoringType,
  Layout,
  LoggerService,
  RenderingContextV2
} from '@acoustic-content-sdk/api';
import {
  DeliveryLayoutMappingResolver,
  DeliveryLayoutResolver,
  DeliveryTypeResolver,
  LayoutResolver
} from '@acoustic-content-sdk/component-api';
import {
  bindMember,
  NOOP_LOGGER_SERVICE,
  opDistinctUntilChanged,
  rxLayoutIdFromRenderingContext,
  rxNext,
  rxPipe,
  safeSwitchMap
} from '@acoustic-content-sdk/utils';
import { MonoTypeOperatorFunction, Observable, UnaryFunction } from 'rxjs';

const LOGGER = 'AbstractLayoutResolverService';

export class AbstractLayoutResolverService implements LayoutResolver {
  resolveLayout: (
    aLayoutMode: string,
    aRenderingContext: RenderingContextV2
  ) => Observable<Layout>;

  protected constructor(
    aDeliveryTypeResolver: DeliveryTypeResolver,
    aDeliveryLayoutMappingResolver: DeliveryLayoutMappingResolver,
    aDeliveryLayoutResolver: DeliveryLayoutResolver,
    aLogSvc?: LoggerService
  ) {
    // logger
    const logSvc = aLogSvc || NOOP_LOGGER_SERVICE;
    // logger
    const logger = logSvc.get(LOGGER);
    // next logger
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);
    /**
     * Bind to the members
     */
    const typeAccessor: UnaryFunction<
      string,
      Observable<AuthoringType>
    > = bindMember(aDeliveryTypeResolver, 'getDeliveryType');
    const layoutMappingAccessor: UnaryFunction<
      string,
      Observable<AuthoringLayoutMapping>
    > = bindMember(aDeliveryLayoutMappingResolver, 'getDeliveryLayoutMapping');
    const layoutAccessor: UnaryFunction<
      string,
      Observable<Layout>
    > = bindMember(aDeliveryLayoutResolver, 'getDeliveryLayout');

    const resolveLayout = (
      aLayoutMode: string,
      aRenderingContext: RenderingContextV2
    ): Observable<Layout> =>
      rxPipe(
        rxLayoutIdFromRenderingContext(
          aLayoutMode,
          aRenderingContext,
          typeAccessor,
          layoutMappingAccessor,
          logSvc
        ),
        opDistinctUntilChanged,
        log('layoutId'),
        safeSwitchMap(layoutAccessor)
      );

    // attach the function
    this.resolveLayout = resolveLayout;
  }
}
