import { RenderingContextV2 } from '@acoustic-content-sdk/api';
import { LayoutMappingResolver } from '@acoustic-content-sdk/component-api';
import {
  assertObject,
  DEFAULT_LAYOUT_MODE,
  isFunction,
  isNil,
  isNotEmpty,
  isNotNil,
  isString,
  isStringArray,
  wchBoxLayoutMode
} from '@acoustic-content-sdk/utils';
import { Injectable, Type } from '@angular/core';
import { Subscription } from 'rxjs';

import {
  REGISTERED_MAPPINGS,
  RegisteredMapping
} from './../../utils/component.mapping.utils';
import { cmpGetSelector, cmpGetSelectors } from './../../utils/component.utils';

declare type Selector = string | Type<any>;

/**
 * Maps from layout mode to selector
 */
declare type MappingEntry = Record<string, Selector>;

interface Mappings {
  byId: Record<string, MappingEntry>;
  byKind: Record<string, MappingEntry>;
}

function _getMappingById(
  aKey: string | null | undefined,
  aMap: Mappings
): MappingEntry | undefined {
  return isString(aKey) ? aMap.byId[aKey] : undefined;
}

function _findMappingByKind(
  aKeys: string[],
  aMap: Mappings
): MappingEntry | undefined {
  /**
   *  map
   */
  const map = aMap.byKind;
  /**
   *  iterate
   */
  const len = aKeys.length;
  for (let i = 0; i < len; ++i) {
    const mapping = map[aKeys[i]];
    if (isNotNil(mapping)) {
      return mapping;
    }
  }
  /**
   *  nothing
   */
  return undefined;
}

function _getMappingByKind(
  aKeys: string[] | null | undefined,
  aMap: Mappings
): MappingEntry | undefined {
  return isNotEmpty(aKeys) ? _findMappingByKind(aKeys, aMap) : undefined;
}

const EMPTY_ARRAY: string[] = [];
const EMPTY_LAYOUT_MODES: string[] = [DEFAULT_LAYOUT_MODE];

/**
 * Converts the value to a string array or returns the default
 *
 * @param aValue -    the value
 * @param aDefault -  the default
 * @returns an array or the default
 */
function _toStringArray(aValue: any, aDefault: string[]): string[] {
  /**
   *  converts the string
   */
  return isString(aValue)
    ? [aValue]
    : isStringArray(aValue)
    ? aValue
    : aDefault;
}

/**
 * Makes sure we have a set of IDs
 *
 * @param aMapping -  the mappings
 * @returns an array of the IDs
 */
function _getIds(aMapping: RegisteredMapping): string[] {
  /**
   *  converts the IDs to an array
   */
  return _toStringArray(aMapping.id, EMPTY_ARRAY);
}

/**
 * Makes sure we have a set of IDs
 *
 * @param aMapping -  the mappings
 * @returns an array of the IDs
 */
function _getKinds(aMapping: RegisteredMapping): string[] {
  /**
   *  converts the IDs to an array
   */
  return _toStringArray(aMapping.kind, EMPTY_ARRAY);
}

/**
 * Makes sure we have a set of layout modes
 *
 * @param aMapping -  the mappings
 * @returns an array of the layout IDs
 */
function _getLayoutModes(aMapping: RegisteredMapping): string[] {
  /**
   *  converts the layout modes to an array
   */
  return _toStringArray(aMapping.layoutMode, EMPTY_LAYOUT_MODES);
}

/**
 * Makes sure we have a list of selectors
 *
 * @param aMapping -  the mappings
 * @returns an array of the selectors
 */
function _getSelectors(aMapping: RegisteredMapping): Selector[] {
  /**
   *  decodes the selectors
   */
  const sel = aMapping.selector;
  return isStringArray(sel)
    ? sel
    : isString(sel) || isFunction(sel)
    ? [sel]
    : EMPTY_ARRAY;
}

function _registerAllMappings(
  aIds: string[],
  aModes: string[],
  aSelectors: Selector[],
  aMap: Record<string, MappingEntry>
) {
  /**
   *  simply iterate
   */
  if (isNotEmpty(aIds) && isNotEmpty(aSelectors) && isNotEmpty(aModes)) {
    /**
     *  register
     */
    aIds.forEach((id) =>
      aSelectors.forEach((sel) =>
        aModes.forEach((mode) => _onRegisterMapping(id, sel, mode, aMap))
      )
    );
  }
}

function _registerAll(
  aIds: string[],
  aKinds: string[],
  aModes: string[],
  aSelectors: Selector[],
  aMap: Mappings
): void {
  /**
   *  simply iterate
   */
  if (isNotEmpty(aSelectors)) {
    /**
     *  iterate the IDs
     */
    _registerAllMappings(aIds, aModes, aSelectors, aMap.byId);
    /**
     *  iterate the kinds
     */
    _registerAllMappings(aKinds, aModes, aSelectors, aMap.byKind);
  }
}

/**
 * Invoked to register a mapping by decorator
 *
 * @param aMapping -  the mapping
 */
function _onRegisteredMapping(
  aMapping: RegisteredMapping,
  aMap: Mappings
): void {
  /**
   *  analyze the existing annotations
   */
  _registerAll(
    _getIds(aMapping),
    _getKinds(aMapping),
    _getLayoutModes(aMapping),
    _getSelectors(aMapping),
    aMap
  );
}

/**
 * Invoked to register a particular layout mapping
 *
 * @param aId -   the ID of the entity
 * @param aSelector -   the layout selector
 * @param aLayoutMode -   the optional layout mode
 */
function _onRegisterMapping(
  aId: string,
  aSelector: Selector,
  aLayoutMode: string,
  aMap: Record<string, MappingEntry>
): void {
  /**
   *  add
   */
  if (isNotNil(aId) && isNotNil(aSelector)) {
    /**
     *  box the mode
     */
    const mode = wchBoxLayoutMode(aLayoutMode);
    /**
     *  get the entry
     */
    const entry: MappingEntry = assertObject(aId, aMap);
    /**
     *  add
     */
    entry[mode] = aSelector;
  }
}

/**
 * Returns the layout selector based on the rendering context
 *
 * @param aLayoutMode -         the layout mode
 * @param aRenderingContext -   the rendering context
 * @returns the layout selector or undefined
 */
function _getSelector(
  aLayoutMode: string,
  aRenderingContext: RenderingContextV2,
  aMap: Mappings
): string | undefined {
  /**
   *  we need a rendering context to resolve
   */
  if (isNotNil(aRenderingContext)) {
    /**
     *  the map
     */
    const mappings = aMap;

    const { $metadata } = aRenderingContext;

    /**
     *  a lookup by content ID
     */
    const entry: MappingEntry =
      _getMappingById($metadata.id, mappings) ||
      _getMappingById($metadata.type, mappings) ||
      _getMappingById($metadata.typeId, mappings) ||
      _getMappingByKind($metadata.kind, mappings);
    /**
     *  resolve by mode
     */
    if (isNotNil(entry)) {
      /**
       *  resolve by mode
       */
      const mode = wchBoxLayoutMode(aLayoutMode);
      /**
       *  resolve
       */
      return cmpGetSelector(
        mode !== DEFAULT_LAYOUT_MODE
          ? entry[mode] || entry[DEFAULT_LAYOUT_MODE]
          : entry[mode]
      );
    }
  }
}

/**
 * Registers a layout mapping
 *
 * @param aId -   the ID of the mapping
 * @param aSelector -   the selector
 * @param aLayoutMode -   the layout mode
 */
function _registerMapping(
  aId: string | string[],
  aSelector: string | string[] | Type<any>,
  aLayoutMode: string | string[],
  aMap: Mappings
): void {
  /**
   *  dispatch
   */
  _registerAll(
    _toStringArray(aId, EMPTY_ARRAY),
    EMPTY_ARRAY,
    _toStringArray(aLayoutMode, EMPTY_LAYOUT_MODES),
    cmpGetSelectors(aSelector),
    aMap
  );
}

@Injectable({ providedIn: 'root' })
export class LayoutMappingService implements LayoutMappingResolver {
  /**
   * Registers a layout mapping
   *
   * @param aId -   the ID of the mapping
   * @param aSelector -   the selector
   * @param aLayoutMode -   the layout mode
   */
  registerMapping: (
    aId: string | string[],
    aSelector: string | string[] | Type<any>,
    aLayoutMode?: string | string[]
  ) => void;

  /**
   * Returns the layout selector based on the rendering context
   *
   * @param aLayoutMode -         the layout mode
   * @param aRenderingContext -   the rendering context
   * @returns the layout selector or undefined
   */
  getSelector: (
    aLayoutMode: string,
    aRenderingContext: RenderingContextV2
  ) => string | undefined;

  constructor() {
    /**
     *  current instance
     */
    const that = this;

    /**
     * The actual registry of our mappings. This will be initialized lazily, as soon as
     * the first access to the data happens.
     */
    let mappingsMap: Mappings;

    let mappingsSubscription: Subscription;

    /** lazily initialize the component map */
    function _initMappingsMap(): Mappings {
      if (isNil(mappingsMap)) {
        /**
         *  init
         */
        const tmp: Mappings = { byId: {}, byKind: {} };

        /**
         *  update the reference
         */
        mappingsMap = tmp;

        /**
         *  register for changes
         */
        mappingsSubscription = REGISTERED_MAPPINGS.subscribe((mapping) =>
          _onRegisteredMapping(mapping, tmp)
        );
      }

      /**
       *  ok
       */
      return mappingsMap;
    }

    that.registerMapping = (
      aId: string | string[],
      aSelector: string | string[] | Type<any>,
      aLayoutMode?: string | string[]
    ): void =>
      _registerMapping(aId, aSelector, aLayoutMode, _initMappingsMap());

    that.getSelector = (
      aLayoutMode: string,
      aRenderingContext: RenderingContextV2
    ): string | undefined =>
      _getSelector(aLayoutMode, aRenderingContext, _initMappingsMap());
  }
}
