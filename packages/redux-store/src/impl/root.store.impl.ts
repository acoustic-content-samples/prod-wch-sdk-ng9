import { createVersionString, LoggerService } from '@acoustic-content-sdk/api';
import {
  assignObject,
  bindMember,
  constGenerator,
  Consumer,
  EqualsPredicate,
  forEach,
  getProperty,
  isEqual,
  isNil,
  isNotNil,
  NOOP_LOGGER_SERVICE,
  pluckProperty,
  rxMemoize,
  rxNext,
  rxPipe
} from '@acoustic-content-sdk/utils';
import {
  Action,
  AnyAction,
  applyMiddleware,
  combineReducers,
  createStore,
  Dispatch,
  Middleware,
  Reducer,
  Store
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware, Epic } from 'redux-observable';
import {
  merge,
  MonoTypeOperatorFunction,
  noop,
  Observable,
  Observer,
  OperatorFunction,
  queueScheduler,
  Subject,
  UnaryFunction
} from 'rxjs';
import {
  distinct,
  filter,
  map,
  mergeMap,
  observeOn,
  scan,
  shareReplay,
  takeUntil
} from 'rxjs/operators';

import { initFeatureAction, ReduxFeatureModule } from '../store/feature.module';
import { ReduxRootState } from '../store/root.state';
import {
  ReduxRootStore,
  ReduxRootStoreDependencies
} from '../store/root.store';
import { VERSION } from '../version';

/**
 * Exposes the store as an observable
 *
 * @param aStore - the store
 * @returns the store as an observable
 */
export function rxStore<S>(aStore: Store<S>): Observable<S> {
  return new Observable<S>((observer: Observer<S>) => {
    // current state
    observer.next(aStore.getState());
    // initial state
    const done = aStore.subscribe(() => observer.next(aStore.getState()));
    // cleanup
    return () => {
      // done
      done();
      // end the store sequence
      observer.complete();
    };
  });
}

/**
 * Exposes a memoized selector function
 *
 * @param sel - the selector
 *
 * @returns the memoized selector
 */
export const rxSelect: <T, R>(
  aSelector: UnaryFunction<T, R>,
  aCmp?: EqualsPredicate<R>
) => OperatorFunction<T, R> = (sel, cmp = isEqual) => rxMemoize(map(sel), cmp);

/**
 * Binds the dispatch method
 *
 * @param aStore - store to bind to
 * @returns the dispatch method
 */
export const rxDispatch: <S>(aStore: Store<S>) => Consumer<AnyAction> = (
  aStore
) => bindMember(aStore, 'dispatch');

/**
 * ID selector
 */
const selectId = pluckProperty<ReduxFeatureModule<any>, 'id'>('id');

/**
 * Reducer selector
 */
const selectReducer = pluckProperty<ReduxFeatureModule<any>, 'reducer'>(
  'reducer'
);

/**
 * Epic selector
 */
const selectEpic = pluckProperty<ReduxFeatureModule<any>, 'epic'>('epic');

/**
 * Tests if the feature has a reducer
 *
 * @param aModule - the module to check
 * @returns true if the module has a reducer
 */
const hasReducer = (aModule: ReduxFeatureModule<any>): boolean =>
  isNotNil(selectReducer(aModule));

/**
 * Tests if the feature has an epic
 *
 * @param aModule - the module to check
 * @returns true if the module has an epic
 */
const hasEpic = (aModule: ReduxFeatureModule<any>): boolean =>
  isNotNil(selectEpic(aModule));

/**
 * Constructs a new store that can handle feature modules.
 *
 * @param aDependencies - the dependencies that will be injected into the epics
 * @param aPreLoadedState - optionally an initial state object
 *
 * @returns the store. Use the {@link ReduxRootStore.addFeatureModule} method to register a feature module.
 */
export function createReduxRootStore(
  aDependencies: any,
  aPreLoadedState?: ReduxRootState
): ReduxRootStore {
  /**
   * Extract the logger
   */
  const logSvc: LoggerService = getProperty(
    aDependencies,
    'logSvc',
    NOOP_LOGGER_SERVICE
  );

  // access the logger
  const logger = logSvc.get('createReduxRootStore');

  // the rx logger
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);

  // shutdown trigger in case we need it some time
  const done$ = new Subject<void>();

  /**
   * The set of known modules, to avoid cycles and duplicate registration
   */
  const modules: Record<string, ReduxFeatureModule<any>> = {};

  /**
   * Sequence of added modules
   */
  const moduleSubject = new Subject<ReduxFeatureModule<any>>();

  /**
   * Subscribe to the resolved modules
   */
  const module$ = rxPipe(
    moduleSubject,
    distinct(selectId),
    log('module'),
    shareReplay(),
    takeUntil(done$)
  );

  /**
   * Build the reducers
   */
  const reducer$ = rxPipe(
    /**
     * Whenever a new module gets registered
     */
    module$,
    /**
     * Only modules with a reducer
     */
    filter(hasReducer),
    /**
     * Build a map of all registered reducers
     */
    scan(
      (
        all: Record<string, Reducer<ReduxRootState>>,
        aModule: ReduxFeatureModule<any>
      ) => ({
        ...all,
        [selectId(aModule)]: selectReducer(aModule)
      }),
      {}
    ),
    /**
     * Combine all into one
     */
    map(combineReducers)
  );

  /**
   * Build the epics
   */
  const epic$ = rxPipe(
    /**
     * Whenever a new module gets registered
     */
    module$,
    /**
     * Only modules with an epic
     */
    filter(hasEpic),
    /**
     * extract the epic
     */
    map(selectEpic)
  );

  /**
   * Root epic that combines all of the incoming epics
   */
  const rootEpic: Epic = (action$, state$, deps) =>
    rxPipe(
      epic$,
      mergeMap((epic) => epic(action$, state$, deps)),
      takeUntil(done$)
    );

  /**
   * augment the dependencies
   */
  const dependencies = {
    ...aDependencies
  };

  /**
   * Construct the side effects
   */
  const epicMiddleware = createEpicMiddleware({
    dependencies
  });

  const crashReporterMiddleware: Middleware = (aStore) => (next) => (
    action
  ) => {
    try {
      return next(action);
    } catch (err) {
      logger.error('Caught an exception!', err);
      throw err;
    }
  };

  const loggerMiddleware: Middleware = (aStore) => (next) => (action) => {
    logger.info('dispatch action', action);
    const previousState = aStore.getState();
    const result = next(action);
    const nextState = aStore.getState();
    if (previousState !== nextState) {
      logger.info('state changed: ', aStore.getState());
    }
    return result;
  };

  // initial reducer
  const defaultReducer = constGenerator({});
  const defaultEnhancer = composeWithDevTools(
    applyMiddleware(
      // this MUST be the first one
      epicMiddleware,
      crashReporterMiddleware,
      // this MUST be the last one
      loggerMiddleware
    )
  );

  // construct our store
  const store: Store<ReduxRootState> = isNotNil(aPreLoadedState)
    ? createStore(defaultReducer, aPreLoadedState, defaultEnhancer)
    : createStore(defaultReducer, defaultEnhancer);

  // start the middleware
  epicMiddleware.run(rootEpic);

  // dispatch
  const dispatch: Dispatch<AnyAction> = (action) => store.dispatch(action);
  const getState = () => store.getState();
  const subscribe = (listener: () => void) => store.subscribe(listener);
  const replaceReducer = noop;

  // changes in the set of reducers
  const reducerAdded$ = rxPipe(
    reducer$,
    map(bindMember(store, 'replaceReducer'))
  );
  // notifications about new feature states
  const newModule$ = rxPipe(
    module$,
    map(selectId),
    map(initFeatureAction),
    observeOn(queueScheduler),
    log('initFeatureAction'),
    map(dispatch)
  );

  // subscribe
  merge(reducerAdded$, newModule$).subscribe();

  /**
   * Registers a new feature module
   *
   * @param aModule - the feature module
   */
  function addFeatureModule<FS, RFS>(
    aModule: ReduxFeatureModule<RFS>
  ): ReduxRootStore<FS, Action> {
    // get the id
    const id = selectId(aModule);
    const oldModule = modules[id];
    if (isNil(oldModule)) {
      // register this module
      modules[id] = aModule;
      // iterate over the dependencies
      forEach(aModule.dependencies, addFeatureModule);
      // dispatch to the subject
      moduleSubject.next(aModule);
    }
    // returns a cast to the store
    return this;
  }
  /**
   * Returns our API
   */
  const rootStore: ReduxRootStore = {
    ...store,
    addFeatureModule,
    getState,
    subscribe,
    replaceReducer,
    dispatch
  };

  /**
   * Epic dependencies
   */
  const rootDeps: ReduxRootStoreDependencies = { logSvc, rootStore };

  /**
   * Augment the dependencies
   */
  assignObject(dependencies, rootDeps);

  // init log
  logger.info('initialized', createVersionString(VERSION));

  /**
   * Returns the API
   */
  return rootStore;
}
