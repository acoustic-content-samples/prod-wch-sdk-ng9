import {
  arrayPush,
  assertArray,
  createConsumerOnSubject,
  createSingleSubject,
  isNotNil
} from '@acoustic-content-sdk/utils';
import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { Observable, Subject } from 'rxjs';

/**
 * Enumeration of the possible hooks
 */
const HOOK_AFTERVIEWCHECKED = 0;
const HOOK_AFTERVIEWINIT = 1;
const HOOK_AFTERCONTENTCHECKED = 2;
const HOOK_AFTERCONTENTINIT = 3;
const HOOK_DOCHECK = 4;
const HOOK_INIT = 5;
const HOOK_CHANGES = 6;
const HOOK_DESTROY = 7;

const FIELD_CALLBACKS = 1;
const FIELD_OBSERVABLE = 2;

declare type HookType = (...aAny: any[]) => void;

declare type Registry = any[][];

/**
 *  we hide the hook registry
 */
const KEY_REGISTRY = Symbol();

/**
 * Clears the registry from the component
 *
 * @param aThis -     the instance
 */
function _removeRegistry(aThis: AbstractLifeCycleComponent) {
  delete aThis[KEY_REGISTRY];
}

/**
 * Makes sure we have a hook data structure for the identifier
 *
 * @param aHookIdentifier -   the hook identifier
 * @param aThis -     the instance
 * @returns the hook structure
 */
function _assertHook(
  aHookIdentifier: number,
  aThis: AbstractLifeCycleComponent
): any[] {
  /**
   *  access the registry
   */
  return assertArray(aHookIdentifier, assertArray(KEY_REGISTRY, aThis));
}

/**
 * Makes sure we have a callbacks array defined
 *
 * @param aHook - the hook structure
 * @returns the callback field
 */
function _assertCallbacks(aHook: any[]): HookType[] {
  /**
   *  returns the callback field
   */
  return assertArray<HookType>(FIELD_CALLBACKS, aHook);
}

/**
 * Construct the desired observable
 *
 * @param aHookIdentifier -   the hook
 * @param aThis -  the life cycle component
 *
 * @returns the observable
 */
function _createObservable(
  aHookIdentifier: number,
  aHook: any[],
  aShared: boolean,
  aThis: AbstractLifeCycleComponent
): Observable<any> {
  /**
   *  construct the subject
   */
  const subject = aShared ? createSingleSubject<any>() : new Subject<any>();
  /**
   *  callbacks
   */
  const fct: HookType[] = _assertCallbacks(aHook);
  /**
   *  the handlers
   */
  const onNext = createConsumerOnSubject(subject);
  const onComplete = () => subject.complete();
  /**
   *  register the hook that invokes the method
   */
  arrayPush(onNext, fct);
  /**
   *  make sure we complete in ngOnDestroy
   */
  if (aHookIdentifier === HOOK_DESTROY) {
    /**
     *  add the end handler to the same sequence
     */
    arrayPush(onComplete, fct);
  } else {
    /**
     *  add the end handler to the destroy chain
     */
    _addHook(HOOK_DESTROY, aThis, onComplete);
  }
  /**
   *  convert to a safe observable
   */
  return subject;
}

/**
 * Registers an observable for a hook
 *
 * @param aHookIdentifier - the identifier for the hook
 * @param aThis - the instance of the component
 *
 * @returns the observable
 */
function _getObservable(
  aHookIdentifier: number,
  aShared: boolean,
  aThis: AbstractLifeCycleComponent
): Observable<any> {
  /**
   *  make sure we have the hook
   */
  const hook: any[] = _assertHook(aHookIdentifier, aThis);
  /**
   *  handle
   */
  return (
    hook[FIELD_OBSERVABLE] ||
    (hook[FIELD_OBSERVABLE] = _createObservable(
      aHookIdentifier,
      hook,
      aShared,
      aThis
    ))
  );
}

/**
 * Registers a life cycle hook with the component
 */
function _addHook(
  aHookIdentifier: number,
  aThis: AbstractLifeCycleComponent,
  aHook: HookType
) {
  /**
   *  make sure we have the hook
   */
  arrayPush(aHook, _assertCallbacks(_assertHook(aHookIdentifier, aThis)));
}

/**
 * Invokes the lifecycle hooks for the component
 *
 * @param aName -     name of the hook
 * @param aObject -   the registry
 * @param aThis -     the this pointer
 * @param aArgs -     the arguments
 */
function _invokeHooks(
  aHookIdentifier: number,
  aThis: AbstractLifeCycleComponent,
  aArgs: IArguments
): void {
  /**
   *  access the registry
   */
  const reg: Registry = aThis[KEY_REGISTRY];
  /**
   *  only for an existing registry
   */
  if (isNotNil(reg)) {
    /**
     *  check if we have hooks
     */
    const hook: any[] = reg[aHookIdentifier];
    if (isNotNil(hook)) {
      /**
       *  callbacks
       */
      const cb: HookType[] = hook[FIELD_CALLBACKS];
      if (isNotNil(cb)) {
        const len = cb.length;
        for (let i = 0; i < len; i++) {
          cb[i].apply(aThis, aArgs);
        }
      }
    }
  }
}

/** Base class that allows to register life cycle hooks. This class is supposed
 * to be subclassed before use.
 *
 * The 'ngXXX' methods override the methods from the Angular life cycle interfaces. If you overridde
 * any of these methods make sure to call the super method.
 *
 * The 'onXXX' methods expose observables that will be triggered when the life cycle method occurs. This is
 * a convenient way to register hooks in the constructor of a subclass without having to override any
 * method.
 *
 * The `onDestroy$` observable is especially useful, since it can be used as a termination signal for
 * automatic unsubscriptions via the {@link http://reactivex.io/documentation/operators/takeuntil.html|takeUntil} operation.
 *
 * Note that hooks such as `onInit$` and `onDestroy$` only fire once. If you depend on such a hook in an observable
 * chain more than once make sure to share the emissions (typically via `shareReplay` )
 */
/** tslint:disable:no-conflicting-lifecycle */
export abstract class AbstractLifeCycleComponent
  implements
    OnInit,
    OnDestroy,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked {
  /**
   * {@link https://angular.io/guide/lifecycle-hooks|AfterViewChecked}
   */
  ngAfterViewChecked(): void {
    _invokeHooks(HOOK_AFTERVIEWCHECKED, this, arguments);
  }

  /**
   * {@link https://angular.io/guide/lifecycle-hooks|AfterViewInit}
   */
  ngAfterViewInit(): void {
    _invokeHooks(HOOK_AFTERVIEWINIT, this, arguments);
  }

  /**
   * {@link https://angular.io/guide/lifecycle-hooks|AfterContentChecked}
   */
  ngAfterContentChecked(): void {
    _invokeHooks(HOOK_AFTERCONTENTCHECKED, this, arguments);
  }

  /**
   * {@link https://angular.io/guide/lifecycle-hooks|AfterContentInit}
   */
  ngAfterContentInit(): void {
    _invokeHooks(HOOK_AFTERCONTENTINIT, this, arguments);
  }

  /**
   * {@link https://angular.io/guide/lifecycle-hooks|DoCheck}
   */
  ngDoCheck(): void {
    _invokeHooks(HOOK_DOCHECK, this, arguments);
  }

  /**
   * {@link https://angular.io/guide/lifecycle-hooks|OnChanges}
   */
  ngOnChanges(changes: SimpleChanges): void {
    _invokeHooks(HOOK_CHANGES, this, arguments);
  }

  /**
   * {@linkhttps://angular.io/guide/lifecycle-hooks| OnInit}
   */
  ngOnInit(): void {
    _invokeHooks(HOOK_INIT, this, arguments);
  }

  /**
   * {@link https://angular.io/guide/lifecycle-hooks|OnDestroy}
   */
  ngOnDestroy(): void {
    /**
     *  dispatch
     */
    _invokeHooks(HOOK_DESTROY, this, arguments);
    _removeRegistry(this);
  }

  /**
   * {@link https://angular.io/guide/lifecycle-hooks|AfterViewChecked}
   * @returns the observable representation of this callback
   */
  protected get afterViewChecked$(): Observable<void> {
    return _getObservable(HOOK_AFTERVIEWCHECKED, false, this);
  }

  /**
   * {@link https://angular.io/guide/lifecycle-hooks|AfterViewInit}
   * @returns the observable representation of this callback
   */
  protected get afterViewInit$(): Observable<void> {
    return _getObservable(HOOK_AFTERVIEWINIT, true, this);
  }

  /**
   * {@link https://angular.io/guide/lifecycle-hooks|AfterContentChecked}
   * @returns the observable representation of this callback
   */
  protected get afterContentChecked$(): Observable<void> {
    return _getObservable(HOOK_AFTERCONTENTCHECKED, false, this);
  }

  /**
   * {@link https://angular.io/guide/lifecycle-hooks|AfterContentInit}
   * @returns the observable representation of this callback
   */
  protected get afterContentInit$(): Observable<void> {
    return _getObservable(HOOK_AFTERCONTENTINIT, true, this);
  }

  /**
   * {@link https://angular.io/guide/lifecycle-hooks|DoCheck}
   * @returns the observable representation of this callback
   */
  protected get doCheck$(): Observable<void> {
    return _getObservable(HOOK_DOCHECK, false, this);
  }

  /**
   * {@link https://angular.io/guide/lifecycle-hooks|OnChanges}
   * @returns the observable representation of this callback
   */
  protected get onChanges$(): Observable<SimpleChanges> {
    return _getObservable(HOOK_CHANGES, false, this);
  }

  /**
   * {@link https://angular.io/guide/lifecycle-hooks|OnInit}
   * @returns the observable representation of this callback
   */
  protected get onInit$(): Observable<void> {
    return _getObservable(HOOK_INIT, true, this);
  }

  /**
   * {@link https://angular.io/guide/lifecycle-hooks|OnDestroy}
   * @returns the observable representation of this callback
   */
  protected get onDestroy$(): Observable<void> {
    return _getObservable(HOOK_DESTROY, true, this);
  }
}
