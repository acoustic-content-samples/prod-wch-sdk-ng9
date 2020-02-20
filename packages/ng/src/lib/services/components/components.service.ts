import {
  createVersionString,
  Layout,
  Logger,
  LoggerService
} from '@acoustic-content-sdk/api';
import {
  ComponentTypeRef,
  ComponentTypeRefResolver,
  WCH_TOKEN_LOGGER_SERVICE
} from '@acoustic-content-sdk/ng-api';
import {
  assertObject,
  createSingleSubject,
  DEFAULT_LAYOUT_MODE,
  isArray,
  isArrayOf,
  isNotEmpty,
  isNotNil,
  isString,
  kebabCase,
  LAYOUT_TYPE_ANGULAR,
  boxLoggerService,
  rxNext,
  rxPipe,
  thisThenThat,
  wchBoxLayoutMode
} from '@acoustic-content-sdk/utils';
import { Inject, Injectable, Optional, Type } from '@angular/core';
import { EMPTY, MonoTypeOperatorFunction, Observable, of, Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { isEqualComponentTypeRef } from '../../utils/js.utils';
import { MODULE, VERSION } from './../../../version';
import { DefaultComponent } from './../../components/default/default.component';
import {
  cmpGetSelectors,
  getSelectorsFromComponent,
  RegisteredComponent
} from './../../utils/component.utils';
import { MarkupService } from './../markup/markup.service';

/**
 *  name of the default layout
 */
export const DEFAULT_LAYOUT_ID = 'wch-default-layout';

export const PAGE_NOT_FOUND_LAYOUT_ID = 'wch-404';

interface MappingEntry {
  sub: Subject<ComponentTypeRef<any>>;
  ob: Observable<ComponentTypeRef<any>>;
}

interface BySelectorMapping {
  [selector: string]: MappingEntry;
}

interface ByLayoutModeMapping {
  [layoutMode: string]: BySelectorMapping;
}

/**
 * Tries to decode the name from the type
 *
 * @param aType -   the type
 * @returns the name
 */
function _getTypeName(aType: Type<any>): string {
  return isNotNil(aType) ? aType.name : undefined;
}

/**
 * Constructs an entry in the mapping table
 *
 * @param aKey -  the layout key
 * @param aLayoutMode - the layout mode for debugging purposes
 * @returns the entry
 */
function _createMappingEntry(
  aKey: string,
  aLayoutMode: string,
  aLogger: Logger
): MappingEntry {
  /**
   *  create the subject
   */
  const sub = createSingleSubject<ComponentTypeRef<any>>();
  const ob: Observable<ComponentTypeRef<any>> = rxPipe(
    sub,
    distinctUntilChanged(isEqualComponentTypeRef)
  );
  /**
   *  returns the tuple
   */
  return { sub, ob };
}

/**
 *  array of the default layout modes as a fallback
 */
const _DEFAULT_LAYOUT_MODES = [DEFAULT_LAYOUT_MODE];

/**
 * Returns the layout modes for the component
 *
 * @param aModes - the layout component descriptor
 * @returns the modes
 */
function _getLayoutModesFromConfig(aModes?: string | string[]): string[] {
  /**
   *  fallback
   */
  return isString(aModes)
    ? [aModes]
    : isArrayOf(aModes, isString)
    ? aModes
    : _DEFAULT_LAYOUT_MODES;
}

/**
 * Returns the layout modes for the component
 *
 * @param aComponent - the layout component descriptor
 * @returns the modes
 */
function _getLayoutModesFromComponent(
  aComponent: RegisteredComponent
): string[] {
  return _getLayoutModesFromConfig(aComponent.directive.layoutMode);
}

function _registerByLayoutModesAndSelectors(
  aTypeRef: ComponentTypeRef<any>,
  aLayoutModes: string[],
  aSelectors: string[],
  aMap: ByLayoutModeMapping,
  aLogger: Logger
) {
  /**
   *  register all combinations
   */
  const lenModes = aLayoutModes.length;
  for (let j = 0; j < lenModes; j++) {
    /**
     *  mode
     */
    const layoutMode = aLayoutModes[j];
    /**
     *  register
     */
    const lenSel = aSelectors.length;
    for (let i = 0; i < lenSel; ++i) {
      _onRegisterComponent(aSelectors[i], layoutMode, aTypeRef, aMap, aLogger);
    }
  }
}

/**
 * Invoked to register a component by decorator
 *
 * @param aComponent -  the component
 */
function _onRegisteredComponent(
  aComponent: RegisteredComponent,
  aMap: ByLayoutModeMapping,
  aLogger: Logger
): void {
  /**
   *  analyze the existing annotations
   */
  const componentSelectors: string[] = getSelectorsFromComponent(aComponent);
  /**
   *  dispatch
   */
  if (isArray(componentSelectors)) {
    /**
     *  the layout modes
     */
    _registerByLayoutModesAndSelectors(
      aComponent.type,
      _getLayoutModesFromComponent(aComponent),
      componentSelectors,
      aMap,
      aLogger
    );
  }
}

/**
 * Makes sure to get a subject
 *
 * @param aController - the controller ID
 * @param aLayoutMode - the layout mode
 * @param aMapByLayoutMode - the mapping from layout mode to controller mapping
 * @returns the subject
 */
function _getEntry(
  aController: string,
  aLayoutMode: string,
  aMapByLayoutMode: ByLayoutModeMapping,
  aLogger: Logger
): MappingEntry {
  /**
   *  construct the first level
   */
  const bySelector = assertObject(aLayoutMode, aMapByLayoutMode);
  /**
   *  select inside the selector
   */
  return (
    bySelector[aController] ||
    (bySelector[aController] = _createMappingEntry(
      aController,
      aLayoutMode,
      aLogger
    ))
  );
}

/**
 * Invoked to register a particular component with a controller
 *
 * @param aController -   the controller
 * @param aType -   the type
 */
function _onRegisterComponent(
  aController: string,
  aLayoutMode: string,
  aTypeRef: ComponentTypeRef<any>,
  aMap: ByLayoutModeMapping,
  aLogger: Logger
): void {
  /**
   *  add if the data is ok
   */
  if (isNotNil(aController) && isNotNil(aTypeRef) && isNotNil(aLayoutMode)) {
    /**
     * Register
     */
    aLogger.info('register', aController, aLayoutMode, aTypeRef);
    /**
     *  dispatch to the registered subject
     */
    _getEntry(aController, aLayoutMode, aMap, aLogger).sub.next(aTypeRef);
  }
}

function _getTypeByTemplateType(
  aType: string,
  aLayoutMode: string,
  aMarkupService: MarkupService,
  aLayout: Layout,
  aMapping: ByLayoutModeMapping,
  aLogger: Logger
): Observable<ComponentTypeRef<any>> {
  const provider = aMarkupService.markupProviders[aType];
  return isNotNil(provider)
    ? of(provider.getComponentTypeRef())
    : _getTypeBySelector(
        _getLayoutSelector(aLayout),
        aLayoutMode,
        aMapping,
        aLogger
      );
}

/**
 * Returns the type object based on the layout selector
 *
 * @param aSelector - the selector
 * @param aMapping - the mappings
 * @returns the type
 */
function _getTypeBySelector(
  aSelector: string,
  aLayoutMode: string,
  aMapping: ByLayoutModeMapping,
  aLogger: Logger
): Observable<ComponentTypeRef<any>> {
  /**
   *  get the entry for the mode
   */
  const byMode = _getEntry(aSelector, aLayoutMode, aMapping, aLogger);
  if (aLayoutMode !== DEFAULT_LAYOUT_MODE) {
    /**
     *  fallback to the default mode
     */
    const byDefault = _getEntry(
      aSelector,
      DEFAULT_LAYOUT_MODE,
      aMapping,
      aLogger
    );
    /**
     *  combine
     */
    return thisThenThat(byDefault.ob, byMode.ob);
  }
  /**
   *  just return the default
   */
  return byMode.ob;
}

/**
 * Returns the template identifier from the authoring layout. For an angular
 * layout this is the template, else it is the name or the id as a fallback
 *
 * @param aLayout - the layout
 *
 * @returns the template
 */
function _getLayoutSelector(aLayout: Layout): string {
  /**
   *  for the angular case, use the template string
   */
  const layout: any = aLayout;
  const { templateType, template } = layout;
  if (
    templateType === LAYOUT_TYPE_ANGULAR &&
    isString(template) &&
    isNotEmpty(template)
  ) {
    /**
     *  use the template string as is
     */
    return template;
  }
  /**
   *  else use the kebab case name or ID
   */
  const { name, id } = aLayout;
  const fallback = name || id;
  /**
   *  use this one
   */
  return kebabCase(fallback);
}

/**
 * Returns the type object based on the layout configuration
 *
 * @param aLayout -   the layout object
 * @param aFallback - true if we want to apply a fallback when looking for the layout, else false
 * @param aMap - the mappings
 * @returns the type
 */
function _getTypeByLayout(
  aLayout: Layout,
  aLayoutMode: string,
  aMapping: ByLayoutModeMapping,
  aMarkupService: MarkupService,
  aLogger: Logger
): Observable<ComponentTypeRef<any>> {
  /**
   *  lazy init
   */
  const { templateType } = aLayout;
  /**
   *  check the type
   */
  switch (templateType) {
    case LAYOUT_TYPE_ANGULAR:
      return _getTypeBySelector(
        aLayout.template,
        aLayoutMode,
        aMapping,
        aLogger
      );
    default:
      return _getTypeByTemplateType(
        templateType,
        aLayoutMode,
        aMarkupService,
        aLayout,
        aMapping,
        aLogger
      );
  }
}

const LOGGER = 'ComponentsService';

@Injectable({ providedIn: 'root' })
export class ComponentsService implements ComponentTypeRefResolver {
  /**
   *  define the methods
   */
  registerType: (
    aController: string | string[],
    aType: ComponentTypeRef<any>,
    aLayoutModes?: string | string[]
  ) => void;

  /**
   * Returns the type object based on the layout configuration
   *
   * @param aLayout -   the layout object
   * @param aLayoutMode - an optional layout mode, defaults to the default mode
   * @returns the type
   */
  getTypeByLayout: (
    aLayout: Layout,
    aLayoutMode?: string
  ) => Observable<ComponentTypeRef<any>>;

  /**
   * Returns the type object based on the layout selector
   *
   * @param aSelector - the selector
   * @param aLayoutMode - an optional layout mode, defaults to the default mode
   * @returns the type
   */
  getTypeBySelector: (
    aSelector: string,
    aLayoutMode?: string
  ) => Observable<ComponentTypeRef<any>>;

  /**
   * Initializes our constructor. We make sure to keep all private instance variables as part of the
   * closure and override the methods on the instance level. Since this is a singleton service,
   * that approach does not cause a performance problem.
   */
  constructor(
    markupService: MarkupService,
    @Optional()
    @Inject(WCH_TOKEN_LOGGER_SERVICE)
    aLogSvc: LoggerService
  ) {
    // logger
    const logSvc = boxLoggerService(aLogSvc);
    const logger = logSvc.get(LOGGER);

    // next logger
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);

    /**
     *  attach methods
     */
    const that = this;
    /**
     *  our private methods
     */
    let componentMap: ByLayoutModeMapping;

    /** lazily initialize the component map */
    function _initComponentMap(): ByLayoutModeMapping {
      if (!componentMap) {
        /**
         *  init
         */
        const tmp: ByLayoutModeMapping = {};
        /**
         *  default mapping for known types
         */
        _getEntry(DEFAULT_LAYOUT_ID, DEFAULT_LAYOUT_MODE, tmp, logger).sub.next(
          {
            type: DefaultComponent
          }
        );
        _getEntry(
          PAGE_NOT_FOUND_LAYOUT_ID,
          DEFAULT_LAYOUT_MODE,
          tmp,
          logger
        ).sub.next({
          type: DefaultComponent
        });

        /**
         *  update the reference
         */
        componentMap = tmp;
      }

      /**
       *  returns the mapping
       */
      return componentMap;
    }

    /**
     *  define the methods
     */
    that.registerType = (
      aController: string | string[],
      aType: ComponentTypeRef<any>,
      aLayoutModes?: string | string[]
    ): void =>
      _registerByLayoutModesAndSelectors(
        aType,
        _getLayoutModesFromConfig(aLayoutModes),
        cmpGetSelectors(aController),
        _initComponentMap(),
        logger
      );

    that.getTypeByLayout = (
      aLayout: Layout,
      aLayoutMode?: string
    ): Observable<ComponentTypeRef<any>> =>
      rxPipe(
        isNotNil(aLayout)
          ? _getTypeByLayout(
              aLayout,
              wchBoxLayoutMode(aLayoutMode),
              _initComponentMap(),
              markupService,
              logger
            )
          : EMPTY,
        log('byLayout', aLayout)
      );

    that.getTypeBySelector = (
      aSelector: string,
      aLayoutMode?: string
    ): Observable<ComponentTypeRef<any>> =>
      rxPipe(
        isNotNil(aSelector)
          ? _getTypeBySelector(
              aSelector,
              wchBoxLayoutMode(aLayoutMode),
              _initComponentMap(),
              logger
            )
          : EMPTY,
        log('bySelector', aSelector)
      );

    // log the startup
    logger.info(MODULE, createVersionString(VERSION));
  }
}
