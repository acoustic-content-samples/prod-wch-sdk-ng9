import {
  AuthoringLayoutMapping,
  AuthoringLayoutMappingMapping,
  AuthoringType,
  DeliverySelectedLayout,
  DeliverySelectedLayouts,
  KEY_METADATA,
  LoggerService,
  RenderingContextV2
} from '@acoustic-content-sdk/api';
import {
  MonoTypeOperatorFunction,
  Observable,
  of,
  queueScheduler,
  SchedulerLike,
  UnaryFunction
} from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Maybe, partialFirst } from '../js/js.core';
import { arrayFind } from '../js/js.utils';
import { pluckProperty } from '../js/pluck';
import { NOOP_LOGGER_SERVICE } from '../logger/noop.logger.service';
import { rxNext } from '../logger/rx.logger';
import { opDistinctUntilChanged } from '../operators/operators';
import { pluckPath } from '../path/path';
import { rxWchFromAuthoringTypeByAccessor } from '../placeholder/placeholder';
import { isEqual, isNil, isNotNil, Predicate } from '../predicates/predicates';
import { rxPipe, UNDEFINED$ } from '../rx/rx.utils';
import { DEFAULT_LAYOUT_MODE } from './layout';

const KEY_ELEMENTS = 'elements';

const selectedLayoutsExtractor = pluckPath<DeliverySelectedLayouts>([
  KEY_METADATA,
  'selectedLayouts'
]);

const selectAuthoringLayoutMappings = pluckProperty<
  AuthoringLayoutMapping,
  'mappings'
>('mappings');

const layoutIdFromLayoutExtractor = pluckPath<string>(['defaultLayout', 'id']);

const selectLayoutModeFromAuthoringLayoutMappingMapping = pluckProperty<
  AuthoringLayoutMappingMapping,
  'layoutMode'
>('layoutMode', DEFAULT_LAYOUT_MODE);

/** Returns a selector for the desired layout mapping */
const isAuthoringLayoutMapping: UnaryFunction<
  string,
  Predicate<AuthoringLayoutMappingMapping>
> = (layoutMode) => (mapping) =>
  isEqual(
    layoutMode,
    selectLayoutModeFromAuthoringLayoutMappingMapping(mapping)
  );

/**
 * Decodes the layout ID from the authoring layout mapping
 *
 * @param aLayoutMode - the layout mode
 * @param aMapping - the layout mapping
 * @returns the layout ID
 */
const layoutIdFromAuthoringLayoutMapping = (
  aLayoutMode: string,
  aMapping: AuthoringLayoutMapping
): string =>
  layoutIdFromLayoutExtractor(
    arrayFind(
      selectAuthoringLayoutMappings(aMapping),
      isAuthoringLayoutMapping(aLayoutMode)
    )
  );

const selectLayoutModeFromDeliverySelectedLayout = pluckPath(
  ['layout', 'layoutMode'],
  DEFAULT_LAYOUT_MODE
);
const selectLayoutIdFromDeliverySelectedLayout = pluckPath<string>([
  'layout',
  'id'
]);

const selectTypeIdFromAuthoringElement = pluckPath<string>(['typeRef', 'id']);

/** Returns a selector for the desired layout mapping */
const isSelectecLayoutMapping: UnaryFunction<
  string,
  Predicate<DeliverySelectedLayout>
> = (layoutMode) => (layout) =>
  isEqual(layoutMode, selectLayoutModeFromDeliverySelectedLayout(layout));

/**
 * Decodes the layout ID from the authoring layout mapping
 *
 * @param aLayoutMode - the layout mode
 * @param aMapping - the layout mapping
 * @returns the layout ID
 */
const layoutIdFromSelectedLayouts = (
  aLayoutMode: string,
  aLayouts?: DeliverySelectedLayouts
): string =>
  selectLayoutIdFromDeliverySelectedLayout(
    arrayFind(aLayouts, isSelectecLayoutMapping(aLayoutMode))
  );

/**
 * Tests if the accessor is a root level accessor
 */
const isRootAccessor: Predicate<string> = (accessor) =>
  isNil(accessor) || accessor === KEY_ELEMENTS;

/**
 * Decodes the layout id from a type or provider
 *
 * @param aLayoutMode - the layout mode
 * @param aRenderingContext - the rendering context
 * @param aTypeAccessor - resolver for the content types
 * @param aLayoutMappingAccessor - resolver for the layout mappings by type ID
 *
 * @returns the decoded layout id
 */
export function rxLayoutIdFromRenderingContext(
  aLayoutMode: string,
  aRenderingContext: Maybe<RenderingContextV2>,
  aTypeAccessor: UnaryFunction<string, Observable<AuthoringType>>,
  aLayoutMappingAccessor: UnaryFunction<
    string,
    Observable<AuthoringLayoutMapping>
  >,
  aLogSvc: LoggerService = NOOP_LOGGER_SERVICE,
  aScheduler: SchedulerLike = queueScheduler
): Observable<string> {
  // logger
  const logger = aLogSvc.get('rxLayoutIdFromRenderingContext');
  // sanity check
  if (isNil(aRenderingContext)) {
    return UNDEFINED$;
  }
  // extract the selected layout
  const layoutId = layoutIdFromSelectedLayouts(
    aLayoutMode,
    selectedLayoutsExtractor(aRenderingContext)
  );
  // if set on the object, return it
  if (isNotNil(layoutId)) {
    // log this
    logger.info('selectedLayoutId', layoutId);
    // returns the selected layout ID
    return of(layoutId, aScheduler);
  }
  // next logger
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);
  // helper
  const opMapLayoutId = map(
    partialFirst(layoutIdFromAuthoringLayoutMapping, aLayoutMode)
  );
  // extract accessor and typeID
  const { accessor, typeId } = aRenderingContext.$metadata;
  // for root level elements we do not have to resolve the type
  if (isRootAccessor(accessor)) {
    // resolve the mapping and decode
    return rxPipe(
      aLayoutMappingAccessor(typeId),
      opMapLayoutId,
      log('layoutId', typeId)
    );
  }
  /**
   * Resolve the type based on the accessor, then load the mapping
   * based on the resolved type id
   */
  return rxPipe(
    rxWchFromAuthoringTypeByAccessor(
      accessor,
      typeId,
      selectTypeIdFromAuthoringElement,
      aTypeAccessor,
      aScheduler
    ),
    opDistinctUntilChanged,
    log('typeId'),
    switchMap(aLayoutMappingAccessor),
    opMapLayoutId,
    log('layoutId')
  );
}
