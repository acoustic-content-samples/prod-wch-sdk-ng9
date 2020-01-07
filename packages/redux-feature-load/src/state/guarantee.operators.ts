import { Logger } from '@acoustic-content-sdk/api';
import {
  PayloadAction,
  rxSelect,
  selectPayload
} from '@acoustic-content-sdk/redux-store';
import { isNotFromDataBase } from '@acoustic-content-sdk/redux-utils';
import {
  BiFunction,
  isNotNil,
  isString,
  opFilterNotNil,
  rxNext,
  rxPipe,
  unary
} from '@acoustic-content-sdk/utils';
import { Action } from 'redux';
import { Epic, ofType } from 'redux-observable';
import {
  MonoTypeOperatorFunction,
  Observable,
  OperatorFunction,
  UnaryFunction
} from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';

import { selectLoadingFeature } from './load/load.feature';
import { isNotLoading } from './load/load.operators';
import { LoadingState } from './load/load.state';

export type KeyExtractorType<T> = UnaryFunction<T, string>;
export type LoadActionType = UnaryFunction<string, PayloadAction<string>>;
export type AddActionType<T> = UnaryFunction<T, PayloadAction<T>>;
export type ResourceSelectorType<T, S> = UnaryFunction<S, Record<string, T>>;
export type ResourceValidatorType<T> = BiFunction<
  string,
  Record<string, T>,
  boolean
>;

/**
 * Tests if a resource exists
 *
 * @param aId - the ID of the resource
 * @param aResources - the set of applicable resources
 *
 * @returns true if the resource exists
 */
function hasResource<T>(aId: string, aResources: Record<string, T>): boolean {
  // check for the existence
  return (
    isString(aId) && isNotNil(aResources) && isNotFromDataBase(aResources[aId])
  );
}

/**
 * Operator that only fires if a resource is not loading and also not known
 */
function filterUnknown<T>(
  aValidator: ResourceValidatorType<T>
): OperatorFunction<[string, LoadingState, Record<string, any>], string> {
  return data$ =>
    rxPipe(
      data$,
      filter(
        ([id, loading, resources]) =>
          isNotLoading(id, loading) && !aValidator(id, resources)
      ),
      map(([id]) => id)
    );
}

/**
 * Operator that only fires if a resource not known
 */
function filterNonExistent<T>(
  aKeyExtractor: KeyExtractorType<T>,
  aValidator: ResourceValidatorType<T>
): OperatorFunction<[T, Record<string, any>], T> {
  return data$ =>
    rxPipe(
      data$,
      filter(
        ([item, resources]) => !aValidator(aKeyExtractor(item), resources)
      ),
      map(([id]) => id)
    );
}

/**
 * Returns an operator that guarantees the existence of the resource by checking if the
 * resource should be loaded if it does not exist.
 *
 * @param aState$   the store
 * @param aLoadAction - creator of the load action
 * @param aLogger - optional logger
 *
 * @returns loading operator
 */
export function createGuarantee<R, S>(
  aState$: Observable<S>,
  aLoadAction: LoadActionType,
  aResourceSelector: ResourceSelectorType<R, S>,
  aValidator: ResourceValidatorType<R> = hasResource,
  aLogger: Logger
): OperatorFunction<string, Action> {
  // some logging
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(
    aLogger,
    'guarantee'
  );
  // safeguard
  const loadAction = unary(aLoadAction);
  // resources that are loading
  const loading$ = rxPipe(aState$, rxSelect(selectLoadingFeature));
  // resource map
  const resources$ = rxPipe(aState$, rxSelect(aResourceSelector));
  // the operator
  return id$ =>
    rxPipe(
      // listen for a sequence of IDs
      id$,
      // sanity check
      opFilterNotNil,
      // access the current version of the resources
      withLatestFrom(loading$, resources$),
      // test
      filterUnknown(aValidator),
      // convert into an action
      map(loadAction),
      // log
      log('action')
    );
}

/**
 * Returns an operator that adds a resource only if it does not exist
 *
 * @param aState$ - the store
 * @param aAddAction - creates the action to add the item if it does not exist
 * @param aKeyExtractor - extracts the key from a item
 * @param aResourceSelector - selects the resources from the state
 * @param aValidator - tests if a resource exists
 * @param aLogger - optional logger
 *
 * @returns loading operator
 */
export function createNonExistent<R, S>(
  aState$: Observable<S>,
  aAddAction: AddActionType<R>,
  aKeyExtractor: KeyExtractorType<R>,
  aResourceSelector: ResourceSelectorType<R, S>,
  aValidator: ResourceValidatorType<R> = hasResource,
  aLogger: Logger
): OperatorFunction<R, Action> {
  // some logging
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(
    aLogger,
    'nonExistent'
  );
  // safeguard
  const addAction = unary(aAddAction);
  // resource map
  const resources$ = rxPipe(aState$, rxSelect(aResourceSelector));
  // filter operation
  const opFilter = filterNonExistent(aKeyExtractor, aValidator);
  // the operator
  return item$ =>
    rxPipe(
      // listen for a sequence of items
      item$,
      // sanity check
      opFilterNotNil,
      // access the current version of the resources
      withLatestFrom(resources$),
      // test
      opFilter,
      // convert into an action
      map<R, Action>(addAction),
      // log
      log('action')
    );
}

export interface GuaranteeDependencies {
  logger: Logger;
}

/**
 * Handles item guarantees
 */
export function guaranteeEpic<T, S>(
  aGuarantee: string,
  aLoadAction: LoadActionType,
  aResourceSelector: ResourceSelectorType<T, S>,
  aValidator: ResourceValidatorType<T> = hasResource
): Epic {
  return (
    actions$,
    state$: Observable<S>,
    { logger }: GuaranteeDependencies
  ) => {
    // our guarantee
    const opGuarantee = createGuarantee(
      state$,
      aLoadAction,
      aResourceSelector,
      aValidator,
      logger
    );

    return rxPipe(
      actions$,
      // the type
      ofType(aGuarantee),
      // extract the id of the type
      map(selectPayload),
      // guarantee
      opGuarantee
    );
  };
}

/**
 * Handles the addition of items if they do not exist
 *
 * @param aGuarantee - the action to listen for in this epic, typicall contains '_IF_NONEXISTENT'.
 * @param aAddAction - generator for the action that adds the item if it does not exist
 * @param aKeyExtractor - extracts a key from the payload of the action to check if the item exists in the store
 * @param aResourceSelector - selects a record of items from the store. This is used to tell if the item exists. The key extractor extracts a key into this record.
 * @param aValidator - function to compute if an item exists, given a key and a record
 *
 * @returns an epic that converts handles '_IF_NONEXISTENT' action
 */
export function nonExistentEpic<T, S>(
  aGuarantee: string,
  aAddAction: AddActionType<T>,
  aKeyExtractor: KeyExtractorType<T>,
  aResourceSelector: ResourceSelectorType<T, S>,
  aValidator: ResourceValidatorType<T> = hasResource
): Epic {
  return (
    actions$,
    state$: Observable<S>,
    { logger }: GuaranteeDependencies
  ) => {
    // our guarantee
    const opNonExistent: OperatorFunction<T, Action> = createNonExistent(
      state$,
      aAddAction,
      aKeyExtractor,
      aResourceSelector,
      aValidator,
      logger
    );

    return rxPipe(
      actions$,
      // the type
      ofType(aGuarantee),
      // extract the id of the type
      map(selectPayload),
      // handle the items
      opNonExistent
    );
  };
}
