import {
  BehaviorSubject,
  defer,
  EMPTY,
  InteropObservable,
  merge,
  MonoTypeOperatorFunction,
  never,
  Observable,
  observable,
  Observer,
  of,
  OperatorFunction,
  ReplaySubject,
  SchedulerAction,
  SchedulerLike,
  Subject,
  Subscribable,
  Subscription,
  Unsubscribable
} from 'rxjs';
import { finalize, map, share, take, takeUntil } from 'rxjs/operators';
import { forEach, partialSecond, reduceArray, UNDEFINED } from '../js/js.core';
import { assignObject, bindMember } from '../js/js.utils';
import { Consumer } from './../consumers/consumer';
import {
  constGenerator,
  fromGeneratorOrT,
  Generator,
  GeneratorOrT
} from './../generators/generator';
import { cancelExecuteLater, executeLater } from './../idle/idle';
import { JSONValue } from './../json/json.utils';
import { isNotNil, isObservable } from './../predicates/predicates';

/* Copyright IBM Corp. 2018 */
/**
 * Binds to the next function of a subject
 *
 * @param aSubject - the subject that handles the events
 *
 * @returns the binding function
 */
export const createConsumerOnSubject: <T>(
  aSubject: Subject<T> | Observer<T>
) => Consumer<T> = partialSecond(bindMember, 'next');

/**
 * Constructs a setter description
 *
 * @param aSubject - the subject that handles the setter events
 * @returns the description of the setter
 */
function _createSetter<T>(aSubject: Subject<T>): PropertyDescriptor {
  // the descriptor
  return {
    set: createConsumerOnSubject(aSubject),
    enumerable: true
  };
}

/**
 * Constructs a getter description
 *
 * @param aObservable - the observable that handles the getter events
 * @param aInitial - a potential initial value
 * @returns the description of the getter
 */
function _createGetter<T>(
  aObservable: Observable<T>,
  aInitial?: T
): PropertyDescriptor {
  // cache the value
  const value: BehaviorSubject<T> = new BehaviorSubject<T>(aInitial);
  // subscribe
  aObservable.subscribe(value);
  // the descriptor
  return {
    get: bindMember(value, 'getValue'),
    enumerable: true
  };
}

class IdleFrameAction<T> extends Subscription implements SchedulerAction<T> {
  constructor(
    protected scheduler: IdleFrameScheduler,
    protected work: (this: IdleFrameAction<T>, state?: T) => void
  ) {
    super();
  }

  schedule(state?: T, delay?: number): Subscription {
    const handle = executeLater(() => this.work(state));
    return this.add(() => cancelExecuteLater(handle));
  }
}

class IdleFrameScheduler implements SchedulerLike {
  now(): number {
    return Date.now();
  }

  schedule<T>(
    work: (this: SchedulerAction<T>, state?: T) => void,
    delay?: number,
    state?: T
  ): Subscription {
    return new IdleFrameAction(this, work).schedule(state, delay);
  }
}

const idleFrameScheduler: SchedulerLike = new IdleFrameScheduler();

/**
 * Combines two observables such that the events on the first one are used until the second
 * one starts to produce an event. From then on only the events on the second one
 * will be used and the first one canceled.
 *
 * @param aFirst - the first observable
 * @param aNext - the next one
 * @returns the combined observable
 */
export function thisThenThat<T>(
  aFirst: Observable<T>,
  aNext: Observable<T>
): Observable<T> {
  // share this one
  const next$ = rxPipe(aNext, share<T>());

  /**
   * Either we get at least one event from the next observable or we
   * never stop, because if we stopped for an empty next sequence, the takeUntil operator
   * would cancel the operation.
   */
  const stop$ = rxPipe(merge(next$, never()), take<T>(1));

  // produce events from the first observable until we get the stop event
  const first$ = rxPipe(aFirst, takeUntil<T>(stop$));

  // connect
  return merge(first$, next$);
}

/**
 * Combines two observables such that the events on the first one are used until the second
 * one starts to produce an event. From then on only the events on the second one
 * will be used and the first one canceled.
 *
 * @param aObservables - the observables to combine
 * @returns the combined observable
 */
export const thisThenThats = <T>(
  ...aObservables: Array<Observable<T>>
): Observable<T> => reduceArray(aObservables, thisThenThat as any, EMPTY);

/**
 * Constructs a singe replay subject
 *
 * @returns the subject
 */
export const createSingleSubject = <T>(): ReplaySubject<T> =>
  new ReplaySubject<T>(1);

/**
 * Creates an observable that exposes the result of the function
 * call if the result is defined. Otherwise this is an empty sequence.
 *
 * @param aGenerator - the generator function
 * @returns observable of the result
 */
function _generateItem<T>(aGenerator: Generator<T>): Observable<T> {
  // dispatch
  return defer(() => of(aGenerator()));
}

/**
 * The empty observable instance, we can reuse the same
 */
export const EMPTY_STRING_OBSERVABLE: Observable<string> = EMPTY;

/**
 * The empty observable instance, we can reuse the same
 */
export const EMPTY_JSON_OBSERVABLE: Observable<JSONValue> = EMPTY;

/** Unsubscribes if the subscription exists.
 *
 * @param aSubscription - the subscription
 */
export const safeUnsubscribe = (
  aSubscription: Unsubscribable | null | undefined
) => {
  // unsubscribe
  if (isNotNil(aSubscription)) {
    aSubscription.unsubscribe();
  }
};

/** Unsubscribes if the subscription exists.
 *
 * @param aSubscriptions - the subscriptions
 */
export const safeUnsubscribeAll = (
  aSubscriptions:
    | ArrayLike<Unsubscribable | null | undefined>
    | null
    | undefined
) => forEach(aSubscriptions, safeUnsubscribe);

export interface RxPipe {
  <T1, T2>(aSrc: Observable<T1>, aOp1: OperatorFunction<T1, T2>): Observable<
    T2
  >;
  <T1, T2, T3>(
    aSrc: Observable<T1>,
    aOp1: OperatorFunction<T1, T2>,
    aOp2: OperatorFunction<T2, T3>
  ): Observable<T3>;
  <T1, T2, T3, T4>(
    aSrc: Observable<T1>,
    aOp1: OperatorFunction<T1, T2>,
    aOp2: OperatorFunction<T2, T3>,
    aOp3: OperatorFunction<T3, T4>
  ): Observable<T4>;
  <T1, T2, T3, T4, T5>(
    aSrc: Observable<T1>,
    aOp1: OperatorFunction<T1, T2>,
    aOp2: OperatorFunction<T2, T3>,
    aOp3: OperatorFunction<T3, T4>,
    aOp4: OperatorFunction<T4, T5>
  ): Observable<T5>;
  <T1, T2, T3, T4, T5, T6>(
    aSrc: Observable<T1>,
    aOp1: OperatorFunction<T1, T2>,
    aOp2: OperatorFunction<T2, T3>,
    aOp3: OperatorFunction<T3, T4>,
    aOp4: OperatorFunction<T4, T5>,
    aOp5: OperatorFunction<T5, T6>
  ): Observable<T6>;
  <T1, T2, T3, T4, T5, T6, T7>(
    aSrc: Observable<T1>,
    aOp1: OperatorFunction<T1, T2>,
    aOp2: OperatorFunction<T2, T3>,
    aOp3: OperatorFunction<T3, T4>,
    aOp4: OperatorFunction<T4, T5>,
    aOp5: OperatorFunction<T5, T6>,
    aOp6: OperatorFunction<T6, T7>
  ): Observable<T7>;
  <T1, T2, T3, T4, T5, T6, T7, T8>(
    aSrc: Observable<T1>,
    aOp1: OperatorFunction<T1, T2>,
    aOp2: OperatorFunction<T2, T3>,
    aOp3: OperatorFunction<T3, T4>,
    aOp4: OperatorFunction<T4, T5>,
    aOp5: OperatorFunction<T5, T6>,
    aOp6: OperatorFunction<T6, T7>,
    aOp7: OperatorFunction<T7, T8>
  ): Observable<T8>;
  <T, R>(
    aSrc: Observable<T>,
    ...operations: Array<OperatorFunction<any, any>>
  ): Observable<R>;
}

export interface RxCompose {
  <T1, T2>(aOp1: OperatorFunction<T1, T2>): OperatorFunction<T1, T2>;
  <T1, T2, T3>(
    aOp1: OperatorFunction<T1, T2>,
    aOp2: OperatorFunction<T2, T3>
  ): OperatorFunction<T1, T3>;
  <T1, T2, T3, T4>(
    aOp1: OperatorFunction<T1, T2>,
    aOp2: OperatorFunction<T2, T3>,
    aOp3: OperatorFunction<T3, T4>
  ): OperatorFunction<T1, T4>;
  <T1, T2, T3, T4, T5>(
    aOp1: OperatorFunction<T1, T2>,
    aOp2: OperatorFunction<T2, T3>,
    aOp3: OperatorFunction<T3, T4>,
    aOp4: OperatorFunction<T4, T5>
  ): OperatorFunction<T1, T5>;
  <T1, T2, T3, T4, T5, T6>(
    aOp1: OperatorFunction<T1, T2>,
    aOp2: OperatorFunction<T2, T3>,
    aOp3: OperatorFunction<T3, T4>,
    aOp4: OperatorFunction<T4, T5>,
    aOp5: OperatorFunction<T5, T6>
  ): OperatorFunction<T1, T6>;
  <T1, T2, T3, T4, T5, T6, T7>(
    aOp1: OperatorFunction<T1, T2>,
    aOp2: OperatorFunction<T2, T3>,
    aOp3: OperatorFunction<T3, T4>,
    aOp4: OperatorFunction<T4, T5>,
    aOp5: OperatorFunction<T5, T6>,
    aOp6: OperatorFunction<T6, T7>
  ): OperatorFunction<T1, T7>;
  <T1, T2, T3, T4, T5, T6, T7, T8>(
    aOp1: OperatorFunction<T1, T2>,
    aOp2: OperatorFunction<T2, T3>,
    aOp3: OperatorFunction<T3, T4>,
    aOp4: OperatorFunction<T4, T5>,
    aOp5: OperatorFunction<T5, T6>,
    aOp6: OperatorFunction<T6, T7>,
    aOp7: OperatorFunction<T7, T8>
  ): OperatorFunction<T1, T8>;
  <T, R>(...operations: Array<OperatorFunction<any, any>>): OperatorFunction<
    T,
    R
  >;
}

const _slice = Array.prototype.slice;

function __pipe() {
  const a = arguments;
  const th = a[0];
  return th.pipe.apply(th, _slice.call(a, 1));
}

/**
 * Function that pipes the arguments to the stream passed as the first argument
 */
export const rxPipe: RxPipe = __pipe as any;

function __compose() {
  const a = arguments;
  return (src: any) => src.pipe.apply(src, a);
}

/**
 * @deprecated use `pipe` instead
 */
export const rxCompose: RxCompose = __compose as any;

export type ObservableOrT<T> = GeneratorOrT<T> | Observable<GeneratorOrT<T>>;

/**
 * Converts the generic type into an observable of the desired type
 *
 * @param aValue - the generic type
 * @returns observable of the desired type
 */
export function fromObservableOrT<T>(aValue: ObservableOrT<T>): Observable<T> {
  // make sure we have an observable
  return rxPipe(
    isObservable(aValue) ? aValue : of(aValue),
    map(fromGeneratorOrT)
  );
}

/**
 * Operator representing false
 */
export const FALSE$ = of(false);

/**
 * Operator representing true
 */
export const TRUE$ = of(true);

/**
 * Operator representing undefined
 */
export const UNDEFINED$ = of(UNDEFINED);

export const GEN_UNDEFINED$ = constGenerator(UNDEFINED$);

/**
 * Operator representing undefined
 */
export const NULL$ = of(null);

/**
 * Returns an operator that invokes a callback with the subscription count
 *
 * @param aCallback - the callback
 * @returns the operator
 */
export function rxWithSubscriptionCount<T>(
  aCallback: Consumer<number>
): MonoTypeOperatorFunction<T> {
  // subscription count
  let subCount = 0;
  // returns the actual operator
  return (aSrc$) =>
    defer(() => {
      aCallback(++subCount);
      return rxPipe(
        aSrc$,
        finalize(() => aCallback(--subCount))
      );
    });
}

export interface ObserverConsumer<T> extends Observer<T> {
  (aValue: T): void;
}

export const createObserverConsumer = <T>(
  aSubject: Observer<T>
): ObserverConsumer<T> => {
  // hook the methods
  const next = (aValue: T) => aSubject.next(aValue);
  const error = (err: any) => aSubject.error(err);
  const complete = () => aSubject.complete();
  // returns the consumer
  return assignObject(next, { next, error, complete });
};

/**
 * Constructs an adaptor around an existing observable. This helps for
 * cross frame access to observables.
 */
export const createObservableAdaptor = <T>(
  aSrc: Subscribable<T>
): InteropObservable<T> => ({ [observable]: constGenerator(aSrc) } as any);

export {
  _createSetter as createSetterOnSubject,
  _createGetter as createGetterOnObservable,
  _generateItem as generateItem,
  idleFrameScheduler
};
