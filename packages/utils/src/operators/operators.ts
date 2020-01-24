import {
  DeliveryContentItem,
  RenderingContextV2
} from '@acoustic-content-sdk/api';
import {
  concat,
  defer,
  EMPTY,
  identity,
  isObservable,
  merge,
  MonoTypeOperatorFunction,
  Observable,
  ObservableInput,
  of,
  OperatorFunction,
  pipe,
  SchedulerLike,
  Subject,
  UnaryFunction
} from 'rxjs';
import {
  concatMap,
  distinctUntilChanged,
  filter,
  finalize,
  map,
  mergeMap,
  pluck,
  scan,
  shareReplay,
  switchMap,
  tap
} from 'rxjs/operators';

import { BiFunction } from '../consumers/consumer';
import {
  compose,
  Maybe,
  partialFirst,
  partialSecond,
  ternary,
  UNDEFINED
} from '../js/js.core';
import { pluckProperty } from '../js/pluck';
import { parsePath, pluckPath } from '../path/path';
import { GEN_UNDEFINED$, rxPipe } from '../rx/rx.utils';
import { constGenerator, Generator } from './../generators/generator';
import {
  arrayPush,
  deepEquals,
  partialLeft,
  shallowEquals,
  toInteger,
  unary
} from './../js/js.utils';
import { jsonParse, jsonStringify } from './../json/json.utils';
import {
  EqualsPredicate,
  isArray,
  isArrayOf,
  isBoolean,
  isEqual,
  isNever,
  isNotNil,
  isNumber,
  isPlainObject,
  IsPredicate,
  isString
} from './../predicates/predicates';
import {
  pageArrayEquals,
  pageEquals,
  pageFromRenderingContext
} from './../site/site.utils';
import { DEFAULT_FETCH_LEVELS, wchBoxLayoutMode } from './../wch/wch.utils';

/* Copyright IBM Corp. 2018 */

const GEN_UNDEFINED = constGenerator(UNDEFINED);

/**
 * @deprecated use {@link opDeepDistinctUntilChanged} instead
 */
export const deepDistinctUntilChanged = <T>() =>
  distinctUntilChanged<T>(deepEquals);

/**
 * @deprecated use {@link opPageDistinctUntilChanged} instead
 */
export const pageDistinctUntilChanged: Generator<MonoTypeOperatorFunction<
  DeliveryContentItem
>> = partialLeft(distinctUntilChanged, pageEquals) as any;
/**
 * @deprecated use {@link opPageArrayDistinctUntilChanged} instead
 */
export const pageArrayDistinctUntilChanged: Generator<MonoTypeOperatorFunction<
  DeliveryContentItem[]
>> = partialLeft(distinctUntilChanged, pageArrayEquals) as any;
/**
 * @deprecated use {@link opShareLast} instead
 *
 * https://blog.angularindepth.com/rxjs-whats-changed-with-sharereplay-65c098843e95
 */
export const shareLast = <T>() => shareReplay<T>(1);
/**
 * @deprecated use {@link opFilterNotNil} instead
 */
export const filterNotNil = <T>() => filter<T>(isNotNil);

/**
 * Operator that plucks a key from an object and makes sure that the key exists
 *
 * @param aKey - the key to pluck
 * @returns the operator
 */
export const typedPluck = <T, K extends keyof T & string>(aKey: K) =>
  pluck<T, T[K]>(aKey);

/**
 * Like {@link distinctUntilChanged} using {@link deepEquals}
 *
 * @param src - source sequence
 * @returns target sequence without consecutive duplicates
 */
export const opDeepDistinctUntilChanged: <T>(
  src: Observable<T>
) => Observable<T> = distinctUntilChanged(deepEquals);

/**
 * Like {@link distinctUntilChanged} using {@link shallowEquals}
 *
 * @param src - source sequence
 * @returns target sequence without consecutive duplicates
 */
export const opShallowDistinctUntilChanged: <T>(
  src: Observable<T>
) => Observable<T> = distinctUntilChanged(shallowEquals);

/**
 * Like {@link distinctUntilChanged}
 *
 * @param src - source sequence
 * @returns target sequence without consecutive duplicates
 */
export const opDistinctUntilChanged: <T>(
  src: Observable<T>
) => Observable<T> = distinctUntilChanged();

/**
 * Like {@link distinctUntilChanged} using {@link pageEquals}
 *
 * @param src - source sequence
 * @returns target sequence without consecutive duplicates
 */
export const opPageDistinctUntilChanged = distinctUntilChanged(pageEquals);

/**
 * Like {@link distinctUntilChanged} using {@link pageArrayEquals}
 *
 * @param src - source sequence
 * @returns target sequence without consecutive duplicates
 */
export const opPageArrayDistinctUntilChanged: MonoTypeOperatorFunction<DeliveryContentItem[]> = distinctUntilChanged(
  pageArrayEquals
);

/**
 * Shares and replays only the latest emission
 *
 * @param src - source sequence
 * @returns same sequence with last element shared
 */
export const opShareLast: <T>(
  src: Observable<T>
) => Observable<T> = shareReplay(1);

/**
 * Makes sure the sequence does not have nils
 *
 * @param src - source sequence
 * @returns sequence without nils
 */
export const opFilterNotNil: <T>(
  src: Observable<T>
) => Observable<NonNullable<T>> = filter(isNotNil) as any;

/**
 * @deprecated use {@link opFilterString} instead
 */
export const filterString: Generator<MonoTypeOperatorFunction<
  string
>> = partialLeft(filter, isString) as any;
/**
 * @deprecated use {@link opFilterBoolean} instead
 */
export const filterBoolean: Generator<MonoTypeOperatorFunction<
  boolean
>> = partialLeft(filter, isBoolean) as any;

/**
 * @deprecated use {@link opFilterNumber} instead
 */
export const filterNumber: Generator<MonoTypeOperatorFunction<
  number
>> = partialLeft(filter, isNumber) as any;

/**
 * @deprecated use {@link opFilterObject} instead
 */
export const filterObject: Generator<MonoTypeOperatorFunction<
  object
>> = partialLeft(filter, isPlainObject) as any;
/**
 * Returns an operator function that filters array of a particular type
 *
 * @param pred - the predicate to test the elements of the array
 * @returns the operator function
 */
export const filterArrayOf: <T>(
  pred: IsPredicate<T>
) => OperatorFunction<any, T[]> = compose(
  partialFirst<any, any, any>(partialSecond, isArrayOf),
  filter
) as any;

/**
 * Filters strings
 *
 * @param source - any sequence
 * @returns the sequence of strings
 */
export const opFilterString: OperatorFunction<any, string> = filter(isString);
/**
 * Filters booleans
 *
 * @param source - any sequence
 * @returns the sequence of booleans
 */
export const opFilterBoolean: OperatorFunction<any, boolean> = filter(
  isBoolean
);
/**
 * Filters number
 *
 * @param source - any sequence
 * @returns the sequence of numbers
 */
export const opFilterNumber: OperatorFunction<any, number> = filter(isNumber);
/**
 * Filters plain objects
 *
 * @param source - any sequence
 * @returns the sequence of objects
 */
export const opFilterObject: OperatorFunction<any, object> = filter(
  isPlainObject
);

/**
 * Extracts the origin of the API URL from the rendering context
 *
 * @deprecated use {@link opPluckApiOrigin} instead
 */
export const pluckApiOrigin: Generator<OperatorFunction<
  RenderingContextV2,
  string
>> = partialLeft(pluck, '$context', 'hub', 'apiUrl', 'origin') as any;

/**
 * Extracts the origin of the API URL from the rendering context
 *
 * @param source - rendering context to pluck from
 * @returns the API URL
 */
export const opPluckApiOrigin: OperatorFunction<
  RenderingContextV2,
  string
> = pluck('$context', 'hub', 'apiUrl', 'origin');

/**
 * Extracts the origin of the Resource URL from the rendering context
 *
 * @deprecated use {@link opPluckResourceOrigin} instead
 */
export const pluckResourceOrigin: Generator<OperatorFunction<
  RenderingContextV2,
  string
>> = partialLeft(pluck, '$context', 'hub', 'resourceUrl', 'origin') as any;

/**
 * Extracts the origin of the Resource URL from the rendering context
 *
 * @param source - rendering context to pluck from
 * @returns the resource URL
 */
export const opPluckResourceOrigin: OperatorFunction<
  RenderingContextV2,
  string
> = pluck('$context', 'hub', 'resourceUrl', 'origin');

/**
 * @deprecated use {@link opPluckCurrentPage} instead
 */
export const pluckCurrentPage: Generator<OperatorFunction<
  RenderingContextV2,
  DeliveryContentItem
>> = partialLeft(map, pageFromRenderingContext) as any;

/**
 * Operator to pluck the current page
 *
 * @param source - rendering context to pluck from
 * @returns the plucked page
 */
export const opPluckCurrentPage: OperatorFunction<
  RenderingContextV2,
  DeliveryContentItem
> = map(pageFromRenderingContext);

/**
 * Converts the levels to a valid number value
 */
export const opLevels: OperatorFunction<
  string | number | null | undefined,
  number
> = map<string | number | null | undefined, number>(
  partialSecond(toInteger, DEFAULT_FETCH_LEVELS)
);

/**
 * Operator to box the layout mode
 */
export const opBoxLayoutMode: OperatorFunction<string, string> = map<
  string,
  string
>(wchBoxLayoutMode);

/**
 * Parses a string into a JSON object
 *
 * @param src - the source sequence
 * @returns the result sequence
 */
export const opJsonParse: <T>(src: Observable<string>) => Observable<T> = map(
  jsonParse
) as any;

/**
 * Parses a string into a JSON object
 *
 * @param src - the source sequence
 * @returns the result sequence
 */
export const opJsonStringify: OperatorFunction<any, string> = map(
  jsonStringify
);

/**
 * Negates a boolean
 *
 * @param src - the source sequence
 * @returns the result sequence
 */
export const opNot: MonoTypeOperatorFunction<boolean> = map(
  (bFlag: boolean) => !bFlag
);

/**
 * Only returns objects of a particular type
 *
 * @param aPredicate - the type predicate
 * @returns the filter operator
 */
export const filterTypeOf: <T>(
  aPredicate: IsPredicate<T>
) => OperatorFunction<any, T> = compose<
  IsPredicate<any>,
  any,
  MonoTypeOperatorFunction<any>
>(filter, unary);

/**
 * Returns the object if it is of a particular type, else undefined
 *
 * @param aPredicate - the type predicate
 * @returns the map operator
 */
export const mapTypeOf: <T>(
  aPredicate: IsPredicate<T>
) => OperatorFunction<any, T> = (aPredicate) =>
  map(ternary(aPredicate, identity, GEN_UNDEFINED));

/**
 * Operator that returns the default sequence for each nil value of the source sequence
 *
 * @param aDefault - the default sequence
 * @returns the operator
 */
export const switchMapDefault: <T>(
  aDefault: Observable<T>
) => MonoTypeOperatorFunction<T> = <T>(aDefault: Observable<T>) =>
  switchMap(ternary<T, Observable<T>>(isNotNil, of, constGenerator(aDefault)));

/**
 * Operator that returns the default value for each nil value of the source sequence
 *
 * @param aDefault - the default value
 * @returns the operator
 */
export const mapDefault: <T>(aDefault: T) => MonoTypeOperatorFunction<T> = <T>(
  aDefault: T
) => map<T, T>(ternary<T, T>(isNotNil, identity, constGenerator(aDefault)));

/**
 * Operator representing false
 *
 * @deprecated use {@link FALSE$} instead
 */
export const opFalse = of(false);

/**
 * Operator representing true
 *
 * @deprecated use {@link TRUE$} instead
 */
export const opTrue = of(true);

/**
 * Operator to pluck a distinct page
 */
export const opPluckDistinctPage: OperatorFunction<
  RenderingContextV2,
  DeliveryContentItem
> = pipe(opPluckCurrentPage, opPageDistinctUntilChanged);

/**
 * Filter that will completely ignore all events
 */
export const opFilterNever: OperatorFunction<any, never> = filter<any, never>(
  isNever
);

/**
 * Operator to pluck a certain path
 *
 * @param path - the path
 * @param def - default value
 *
 * @returns the operator
 */
export const rxPluckPath: <T>(
  aPath: string[],
  aDefault?: T
) => OperatorFunction<any, T> = (path, def) => map(pluckPath(path, def));

/**
 * Operator that caches the result of a previous operator and
 * monitors the result for changes
 *
 * @param opFct - the operator function to dispatch to
 * @param cmp - optional comparator to compare the results
 * @param scheduler - optional scheduler
 *
 * @returns the memoized function
 */
export const rxMemoize = <T, R>(
  opFct: OperatorFunction<T, R>,
  cmp?: EqualsPredicate<R>,
  scheduler?: SchedulerLike
) => pipe(opFct, cacheLast<R>(cmp, scheduler));

/**
 * Memoized selector for a particular property
 *
 * @param aKey - the key to select
 * @param aCmp - optional comparator to compare the results
 *
 * @returns an operator function that performs a memoized selection
 */
export const rxSelectProperty: <T, K extends keyof T>(
  aKey: K,
  aDefault?: Maybe<T[K]>,
  aCmp?: EqualsPredicate<T[K]>,
  aScheduler?: SchedulerLike
) => OperatorFunction<T, T[K]> = (aKey, aDefault, aCmp, aScheduler) =>
  rxMemoize(map(pluckProperty(aKey, aDefault)), aCmp, aScheduler);

/**
 * Memoized selector for a particular path
 *
 * @param aPath - the path to select
 * @param aDefault - default value
 * @param aCmp - optional comparator to compare the results
 *
 * @returns an operator function that performs a memoized selection
 */
export const rxSelectPath: <T, R>(
  aPath: string | string[],
  aDefault?: Maybe<R>,
  aCmp?: EqualsPredicate<R>,
  aScheduler?: SchedulerLike
) => OperatorFunction<T, R> = (aPath, aDefault, aCmp, aScheduler) =>
  rxMemoize(
    map(pluckPath(isString(aPath) ? parsePath(aPath) : aPath, aDefault)),
    aCmp,
    aScheduler
  );

/**
 * Implements a lower order operator that checks a value for nil before
 * passing it to a delegate function
 *
 * @param aDelegate - the delegate function
 * @param aOp - the actual operator function to apply
 *
 * @returns the safe operator function
 */
export const safeLowerOrder: <T, R>(
  aDelegate: UnaryFunction<T, R>,
  aOp: UnaryFunction<UnaryFunction<T, R>, OperatorFunction<T, R>>
) => OperatorFunction<T, R> = (aDelegate, aOp) =>
  aOp(ternary(isNotNil, aDelegate, GEN_UNDEFINED));

/**
 * Implements a lower order operator that checks a value for nil before
 * passing it to a delegate function
 *
 * @param aDelegate - the delegate function
 * @param aOp - the actual operator function to apply
 *
 * @returns the safe operator function
 */
export const safeMap: <T, R>(
  aDelegate: UnaryFunction<T, R>
) => OperatorFunction<T, R> = partialSecond<any, any, any>(safeLowerOrder, map);

/**
 * Implements a higher order operator that checks a value for nil before
 * passing it to a delegate function
 *
 * @param aDelegate - the delegate function
 * @param aOp - the actual operator function to apply
 *
 * @returns the safe operator function
 */
export const safeHigherOrder: <T, R>(
  aDelegate: UnaryFunction<T, ObservableInput<R>>,
  aOp: UnaryFunction<
    UnaryFunction<T, ObservableInput<R>>,
    OperatorFunction<T, R>
  >
) => OperatorFunction<T, R> = (aDelegate, aOp) =>
  aOp(ternary(isNotNil, aDelegate, GEN_UNDEFINED$));

export const safeSwitchMap: <T, R>(
  aDelegate: UnaryFunction<T, ObservableInput<R>>
) => OperatorFunction<T, R> = partialSecond<any, any, any>(
  safeHigherOrder,
  switchMap
);

export const safeMergeMap: <T, R>(
  aDelegate: UnaryFunction<T, ObservableInput<R>>
) => OperatorFunction<T, R> = partialSecond<any, any, any>(
  safeHigherOrder,
  mergeMap
);

/**
 * Implementation of the operator function
 */
function internalCacheLast<T>(
  aSrc$: Observable<T>,
  aShare: MonoTypeOperatorFunction<T>,
  aDistinct: MonoTypeOperatorFunction<T>,
  aOf: UnaryFunction<T, Observable<T>>,
  aConcat: BiFunction<Observable<T>, Observable<T>, Observable<T>>
): Observable<T> {
  // check if we have a value
  let cachedValue: T;
  let hasValue = false;
  // observable that monitors the last value
  const monitor$ = rxPipe(
    aSrc$,
    tap((value) => {
      hasValue = true;
      cachedValue = value;
    })
  );
  // the shared sequence
  const shared$ = rxPipe(monitor$, aShare);
  // the initial value
  const initial$ = defer(() => (hasValue ? aOf(cachedValue) : EMPTY));
  // shared with optional initial value
  return rxPipe(aConcat(initial$, shared$), aDistinct);
}

/**
 * Returns the `shareReplay` operator with a buffer of `1` and `refCount: true`
 *
 * @param scheduler - optional scheduler
 * @returns the operator
 */
export const replayLast = <T>(
  scheduler?: SchedulerLike
): MonoTypeOperatorFunction<T> =>
  shareReplay<T>(
    scheduler
      ? { bufferSize: 1, refCount: true, scheduler }
      : { bufferSize: 1, refCount: true }
  );

/**
 * Convenience operator for `replayLast()`
 */
export const opReplayLast: <T>(
  src: Observable<T>
) => Observable<T> = replayLast();

/**
 * Operator that will replay the last value of a sequence to potentially many subscribers. The following assertions
 * hold true:
 *
 * - there will be no identical subsequent values
 * - there will be at most one subscription to the original sequence
 * - if there are no more subscriptions to the resulting observable (refcount falls to zero), the operator unsubscribes from the source
 * - if the original sequence has produced at least one value, this value will be the starting
 *
 * This operator differs from `shareReplay(1)` in the following way (in addition to ensuring a unique sequence):
 * - if the source observable is hot, then `shareReplay(1)` will never unsubscribe even if its subscriptions fall to zero. `cacheLast` will unsubscribe
 * - if the source observable is cold but still producing values when subscriptions fall to zero, then `shareReplay(1)` will not unsubscribe and will not cancel the sequence. `cacheLast` will unsubscribe and cancel the sequence.
 *
 * This operator differs from `shareReplay({bufferSize: 1, refCount: true})` in the following way (in addition to ensuring a unique sequence):
 * - if subscriptions fall to zero, then with `shareReplay` the first value that
 *   subsequent subscriptions will get is the first value of a new subscription to the source sequence. With `cacheLast` the first value will
 *   be the last value of the previous subscription.
 *
 * @param aEqualFunction - compares the subsequent value
 * @param scheduler - optional scheduler
 *
 * @returns the cached operator
 */
export function cacheLast<T>(
  aEqualFunction: EqualsPredicate<T> = isEqual,
  scheduler?: SchedulerLike
): MonoTypeOperatorFunction<T> {
  // config with scheduler
  const [opOf, opConcat] = scheduler
    ? [
        (aValue) => of<T>(aValue, scheduler),
        (aLeft, aRight) => concat<T>(aLeft, aRight, scheduler)
      ]
    : [of, concat];
  // the operators
  const opDistinct = distinctUntilChanged<T>(aEqualFunction);
  const opShareReplay = replayLast<T>(scheduler);
  // returns the operator
  return (aSrc$) =>
    internalCacheLast(aSrc$, opShareReplay, opDistinct, opOf, opConcat);
}

/**
 * Convenience operator for `cacheLast()`
 */
export const opCacheLast: <T>(
  src: Observable<T>
) => Observable<T> = cacheLast();

const IDLE = Symbol();
declare type IdleType = typeof IDLE;

declare type BackpressureState<T, R> = T[] | Observable<R>;

function isIdle(aValue: any): aValue is IdleType {
  return isEqual(aValue, IDLE);
}

// array test
function isBuffer<T>(aValue: any): aValue is T[] {
  return isArray(aValue);
}
// observable test
function isBusy<R>(aValue: any): aValue is Observable<R> {
  return isObservable(aValue);
}

/**
 * Implementation of a backpressure operator. The operator will combine source items
 * into chunks and produces a result observable per chunk. It will buffer source
 * items as long as the observable of the last chunk has not finished, yet.
 *
 * @param aDelegate - delegate function to produce the result based on a chunk
 * @returns an operator function that transforms a source sequence into a target sequence
 */
export function rxBackpressure<T, R>(
  aDelegate: UnaryFunction<T[], Observable<R>>
): OperatorFunction<T, R> {
  // type safe helper
  const NOTHING: BackpressureState<T, R> = undefined;

  return (src$: Observable<T>) =>
    defer(() => {
      /**
       * Flag to check if the source sequence is done. We need this to potentially flush the
       * final buffer.
       */
      let bDone = false;
      /**
       * Source sequence setting the done flag when it completes
       */
      const obj$ = rxPipe(
        src$,
        finalize(() => (bDone = true))
      );
      /**
       * Triggers when the generated downstream sequence has terminated
       */
      const idle$ = new Subject<IdleType>();
      // trigger callback
      const opFinal = finalize<R>(() => idle$.next(IDLE));
      // handle buffering
      return rxPipe(
        /**
         * We merge the original events and the events that tell about downstream readiness
         */
        merge(obj$, idle$),
        /**
         * The accumulator is either `undefined`, a (non-empty) buffer or an Observable<R>
         *
         * - if `undefined` the downstreams is idle and we do not have a buffer, yet
         * - if a buffer, downstream is busy and we already have a buffered item
         * - if an observable, downstream is busy but there is no buffered item, yet
         */
        scan(
          (acc: BackpressureState<T, R>, obj: T | IdleType) =>
            /**
             * The idle event indicates that downstream had been busy but is idle, now
             */
            isIdle(obj)
              ? /**
                 * if there is data in the buffer, process downstream and reset the buffer
                 */
                isBuffer<T>(acc)
                ? // process the next chunk of data
                  aDelegate(acc)
                : bDone
                ? // nothing to process, but source is done. Also complete the backpressure stream
                  idle$.complete()
                : // nothing to process, downstream is idle, wait for the next regular event
                  NOTHING
              : // we have a buffer, append to it
              isBuffer<T>(acc)
              ? // downstream is busy, buffer the item
                arrayPush(obj, acc)
              : // we have a running observable, start a new buffer
              isNotNil(acc)
              ? // downstream is busy, start buffering
                [obj]
              : // downstream is idle
                aDelegate([obj]),
          NOTHING
        ),
        // only continue if we have new work
        filterTypeOf<Observable<R>>(isBusy),
        // append the resulting items and make sure we get notified about the readiness
        concatMap((res$) => rxPipe(res$, opFinal))
      );
    });
}
