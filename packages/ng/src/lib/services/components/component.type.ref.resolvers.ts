import { Layout, Logger, LoggerService } from '@acoustic-content-sdk/api';
import {
  ComponentTypeRef,
  ComponentTypeRefResolver,
  PROVIDER_WEIGHT
} from '@acoustic-content-sdk/ng-api';
import {
  boxLoggerService,
  cmpNumbers,
  constGenerator,
  isNil,
  isNilOrEmpty,
  isNotNil,
  mapArray,
  opFilterNotNil,
  pluckProperty,
  rxNext,
  rxPipe,
  UNDEFINED$
} from '@acoustic-content-sdk/utils';
import {
  combineLatest,
  concat,
  EMPTY,
  MonoTypeOperatorFunction,
  Observable
} from 'rxjs';
import { map } from 'rxjs/operators';

const LOGGER = 'createComponentTypeRefResolver';

/**
 * Resolves the components given a set of resolvers
 *
 * @param aResolvers - the available resolvers
 * @param aLayout - the layout to resolve
 * @param aLayoutMode - the layout mode
 *
 * @returns the resolution result or empty
 */
function _getTypeByLayout(
  aResolvers: ComponentTypeRefResolver[],
  aLayout: Layout,
  aLogger: Logger,
  aLayoutMode?: string
): Observable<ComponentTypeRef<any>> {
  // logging
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(aLogger);
  // sanity check on the layout
  if (isNil(aLayout)) {
    return EMPTY;
  }
  // map the resolvers
  return rxPipe(
    combineLatest(
      mapArray(aResolvers, (resolver) =>
        concat(UNDEFINED$, resolver.getTypeByLayout(aLayout, aLayoutMode))
      )
    ),
    log('layouts'),
    map((layouts) => layouts.find(isNotNil)),
    opFilterNotNil
  );
}

const KEY_WEIGHT = 'weight';

const selectWeight = pluckProperty<ComponentTypeRefResolver, typeof KEY_WEIGHT>(
  KEY_WEIGHT,
  PROVIDER_WEIGHT.MAX
);

/**
 * Compares resolvers by weigth
 *
 * @param aLeft  - left resolver
 * @param aRight - right resolver
 *
 * @return the result
 */
const cmpComponentTypeRefResolver = (
  aLeft: ComponentTypeRefResolver,
  aRight: ComponentTypeRefResolver
) => cmpNumbers(selectWeight(aLeft), selectWeight(aRight));

function _createComponentTypeRefResolver(
  aResolvers: ComponentTypeRefResolver[],
  aLogger: Logger
) {
  // sorted set of resolvers
  const sortedResolvers: ComponentTypeRefResolver[] = [...aResolvers];
  sortedResolvers.sort(cmpComponentTypeRefResolver);
  // returns the resolution function
  return (aLayout: Layout, aLayoutMode?: string) =>
    _getTypeByLayout(sortedResolvers, aLayout, aLogger, aLayoutMode);
}

/**
 * Implements a resolver based on a set of other resolvers. The first to fire will be used
 *
 * @param aResolvers - the resolvers
 * @returns the combined resolver
 */
export function createComponentTypeRefResolver(
  aResolvers?: ComponentTypeRefResolver[],
  aLogSvc?: LoggerService
): ComponentTypeRefResolver {
  // logging
  const logSvc = boxLoggerService(aLogSvc);
  const logger = logSvc.get(LOGGER);
  // the function
  const getTypeByLayout = isNilOrEmpty(aResolvers)
    ? constGenerator(EMPTY)
    : _createComponentTypeRefResolver(aResolvers, logger);
  // returns the resolver
  return { getTypeByLayout };
}
