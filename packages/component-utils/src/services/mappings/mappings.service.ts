import { RenderingContextV2 } from '@acoustic-content-sdk/api';
import { LayoutMappingResolver } from '@acoustic-content-sdk/component-api';
import {
  assertObject,
  DEFAULT_LAYOUT_MODE,
  isNotEmpty,
  isNotNil,
  isString,
  isStringArray,
  wchBoxLayoutMode
} from '@acoustic-content-sdk/utils';

import { cmpGetSelector, cmpGetSelectors } from './../../utils/component.utils';

declare type Selector = string;

/**
 * Maps from layout mode to selector
 */
declare type MappingEntry = Record<string, Selector>;

interface Mappings {
  byId: Record<string, MappingEntry>;
  byKind: Record<string, MappingEntry>;
}

function getMappingById(
  aKey: string | null | undefined,
  aMap: Mappings
): MappingEntry | undefined {
  return isString(aKey) ? aMap.byId[aKey] : undefined;
}

function findMappingByKind(
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

function getMappingByKind(
  aKeys: string[] | null | undefined,
  aMap: Mappings
): MappingEntry | undefined {
  return isNotEmpty(aKeys) ? findMappingByKind(aKeys, aMap) : undefined;
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
function toStringArray(aValue: any, aDefault: string[]): string[] {
  /**
   *  converts the string
   */
  return isString(aValue)
    ? [aValue]
    : isStringArray(aValue)
    ? aValue
    : aDefault;
}

function registerAllMappings(
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
        aModes.forEach((mode) => onRegisterMapping(id, sel, mode, aMap))
      )
    );
  }
}

function registerAll(
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
    registerAllMappings(aIds, aModes, aSelectors, aMap.byId);
    /**
     *  iterate the kinds
     */
    registerAllMappings(aKinds, aModes, aSelectors, aMap.byKind);
  }
}

/**
 * Invoked to register a particular layout mapping
 *
 * @param aId -   the ID of the entity
 * @param aSelector -   the layout selector
 * @param aLayoutMode -   the optional layout mode
 */
function onRegisterMapping(
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
function getSelector(
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
      getMappingById($metadata.id, mappings) ||
      getMappingById($metadata.type, mappings) ||
      getMappingById($metadata.typeId, mappings) ||
      getMappingByKind($metadata.kind, mappings);
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
function registerMapping(
  aId: string | string[],
  aSelector: string | string[],
  aLayoutMode: string | string[],
  aMap: Mappings
): void {
  /**
   *  dispatch
   */
  registerAll(
    toStringArray(aId, EMPTY_ARRAY),
    EMPTY_ARRAY,
    toStringArray(aLayoutMode, EMPTY_LAYOUT_MODES),
    cmpGetSelectors(aSelector),
    aMap
  );
}

export class AbstractLayoutMappingResolver implements LayoutMappingResolver {
  /**
   * Registers a layout mapping
   *
   * @param aId -   the ID of the mapping
   * @param aSelector -   the selector
   * @param aLayoutMode -   the layout mode
   */
  registerMapping: (
    aId: string | string[],
    aSelector: string | string[],
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

  protected constructor() {
    /**
     *  current instance
     */
    const that = this;

    /**
     * The actual registry of our mappings. This will be initialized lazily, as soon as
     * the first access to the data happens.
     */
    const mappingsMap: Mappings = { byId: {}, byKind: {} };

    that.registerMapping = (
      aId: string | string[],
      aSelector: string | string[],
      aLayoutMode?: string | string[]
    ): void => registerMapping(aId, aSelector, aLayoutMode, mappingsMap);

    that.getSelector = (
      aLayoutMode: string,
      aRenderingContext: RenderingContextV2
    ): string | undefined =>
      getSelector(aLayoutMode, aRenderingContext, mappingsMap);
  }
}
