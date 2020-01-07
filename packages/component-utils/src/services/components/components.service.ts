import { createVersionString, Layout, Logger, LoggerService } from '@acoustic-content-sdk/api';
import { AbstractComponentsRegistry } from '@acoustic-content-sdk/component-api';
import {
  assertObject,
  createSingleSubject,
  DEFAULT_LAYOUT_MODE,
  EqualsPredicate,
  isArrayOf,
  isNotEmpty,
  isNotNil,
  isString,
  kebabCase,
  LAYOUT_TYPE_ANGULAR,
  NOOP_LOGGER_SERVICE,
  rxNext,
  rxPipe,
  thisThenThat,
  wchBoxLayoutMode,
} from '@acoustic-content-sdk/utils';
import { EMPTY, MonoTypeOperatorFunction, Observable, Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { cmpGetSelectors } from '../../utils/component.utils';
import { MODULE, VERSION } from './../../version';

/**
 *  name of the default layout
 */
export const DEFAULT_LAYOUT_ID = 'wch-default-layout';

export const PAGE_NOT_FOUND_LAYOUT_ID = 'wch-404';

interface MappingEntry<TYPE> {
  sub: Subject<TYPE>;
  ob: Observable<TYPE>;
}

interface BySelectorMapping<TYPE> {
  [selector: string]: MappingEntry<TYPE>;
}

interface ByLayoutModeMapping<TYPE> {
  [layoutMode: string]: BySelectorMapping<TYPE>;
}

/**
 * Constructs an entry in the mapping table
 *
 * @param aKey -  the layout key
 * @param aLayoutMode - the layout mode for debugging purposes
 * @returns the entry
 */
function _createMappingEntry<TYPE>(
  aKey: string,
  aLayoutMode: string,
  aPredicate: EqualsPredicate<TYPE>,
  aLogger: Logger
): MappingEntry<TYPE> {
  /**
   *  create the subject
   */
  const sub = createSingleSubject<TYPE>();
  const ob: Observable<TYPE> = rxPipe(sub, distinctUntilChanged(aPredicate));
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

function _registerByLayoutModesAndSelectors<TYPE>(
  aTypeRef: TYPE,
  aLayoutModes: string[],
  aSelectors: string[],
  aMap: ByLayoutModeMapping<TYPE>,
  aPredicate: EqualsPredicate<TYPE>,
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
      _onRegisterComponent(
        aSelectors[i],
        layoutMode,
        aTypeRef,
        aMap,
        aPredicate,
        aLogger
      );
    }
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
function _getEntry<TYPE>(
  aController: string,
  aLayoutMode: string,
  aMapByLayoutMode: ByLayoutModeMapping<TYPE>,
  aPredicate: EqualsPredicate<TYPE>,
  aLogger: Logger
): MappingEntry<TYPE> {
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
      aPredicate,
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
function _onRegisterComponent<TYPE>(
  aController: string,
  aLayoutMode: string,
  aTypeRef: TYPE,
  aMap: ByLayoutModeMapping<TYPE>,
  aPredicate: EqualsPredicate<TYPE>,
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
    _getEntry(aController, aLayoutMode, aMap, aPredicate, aLogger).sub.next(
      aTypeRef
    );
  }
}

function _getTypeByTemplateType<TYPE>(
  aType: string,
  aLayoutMode: string,
  aLayout: Layout,
  aMapping: ByLayoutModeMapping<TYPE>,
  aPredicate: EqualsPredicate<TYPE>,
  aLogger: Logger
): Observable<TYPE> {
  return _getTypeBySelector(
    _getLayoutSelector(aLayout),
    aLayoutMode,
    aMapping,
    aPredicate,
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
function _getTypeBySelector<TYPE>(
  aSelector: string,
  aLayoutMode: string,
  aMapping: ByLayoutModeMapping<TYPE>,
  aPredicate: EqualsPredicate<TYPE>,
  aLogger: Logger
): Observable<TYPE> {
  /**
   *  get the entry for the mode
   */
  const byMode = _getEntry(
    aSelector,
    aLayoutMode,
    aMapping,
    aPredicate,
    aLogger
  );
  if (aLayoutMode !== DEFAULT_LAYOUT_MODE) {
    /**
     *  fallback to the default mode
     */
    const byDefault = _getEntry(
      aSelector,
      DEFAULT_LAYOUT_MODE,
      aMapping,
      aPredicate,
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
function _getTypeByLayout<TYPE>(
  aLayout: Layout,
  aLayoutMode: string,
  aMapping: ByLayoutModeMapping<TYPE>,
  aPredicate: EqualsPredicate<TYPE>,
  aLogger: Logger
): Observable<TYPE> {
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
        aPredicate,
        aLogger
      );
    default:
      return _getTypeByTemplateType(
        templateType,
        aLayoutMode,
        aLayout,
        aMapping,
        aPredicate,
        aLogger
      );
  }
}

const LOGGER = 'AbstractComponentsService';

export class AbstractComponentsService<TYPE>
  implements AbstractComponentsRegistry<TYPE> {
  /**
   *  define the methods
   */
  registerType: (
    aController: string | string[],
    aType: TYPE,
    aLayoutModes?: string | string[]
  ) => void;

  /**
   * Returns the type object based on the layout configuration
   *
   * @param aLayout -   the layout object
   * @param aLayoutMode - an optional layout mode, defaults to the default mode
   * @returns the type
   */
  getTypeByLayout: (aLayout: Layout, aLayoutMode?: string) => Observable<TYPE>;

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
  ) => Observable<TYPE>;

  /**
   * Initializes our constructor. We make sure to keep all private instance variables as part of the
   * closure and override the methods on the instance level. Since this is a singleton service,
   * that approach does not cause a performance problem.
   */
  protected constructor(
    aDefaultComponent: TYPE,
    aPredicate: EqualsPredicate<TYPE>,
    aLogSvc?: LoggerService
  ) {
    // logger
    const logSvc = aLogSvc || NOOP_LOGGER_SERVICE;
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
    let componentMap: ByLayoutModeMapping<TYPE>;

    /* lazily initialize the component map */
    function _initComponentMap(): ByLayoutModeMapping<TYPE> {
      if (!componentMap) {
        /**
         *  init
         */
        const tmp: ByLayoutModeMapping<TYPE> = {};
        /**
         *  default mapping for known types
         */
        _getEntry(
          DEFAULT_LAYOUT_ID,
          DEFAULT_LAYOUT_MODE,
          tmp,
          aPredicate,
          logger
        ).sub.next(aDefaultComponent);
        _getEntry(
          PAGE_NOT_FOUND_LAYOUT_ID,
          DEFAULT_LAYOUT_MODE,
          tmp,
          aPredicate,
          logger
        ).sub.next(aDefaultComponent);

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
      aType: TYPE,
      aLayoutModes?: string | string[]
    ): void =>
      _registerByLayoutModesAndSelectors(
        aType,
        _getLayoutModesFromConfig(aLayoutModes),
        cmpGetSelectors(aController),
        _initComponentMap(),
        aPredicate,
        logger
      );

    that.getTypeByLayout = (
      aLayout: Layout,
      aLayoutMode?: string
    ): Observable<TYPE> =>
      rxPipe(
        isNotNil(aLayout)
          ? _getTypeByLayout(
              aLayout,
              wchBoxLayoutMode(aLayoutMode),
              _initComponentMap(),
              aPredicate,
              logger
            )
          : EMPTY,
        log('byLayout', aLayout)
      );

    that.getTypeBySelector = (
      aSelector: string,
      aLayoutMode?: string
    ): Observable<TYPE> =>
      rxPipe(
        isNotNil(aSelector)
          ? _getTypeBySelector(
              aSelector,
              wchBoxLayoutMode(aLayoutMode),
              _initComponentMap(),
              aPredicate,
              logger
            )
          : EMPTY,
        log('bySelector', aSelector)
      );

    // log the startup
    logger.info(MODULE, createVersionString(VERSION));
  }
}
