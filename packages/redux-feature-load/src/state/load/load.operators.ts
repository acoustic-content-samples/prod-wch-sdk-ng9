import { Logger } from '@acoustic-content-sdk/api';
import {
  isArray,
  isNil,
  isNotNil,
  opFilterNotNil,
  rxNext,
  rxPipe,
  TRUE$,
  NOOP_LOGGER_SERVICE
} from '@acoustic-content-sdk/utils';
import { Action } from 'redux';
import {
  EMPTY,
  from,
  MonoTypeOperatorFunction,
  Observable,
  of,
  OperatorFunction,
  UnaryFunction
} from 'rxjs';
import {
  endWith,
  filter,
  first,
  map,
  mergeMap,
  startWith,
  switchMap,
  switchMapTo,
  tap,
  withLatestFrom
} from 'rxjs/operators';

import {
  nextLogin,
  NextLoginReduxState
} from '@acoustic-content-sdk/redux-feature-login';
import { opSetErrorAction } from '@acoustic-content-sdk/redux-feature-error';
import {
  selectUrlConfigFeature,
  UrlConfigFeatureState
} from '@acoustic-content-sdk/redux-feature-url-config';
import {
  isValidUrlConfig,
  selectIsPreviewMode
} from '@acoustic-content-sdk/redux-feature-url-config';
import { loadingEndAction, loadingStartAction } from './load.actions';
import { LoadingFeatureState, selectLoadingFeature } from './load.feature';
import { LoadingState } from './load.state';
import { rxSelect } from '@acoustic-content-sdk/redux-store';

const NOOP_LOGGER = NOOP_LOGGER_SERVICE.get('root');

/** Direct test if an item is currently loading */
export const isNotLoading = (aItem: string, aState: LoadingState): boolean =>
  isNil(aState) || !aState.has(aItem);

/**
 * Operator that only fires if an item is not loading
 */
const opFilterNotLoading: OperatorFunction<
  [string, LoadingState],
  string
> = data$ =>
  rxPipe(
    data$,
    filter(([id, state]) => isNotLoading(id, state)),
    map(([id]) => id)
  );

/**
 * Generates an observable from a single item or an array
 *
 * @param aData - the data
 * @returns the observable
 */
const fromActions = (aData: Action | Action[]): Observable<Action> =>
  isArray(aData) ? from(aData) : isNotNil(aData) ? of(aData) : EMPTY;

export type LoaderType = UnaryFunction<string, Observable<Action | Action[]>>;

export interface LoaderReduxState extends LoadingFeatureState {}

/**
 * Returns a loader operator that makes sure not to load resources twice and also
 * to issue loading start and stop events
 *
 * @param aState$ - the store
 * @param aLoader - loader to actually perform the operation
 * @param aLogger - optional logger
 *
 * @returns loading operator
 */
export function createLoader(
  aState$: Observable<LoaderReduxState>,
  aLoader: LoaderType,
  aLogger: Logger = NOOP_LOGGER
): OperatorFunction<string, Action> {
  // loading hook
  const loading$ = rxPipe(aState$, rxSelect(selectLoadingFeature));
  // make sure to only load a single item
  const loadSingle: UnaryFunction<string, Observable<Action>> = id =>
    rxPipe(
      // load the resource
      aLoader(id),
      // make sure we only have one submission
      first(),
      // dispatch potentially many actions
      mergeMap(fromActions),
      // start the complete sequence with a loading indicator
      startWith(loadingStartAction(id)),
      // handle errors
      opSetErrorAction,
      // end the sequence with the loading done indicator
      endWith(loadingEndAction(id)),
      // just in case
      opFilterNotNil,
      // logging
      tap(action => aLogger.info('loading', id, 'action', action.type))
    );
  // returns our fancy operator
  return (id$: Observable<string>): Observable<Action> =>
    rxPipe(
      // simply merge all IDs
      id$,
      // sanity check in case there is no ID
      opFilterNotNil,
      // do not proceed if the ID is already loading
      withLatestFrom(loading$),
      opFilterNotLoading,
      // execute the actual load operation
      mergeMap(loadSingle)
    );
}

export interface AuthenticatedLoaderReduxState
  extends LoaderReduxState,
    NextLoginReduxState {}

/**
 * Returns a loader that makes sure to wait for the correct authentication state before
 * loading.
 *
 * @param aState$ - the store
 * @param aLoader - loader to actually perform the operation
 * @param aLogger - optional logger
 *
 * @returns loading operator
 */
export function createAuthenticatedLoader(
  aState$: Observable<AuthenticatedLoaderReduxState>,
  aLoader: LoaderType,
  aLogger: Logger = NOOP_LOGGER
): OperatorFunction<string, Action> {
  // next logger
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(aLogger);
  // next login state
  const nextLogin$ = nextLogin(aState$);
  // the actual loader function
  const loader: LoaderType = id =>
    rxPipe(
      // wait until the next login
      nextLogin$,
      // log this
      log('logged in', id),
      // handle the original emissions
      switchMapTo(aLoader(id))
    );
  // dispatch
  return createLoader(aState$, loader, aLogger);
}

export interface PreviewAwareLoaderReduxState
  extends LoaderReduxState,
    UrlConfigFeatureState,
    NextLoginReduxState {}

/**
 * Returns a loader that only waits for a login if we are running against preview
 *
 * @param aState$ - the store
 * @param aLoader - loader to actually perform the operation
 * @param aLogger - optional logger
 *
 * @returns loading operator
 */
export function createPreviewAwareLoader(
  aState$: Observable<PreviewAwareLoaderReduxState>,
  aLoader: LoaderType,
  aLogger: Logger = NOOP_LOGGER
): OperatorFunction<string, Action> {
  // next logger
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(aLogger);
  // access the url config
  const urlConfig$ = rxPipe(
    aState$,
    rxSelect(selectUrlConfigFeature),
    filter(isValidUrlConfig)
  );
  // preview
  const isPreviewMode$ = rxPipe(urlConfig$, rxSelect(selectIsPreviewMode));
  // next login state
  const nextLogin$ = rxPipe(
    isPreviewMode$,
    // only wait for a login in preview mode, else start right away
    switchMap(isPreviewMode => (isPreviewMode ? nextLogin(aState$) : TRUE$))
  );
  // the actual loader function
  const loader: LoaderType = id =>
    rxPipe(
      // wait until the next login
      nextLogin$,
      // log this
      log('logged in', id),
      // handle the original emissions
      switchMapTo(aLoader(id))
    );
  // dispatch
  return createLoader(aState$, loader, aLogger);
}

/**
 * Query parameter that indicates that we want to load a draft overlay
 */
export const PROJECT_ID_QUERY_PARAM = 'projectId=draft';
