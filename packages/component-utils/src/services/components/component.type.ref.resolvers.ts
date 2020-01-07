import { Layout } from '@acoustic-content-sdk/api';
import { AbstractComponentTypeRefResolver } from '@acoustic-content-sdk/component-api';
import { constGenerator, isNilOrEmpty } from '@acoustic-content-sdk/utils';
import { EMPTY, Observable, race } from 'rxjs';

/**
 * Resolves the components given a set of resolvers
 *
 * @param aResolvers - the available resolvers
 * @param aLayout - the layout to resolve
 * @param aLayoutMode - the layout mode
 *
 * @returns the resolution result or empty
 */
function _getTypeByLayout<T>(
  aResolvers: Array<AbstractComponentTypeRefResolver<T>>,
  aLayout: Layout,
  aLayoutMode?: string
): Observable<T> {
  // use the first to resolve
  return race(
    aResolvers.map((resolver) => resolver.getTypeByLayout(aLayout, aLayoutMode))
  );
}

/**
 * Implements a resolver based on a set of other resolvers. The first to fire will be used
 *
 * @param aResolvers - the resolvers
 * @returns the combined resolver
 */
export function createComponentTypeRefResolver<T>(
  aResolvers: Array<AbstractComponentTypeRefResolver<T>>
): AbstractComponentTypeRefResolver<T> {
  // the function
  const getTypeByLayout = isNilOrEmpty(aResolvers)
    ? constGenerator(EMPTY)
    : (aLayout: Layout, aLayoutMode?: string) =>
        _getTypeByLayout(aResolvers, aLayout, aLayoutMode);
  // returns the resolver
  return { getTypeByLayout };
}
