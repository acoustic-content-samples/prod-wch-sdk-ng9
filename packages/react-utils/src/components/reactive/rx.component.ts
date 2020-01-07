import {
  Consumer,
  createConsumerOnSubject,
  createSingleSubject,
  opDistinctUntilChanged,
  opShareLast,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { ErrorInfo, PureComponent } from 'react';
import {
  BehaviorSubject,
  combineLatest,
  merge,
  Observable,
  OperatorFunction,
  Subject,
  Subscription
} from 'rxjs';
import { map, retryWhen, takeUntil } from 'rxjs/operators';

/**
 * Converts a subject to an observable
 *
 * @param subject  - the subject
 * @returns the observable
 */
const asObservable: <T>(aSubject: Subject<T>) => Observable<T> = (subject) =>
  subject.asObservable();

/**
 * Our private symbols
 */
const symNextProp = Symbol();
const symNextInit = Symbol();
const symNextDone = Symbol();
const symNextErrors = Symbol();
const symOpState = Symbol();

/**
 * Base class for react components that compute their state via reactive streams. The life cycle methods are available
 * via observables that fire at the appropriate time.
 *
 * In the constructor of the subclass call the {@link AbstractRxComponent.connectState | connectState} with on observable that will compute
 * the component state based on arbitrary information.
 *
 * Methods overridden: {@link AbstractRxComponent.componentDidMount | componentDidMount}, {@link AbstractRxComponent.componentWillUnmount | componentWillUnmount}, {@link AbstractRxComponent.componentDidUpdate | componentDidUpdate}
 */
export abstract class AbstractRxComponent<
  P = {},
  S = {},
  SS = any
> extends PureComponent<P, S, SS> {
  /**
   * Emits when the component produces an error
   */
  protected readonly errors$: Observable<any>;

  /**
   * Emits when the component initializes
   *
   * {@link AbstractRxComponent.componentDidMount | componentDidMount}
   */
  protected readonly init$: Observable<any>;

  /**
   * Emits when the component shuts down
   *
   * {@link AbstractRxComponent.componentWillUnmount | componentWillUnmount}
   */
  protected readonly done$: Observable<any>;

  /**
   * Emits when the component receives new properties or initially with the current properties
   *
   * {@link AbstractRxComponent.componentDidUpdate | componentDidUpdate}
   */
  protected readonly props$: Observable<Readonly<P>>;

  // hidden state
  private readonly [symNextProp]: Consumer<P>;
  private readonly [symNextInit]: Consumer<any>;
  private readonly [symNextDone]: Consumer<any>;
  private readonly [symNextErrors]: Consumer<any>;
  private readonly [symOpState]: OperatorFunction<S, any>;

  /**
   * Initializes the component with a current set of properties
   *
   * @param aInitial - the initial set of properties
   */
  protected constructor(aInitial: Readonly<P>) {
    super(aInitial);
    // construct our subjects
    const init = createSingleSubject();
    const done = createSingleSubject();
    const errors = createSingleSubject();
    const props = new BehaviorSubject<Readonly<P>>(aInitial);
    // make the internals accessible to subclasses
    const init$ = (this.init$ = asObservable(init));
    const done$ = (this.done$ = asObservable(done));
    this.props$ = rxPipe(props, opDistinctUntilChanged);
    this.errors$ = asObservable(errors);
    // attach the bound callbacks
    this[symNextProp] = createConsumerOnSubject(props);
    this[symNextInit] = createConsumerOnSubject(init);
    this[symNextDone] = createConsumerOnSubject(done);
    const nextErrors = (this[symNextErrors] = createConsumerOnSubject(errors));
    // state operator
    this[symOpState] = (state$: Observable<S>) => {
      // use state both for the initial value as well as for updates
      const shared$: Observable<S> = rxPipe(state$, opShareLast);
      // initial
      const initial$ = rxPipe(
        shared$,
        map<S, S>((state) => (this.state = state)),
        takeUntil(init$)
      );
      // update
      const current$ = rxPipe(
        combineLatest([shared$, init$]),
        map(([state]) => this.setState(state)),
        retryWhen(map(nextErrors))
      );
      /**
       * Merge and make sure we end the subscription when the
       * subscription closes
       */
      return rxPipe(merge(initial$, current$), takeUntil(done$));
    };
  }

  /** {@inheritdoc react:PureComponent} */
  componentDidMount() {
    this[symNextInit](true);
  }

  /** {@inheritdoc react:PureComponent} */
  componentWillUnmount() {
    this[symNextDone](true);
  }

  /** {@inheritdoc react:PureComponent} */
  componentDidUpdate(
    prevProps: Readonly<P>,
    prevState: Readonly<S>,
    snapshot?: SS
  ) {
    /**
     * dispatch the current props
     */
    this[symNextProp](this.props);
  }

  /** {@inheritdoc react:PureComponent} */
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    /**
     * dispatch to the error handler
     */
    this[symNextErrors](error);
  }

  /**
   * Connects the state to the lifecycle and subscribes. It is not required - but possible - to unsubscribe,
   * since this will happen in {@link AbstractRxComponent.componentWillUnmount | componentWillUnmount} automatically.
   *
   * @param aState$ - the state of the application
   * @returns a handle that can be used to unsubscribe the connection. This is typically not required since the component unsubscribes when the component unmounts, automatically
   */
  protected connectState(aState$: Observable<S>): Subscription {
    // update the state and subscribe once
    return this[symOpState](aState$).subscribe();
  }
}
