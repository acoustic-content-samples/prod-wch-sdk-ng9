import {
  AuthoringLayoutMapping,
  createVersionString,
  DeliveryLayoutMapping,
  LoggerService
} from '@acoustic-content-sdk/api';
import { DeliveryLayoutMappingResolver } from '@acoustic-content-sdk/component-api';
import {
  guaranteeAuthoringLayoutMappingByTypeAction,
  selectAuthLayoutMappingFeature
} from '@acoustic-content-sdk/redux-feature-auth-layout-mapping';
import { guaranteeAuthoringContentTypeAction } from '@acoustic-content-sdk/redux-feature-auth-type';
import {
  ReduxRootStore,
  rxSelect,
  rxStore
} from '@acoustic-content-sdk/redux-store';
import { selectByDeliveryId } from '@acoustic-content-sdk/redux-utils';
import {
  authoringLayoutMappingToDeliveryLayoutMapping,
  isNil,
  NOOP_LOGGER_SERVICE,
  objectAssign,
  pluckPath,
  reduceForIn,
  rxCachedFunction,
  rxNext,
  rxPipe,
  UNDEFINED$
} from '@acoustic-content-sdk/utils';
import { MonoTypeOperatorFunction, Observable, UnaryFunction } from 'rxjs';

import { createCache } from '../../utils/cache.utils';
import { isEqualRev } from '../../utils/selection.utils';
import { logDispatch } from '../../utils/store.utils';
import { MODULE, VERSION } from './../../version';

const LOGGER = 'DeliveryLayoutMappingResolverService';

/**
 * Creates a function that extracts the layout mapping from the record, organized by type
 */
const selectDeliveryLayoutMapping: UnaryFunction<
  string,
  UnaryFunction<Record<string, DeliveryLayoutMapping>, DeliveryLayoutMapping>
> = selectByDeliveryId;

/**
 * Extracts the type ID from a mapping
 */
const selectTypeId = pluckPath<string>(['type', 'id']);

/**
 * Inserts a particluar mapping by type into the target record
 *
 * @params aDst - target record
 * @params aMapping - authoring mapping
 * @returns the updated target record
 */
const reduceMapping = (
  aDst: Record<string, DeliveryLayoutMapping>,
  aMapping: AuthoringLayoutMapping
) =>
  objectAssign(
    selectTypeId(aMapping),
    authoringLayoutMappingToDeliveryLayoutMapping(aMapping),
    aDst
  );

/**
 * Converts the authoring layout mappings
 *
 * @param aMapping - the authoring mappings, organized by mapping ID
 * @returns the mappings organized by type ID
 */
const byType = (
  aMappings: Record<string, AuthoringLayoutMapping>
): Record<string, DeliveryLayoutMapping> =>
  reduceForIn(aMappings, reduceMapping, {});

export class AbstractDeliveryLayoutMappingResolverService
  implements DeliveryLayoutMappingResolver {
  getDeliveryLayoutMapping: (
    aTypeId: string
  ) => Observable<DeliveryLayoutMapping>;

  protected constructor(aStore: ReduxRootStore, aLogSvc?: LoggerService) {
    // logger
    const logSvc = aLogSvc || NOOP_LOGGER_SERVICE;
    // construct a logger
    const logger = logSvc.get(LOGGER);
    // next logger
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);

    const store$ = rxStore(aStore);
    const layoutMappingsByType$ = rxPipe(
      store$,
      rxSelect(selectAuthLayoutMappingFeature),
      // TODO measure if this is a performance issue
      rxSelect(byType)
    );
    // dispatch callback
    const dispatch = logDispatch(aStore, logger);

    // select the layout
    const getDeliveryLayoutMapping = (
      aTypeId: string
    ): Observable<DeliveryLayoutMapping> => {
      // quick check for the impossible case
      if (isNil(aTypeId)) {
        return UNDEFINED$;
      }
      // make sure the type and mapping are there
      dispatch(guaranteeAuthoringContentTypeAction(aTypeId));
      dispatch(guaranteeAuthoringLayoutMappingByTypeAction(aTypeId));
      // actually load the mapping
      return rxPipe(
        layoutMappingsByType$,
        rxSelect(selectDeliveryLayoutMapping(aTypeId), isEqualRev),
        log('layout mapping', aTypeId)
      );
    };

    // log this service
    logger.info(MODULE, createVersionString(VERSION));

    // load the layout
    this.getDeliveryLayoutMapping = rxCachedFunction(
      getDeliveryLayoutMapping,
      createCache(logger)
    );
  }
}
