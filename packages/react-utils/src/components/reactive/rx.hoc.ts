import {
  assignObject,
  bindMember,
  createConsumerOnSubject,
  createSingleSubject,
  rxPipe
} from '@acoustic-content-sdk/utils';
import {
  Component,
  ComponentClass,
  createElement,
  FunctionComponent,
  PropsWithChildren
} from 'react';
import {
  BehaviorSubject,
  combineLatest,
  merge,
  Observable,
  UnaryFunction
} from 'rxjs';
import {
  distinctUntilChanged,
  map,
  retryWhen,
  share,
  takeUntil
} from 'rxjs/operators';

/**
 * Extension of an Observable that allows to access the current value. This
 * is compatible to BehaviorSubject
 */
export interface ValueObservable<T> extends Observable<T> {
  /**
   * Accesses the current value of the observable
   */
  readonly value: T;
}

export type StateFunction<P, S> = (
  props$: ValueObservable<Readonly<PropsWithChildren<P>>>,
  init$: Observable<undefined>,
  done$: Observable<undefined>
) => Observable<Readonly<S>>;

export type DelegateComponent<S, DS = any> =
  | FunctionComponent<S>
  | ComponentClass<S, DS>;

/**
 * Constructs the state transform
 *
 * @param init$   - init life cycle
 * @param done$   - done life cycle
 * @param nextErrors - error handler
 * @param cmp - the component
 *
 * @returns the state operator function
 */
function opState<P, S>(
  state$: Observable<S>,
  init$: Observable<any>,
  done$: Observable<any>,
  nextErrors: UnaryFunction<any, void>,
  cmp: Component<P, S>
): Observable<any> {
  // use state both for the initial value as well as for updates
  const shared$ = rxPipe(state$, share(), distinctUntilChanged());
  // initial
  const initial$ = rxPipe(
    shared$,
    map((state) => (cmp.state = state)),
    takeUntil(init$)
  );
  // update
  const current$ = rxPipe(
    combineLatest([shared$, init$]),
    map(([state]) => cmp.setState(state)),
    retryWhen(map(nextErrors))
  );
  /**
   * Merge and make sure we end the subscription when the
   * subscription closes
   */
  return rxPipe(merge(initial$, current$), takeUntil(done$));
}

function initComponent<P, S, DS>(
  aStateFct: StateFunction<P, S>,
  aDelegate: DelegateComponent<S, DS>,
  aInitial: Readonly<P>,
  aCmp: Component<P, S>
): Observable<any> {
  // construct our subjects
  const init$ = createSingleSubject<undefined>();
  const done$ = createSingleSubject<undefined>();
  const errors$ = createSingleSubject<any>();
  const props = new BehaviorSubject<Readonly<P>>(aInitial);
  // make the internals accessible to subclasses
  const props$: ValueObservable<Readonly<P>> = rxPipe(
    props,
    distinctUntilChanged()
  ) as any;
  // attach the getter
  Object.defineProperty(props$, 'value', {
    get: bindMember(props, 'getValue')
  });
  // attach the bound callbacks
  const nextErrors = createConsumerOnSubject(errors$);
  // functions
  const shouldComponentUpdate = (
    aNextProps: Readonly<P>,
    aNextState: Readonly<S>
  ) => {
    /**
     * dispatch the new props
     */
    props.next(aNextProps);
    /** We assume that the rendering only depends on the state
     * and that state changes will lead to a new state object and will
     * not mutate the existing state.
     */
    return aCmp.state !== aNextState;
  };

  const componentDidMount = createConsumerOnSubject(init$);

  const componentWillUnmount = createConsumerOnSubject(done$);

  const componentDidCatch = nextErrors;

  const render = () => {
    const {
      state,
      props: { children }
    } = aCmp;
    return state ? createElement(aDelegate, state, children) : null;
  };

  // attach
  assignObject(aCmp, {
    shouldComponentUpdate,
    componentDidMount,
    componentWillUnmount,
    componentDidCatch,
    render
  });

  // connect state
  return opState(
    aStateFct(props$, init$, done$),
    init$,
    done$,
    nextErrors,
    aCmp
  );
}

export function rxComponent<P, S, DS = any>(
  aStateFct: StateFunction<P, S>,
  aDelegate: DelegateComponent<S, DS>
): ComponentClass<P, S> {
  return class extends Component<P, S> {
    /**
     * Initialize our new component
     *
     * @param aInitial - the initial props
     */
    constructor(aInitial: Readonly<P>) {
      super(aInitial);
      // initialize
      initComponent(aStateFct, aDelegate, aInitial, this).subscribe();
    }
  };
}
