import { Logger, LoggerService } from '@acoustic-content-sdk/api';
import {
  boxLoggerService,
  getProperty,
  hashRandomIdentifier,
  isNil,
  isNotNil,
  mapArray,
  opDeepDistinctUntilChanged,
  opDistinctUntilChanged,
  opReplayLast,
  rxNext,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { MonoTypeOperatorFunction, Observable, of, UnaryFunction } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export const ROOT_ID = hashRandomIdentifier();

export interface NavigationJson {
  id: string;
  children?: NavigationJson[];
  length: number;
}

interface Navigation {
  children: Record<string, string[]>;
  parents: Record<string, string>;
}

export function isNotRoot(aId: string): boolean {
  return isNotNil(aId) && aId !== ROOT_ID;
}

/**
 * Iterates over a
 */
function reduceRecord(aDst: Navigation, aRecord: any, aParent: string): string {
  // access props
  const { id, children } = aRecord;
  // register child to parent mapping
  aDst.parents[id] = aParent;
  // register the children
  aDst.children[id] = mapArray(children, (child) =>
    reduceRecord(aDst, child, id)
  );
  // returns the ID
  return id;
}

/**
 * Builds a navigation structure from the navigation element
 *
 * @param aJson - the navigation element
 *
 * @returns the navigation structure
 */
export function navigationFromJson(aJson: any, aLogger: Logger): Navigation {
  // show the navigation
  aLogger.info('navigation', aJson);
  // the navigation record
  const nav: Navigation = { children: {}, parents: {} };
  let rootTemp = '';
  if (aJson.length === 1) {
    let rootJson = {
      id: '593730b0-c45e-4888-8d94-9a986be3d51f',
      children: []
    };
    rootJson.children = aJson;
    rootTemp = reduceRecord(nav, rootJson, ROOT_ID);
  } else {
    rootTemp = reduceRecord(nav, aJson, ROOT_ID);
  }
  const root = rootTemp;
  // update the parent references
  nav.children[ROOT_ID] = isNotNil(root) ? [root] : [];
  nav.parents[ROOT_ID] = ROOT_ID;
  // ok
  return nav;
}

/**
 * Interface that exposes selectors to the navigation structure
 */
export interface NavSelectors {
  /**
   * ID of the (virtual) root item of the navigation
   */
  root: string;
  /**
   * Selects the children of a particular item
   */
  selectChildren: UnaryFunction<string, Observable<string[]>>;
  /**
   * Selects the parent of a particular item
   */
  selectParent: UnaryFunction<string, Observable<string>>;
}

const LOGGER = 'NavigationService';

/**
 * Returns a valid ID in case the input is null or undefined
 *
 * @param aId - the root ID
 * @returns the boxed ID
 */
const boxId = (aId?: string) => (isNotNil(aId) ? aId : ROOT_ID);

/**
 * Returns selectors that access parent and child nodes from a navigation structure
 *
 * @param aJson$ - the JSON that represents the navigation
 * @param aLogSvc - optional logger service
 * @returns the selectors
 */
export function getNavSelectors(
  aJson$: Observable<NavigationJson>,
  aLogSvc?: LoggerService
): NavSelectors {
  // logging
  const logSvc = boxLoggerService(aLogSvc);
  const logger = logSvc.get(LOGGER);
  // next logger
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);

  // make sure we have a singleton
  const nav$ = rxPipe(
    aJson$,
    opDistinctUntilChanged,
    map((json) => navigationFromJson(json, logger)),
    opReplayLast
  );
  // select the children
  const selectChildren: UnaryFunction<string, Observable<string[]>> = (aId) => {
    // box the ID
    const id = boxId(aId);
    // dispatch
    return rxPipe(
      nav$,
      map((nav) => getProperty(nav.children, id, [])),
      log('children', id),
      opDeepDistinctUntilChanged
    );
  };
  // select the parent
  const selectParent: UnaryFunction<string, Observable<string>> = (aId) => {
    // box the ID
    const id = boxId(aId);
    // dispatch
    return rxPipe(
      nav$,
      map((nav) => getProperty(nav.parents, id)),
      log('parent', id),
      opDistinctUntilChanged
    );
  };
  // returns the record
  return { root: ROOT_ID, selectChildren, selectParent };
}

function mergeBreadcrumb<T>(
  aId: string,
  aParent: T,
  aSelParent: UnaryFunction<string, Observable<T>>,
  aSelId: UnaryFunction<T, string>,
  aCycles: Record<string, string>
): Observable<T[]> {
  // bail out if there is no parent
  if (isNotNil(aParent)) {
    // get the id
    const parentId = aSelId(aParent);
    if (isNotNil(parentId) && parentId !== aId && parentId !== ROOT_ID) {
      // update the cycles
      const cycles = { ...aCycles, [aId]: parentId };
      // get the parent breadcrumb
      const breadcrumb$ = doCreateBreadcrumb(
        parentId,
        aSelParent,
        aSelId,
        cycles
      );
      // merge
      return rxPipe(
        breadcrumb$,
        opDeepDistinctUntilChanged,
        map((breadcrumb) => [...breadcrumb, aParent])
      );
    }
  }
  // nothing to return
  return of([]);
}

function doCreateBreadcrumb<T>(
  aId: string,
  aSelParent: UnaryFunction<string, Observable<T>>,
  aSelId: UnaryFunction<T, string>,
  aCycles: Record<string, string>
): Observable<T[]> {
  // cycle check
  const knownParent = aCycles[aId];
  // get the parent
  return isNil(knownParent) && aId !== ROOT_ID
    ? rxPipe(
        aSelParent(aId),
        switchMap((parent) =>
          mergeBreadcrumb(aId, parent, aSelParent, aSelId, aCycles)
        )
      )
    : of([]);
}

/**
 * Constructs a breadcrumb trail starting at a particular ID
 *
 * @param aId  - the start ID
 * @param aSelParent - selector function for the parent node
 * @param aSelId - selector function for the ID from a parent node
 *
 * @returns the breadcrumb trail
 */
export function createBreadcrumb<T>(
  aId: string,
  aSelParent: UnaryFunction<string, Observable<T>>,
  aSelId: UnaryFunction<T, string>
): Observable<T[]> {
  // safeguards
  const selParent = (aChildId: string) =>
    rxPipe(aSelParent(aChildId), opDistinctUntilChanged);
  // prepare the cycles
  return doCreateBreadcrumb(boxId(aId), selParent, aSelId, {});
}
