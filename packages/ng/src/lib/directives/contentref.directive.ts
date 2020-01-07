import {
  Logger,
  LoggerService,
  RenderingContextV2
} from '@acoustic-content-sdk/api';
import {
  ComponentTypeRef,
  WCH_TOKEN_LOGGER_SERVICE
} from '@acoustic-content-sdk/ng-api';
import {
  assignObject,
  createSetterOnSubject,
  createSingleSubject,
  DEFAULT_LAYOUT_MODE,
  isEqual,
  isNotNil,
  KEY_LAYOUT_MODE,
  KEY_RENDERING_CONTEXT,
  NOOP_LOGGER_SERVICE,
  opFilterNotNil,
  pluckPath,
  rxPipe,
  safeUnsubscribe
} from '@acoustic-content-sdk/utils';
import {
  ChangeDetectorRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Inject,
  Input,
  NgModuleRef,
  NgZone,
  OnDestroy,
  Optional,
  Output,
  ViewContainerRef
} from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Observable, Observer, Subscription } from 'rxjs';
import { distinctUntilChanged, scan } from 'rxjs/operators';

import { ZoneService } from '../services/zone/zone.service';
import { defineProperties, isEqualComponentTypeRef } from '../utils/js.utils';

const selectLoadedConfig = pluckPath<any>(['_loadedConfig']);

/**
 * Combines the active pieces of the state into one single object
 */
export declare type ComponentState = [
  ComponentTypeRef<any>,
  RenderingContextV2,
  string,
  string
];

function _getComponentFactoryResolver(
  aConfig?: Route
): ComponentFactoryResolver {
  /**
   *  check if we have a config
   */
  if (isNotNil(aConfig)) {
    /**
     *  access the loaded config
     */
    const loadedConfig: any = selectLoadedConfig(aConfig);
    if (isNotNil(loadedConfig)) {
      /**
       *  test if we have a module
       */
      const moduleRef: NgModuleRef<any> = loadedConfig.module;
      if (isNotNil(moduleRef)) {
        /**
         *  use the resolver
         */
        return moduleRef.componentFactoryResolver;
      }
    }
  }
  /**
   *  nothing found
   */
  return null;
}

function isSafeEqualComponentState(
  aLeft: ComponentState,
  aRight: ComponentState
): boolean {
  // decompose
  const [leftTypeRef, leftContext, leftMode, leftId] = aLeft;
  const [rightTypeRef, rightContext, rightMode, rightId] = aRight;
  // compare
  return (
    isEqualComponentTypeRef(leftTypeRef, rightTypeRef) &&
    isEqual(leftContext, rightContext) &&
    isEqual(leftMode, rightMode) &&
    isEqual(leftId, rightId)
  );
}

function isEqualComponentState(
  aLeft: ComponentState,
  aRight: ComponentState
): boolean {
  // sanity check
  return (
    isEqual(aLeft, aRight) ||
    (isNotNil(aLeft) &&
      isNotNil(aRight) &&
      isSafeEqualComponentState(aLeft, aRight))
  );
}

const LOGGER = 'ContentRefDirective';

/**
 * Decodes the resolved from the state
 */
function getResolver(
  [typeRef]: ComponentState,
  aDefaultResolver: ComponentFactoryResolver
): ComponentFactoryResolver {
  // decode the type
  return isNotNil(typeRef)
    ? typeRef.resolver || aDefaultResolver
    : aDefaultResolver;
}

// component, resolver
declare interface InternalState {
  typeRef?: ComponentTypeRef<any>;
  resolver: ComponentFactoryResolver;
  cmpRef?: ComponentRef<any>;
  ctx?: RenderingContextV2;
  mode: string;
}

function reduceState(
  aCurrent: InternalState,
  aNew: ComponentState,
  aDefaultResolver: ComponentFactoryResolver,
  aViewContainerRef: ViewContainerRef,
  aComponentObserver: Observer<any>,
  aChangeDetectorRef: ChangeDetectorRef,
  aLogger: Logger
): InternalState {
  // verify that we run in the correct zone
  NgZone.assertInAngularZone();
  // current data
  const {
    typeRef: currentTypeRef,
    resolver: currentResolver,
    cmpRef: currentComponent,
    ctx: currentContext,
    mode: currentLayoutMode
  } = aCurrent;
  // the component state
  const [newTypeRef, newContext, newLayoutMode, id] = aNew;
  // decode the current resolver
  const newResolver = getResolver(aNew, aDefaultResolver);
  // compare
  const bNewResolver = !isEqual(currentResolver, newResolver);
  const bNewTypeRef = !isEqualComponentTypeRef(currentTypeRef, newTypeRef);
  // check if we have a new resolver
  if (bNewResolver || bNewTypeRef) {
    // update the state
    aCurrent.typeRef = newTypeRef;
    aCurrent.resolver = newResolver;
    // only clear if required
    if (aViewContainerRef.length > 0) {
      // log this
      aLogger.info(id, 'Clearing view container ...');
      // clear the view
      aViewContainerRef.clear();
    }
    // construct the component
    if (isNotNil(newResolver) && isNotNil(newTypeRef)) {
      // log this
      aLogger.info(
        id,
        'Constructing new component ...',
        newTypeRef.type.name,
        bNewTypeRef,
        bNewResolver
      );
      // get a new component
      const cmpRef = aViewContainerRef.createComponent(
        newResolver.resolveComponentFactory(newTypeRef.type)
      );
      // communicate this new component
      if (isNotNil(cmpRef)) {
        // the instance
        const { instance } = cmpRef;
        // communicate
        aComponentObserver.next(instance);
        // update the instance
        assignObject(instance, {
          [KEY_RENDERING_CONTEXT]: newContext,
          [KEY_LAYOUT_MODE]: newLayoutMode
        });
        // update
        aCurrent.ctx = newContext;
        aCurrent.mode = newLayoutMode;
        // make sure we mark the component dirty
        cmpRef.changeDetectorRef.markForCheck();
      } else {
        // error, we cannot create a new component
        aLogger.warn(id, 'Unable to create a new component', newTypeRef.type);
        // communicate
        aComponentObserver.next(undefined);
      }
      // update the state
      aCurrent.cmpRef = cmpRef;
    } else {
      // update the state
      aCurrent.cmpRef = undefined;
    }
    // we updated our component
    aChangeDetectorRef.markForCheck();
  } else if (isNotNil(currentComponent)) {
    // the instance
    const { instance } = currentComponent;
    // check for updates
    const bNewMode = !isEqual(newLayoutMode, currentLayoutMode);
    const bNewContext = !isEqual(newContext, currentContext);
    // handle the updates
    if (bNewMode) {
      if (bNewContext) {
        // log this
        aLogger.info(
          id,
          'Updating data ...',
          KEY_RENDERING_CONTEXT,
          KEY_LAYOUT_MODE
        );
        // update in one step
        assignObject(instance, {
          [KEY_RENDERING_CONTEXT]: newContext,
          [KEY_LAYOUT_MODE]: newLayoutMode
        });
        // update the context in the result
        aCurrent.ctx = newContext;
      } else {
        // log this
        aLogger.info(id, 'Updating data ...', KEY_LAYOUT_MODE);
        // just update the mode
        instance[KEY_LAYOUT_MODE] = newLayoutMode;
      }
      // update the mode
      aCurrent.mode = newLayoutMode;
      // make sure we mark the component dirty
      currentComponent.changeDetectorRef.markForCheck();
    } else if (bNewContext) {
      // log this
      aLogger.info(id, 'Updating data ...', KEY_RENDERING_CONTEXT);
      // just update the context
      instance[KEY_RENDERING_CONTEXT] = newContext;
      // update the context in the result
      aCurrent.ctx = newContext;
      // make sure we mark the component dirty
      currentComponent.changeDetectorRef.markForCheck();
    }
  }
  // returns the state
  return aCurrent;
}

@Directive({ selector: '[wchContentRef]' })
export class ContentRefDirective implements OnDestroy {
  /**
   * Input to the directive
   */
  @Input() wchContentRef: ComponentState;

  /**
   * Output that will be triggered when a new component was created
   */
  @Output() component$: Observable<any>;

  /**
   * Done trigger
   */
  private readonly handle: Subscription;

  constructor(
    zoneService: ZoneService,
    viewContainerRef: ViewContainerRef,
    aCmpResolver: ComponentFactoryResolver,
    activatedRoute: ActivatedRoute,
    changeDetectorRef: ChangeDetectorRef,
    @Optional()
    @Inject(WCH_TOKEN_LOGGER_SERVICE)
    aLogSvc: LoggerService
  ) {
    // logging
    const logSvc = aLogSvc || NOOP_LOGGER_SERVICE;
    const logger = logSvc.get(LOGGER);

    const that = this;

    const defaultCmpFctResolver =
      _getComponentFactoryResolver(activatedRoute.routeConfig) || aCmpResolver;

    const state = createSingleSubject<ComponentState>();
    const component = createSingleSubject<any>();
    this.component$ = component.asObservable();

    const state$ = rxPipe(
      state,
      opFilterNotNil,
      distinctUntilChanged(isEqualComponentState),
      // make sure all updates run inside a zone
      zoneService.observeInside(),
      scan(
        (aCurrent: InternalState, aNew: ComponentState) =>
          reduceState(
            aCurrent,
            aNew,
            defaultCmpFctResolver,
            viewContainerRef,
            component,
            changeDetectorRef,
            logger
          ),
        { resolver: defaultCmpFctResolver, mode: DEFAULT_LAYOUT_MODE }
      )
    );

    // define the setters
    defineProperties(that, {
      ['wchContentRef']: createSetterOnSubject(state)
    });

    // done callback
    const complete = () => {
      // clear the ref
      if (viewContainerRef.length > 0) {
        // done
        viewContainerRef.clear();
      }
      // log destroy
      logger.info('Destroying ...');
    };

    // attach to the updates
    this.handle = state$.subscribe({ complete });
  }

  ngOnDestroy() {
    // done callback
    safeUnsubscribe(this.handle);
  }
}
