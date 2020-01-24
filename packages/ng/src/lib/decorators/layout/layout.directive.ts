/** Copyright IBM Corp. 2017 */
import {
  CONTENT_ITEM_KIND,
  RenderingContextV2
} from '@acoustic-content-sdk/api';
import { ComponentFactoryResolver } from '@angular/core';

/**
 * Type of the Layout metadata.
 */
export interface LayoutComponentDirective {
  /**
   * Defines the mapping between the layout controller
   * to the layout implementation. If this property is missing, the selector
   * of the component will be used instead.
   */
  selector?: string | string[];

  /**
   * ID of the content item, content type or the content type name used
   * for a default layout mapping. If the ID is not given, this layout will
   * not be mapped by default.
   */
  mappingId?: string | string[];

  /**
   * An optional layout mode used with a default layout mapping.
   */
  layoutMode?: string | string[];

  /**
   * The optional component factory resolver used to instantiate the component
   */
  componentFactoryResolver?: ComponentFactoryResolver;
}

/**
 * Converts a rendering context to something else
 */
export type RenderingContextDirective<T> = (ctx: RenderingContextV2) => T;

/**
 * Type of the LayoutMapping metadata.
 */
export interface LayoutMappingDirective {
  /**
   * Defines the mapping between the layout controller
   * to the layout implementation. If this property is missing, the selector
   * of the component will be used instead.
   */
  selector?: string | string[];

  /**
   * An optional layout mode used with this layout mapping.
   */
  layoutMode?: string | string[];

  /**
   * Type IDs or content IDs to map this to
   */
  id?: string | string[];

  /**
   * Type IDs to map this to
   */
  kind?: CONTENT_ITEM_KIND | CONTENT_ITEM_KIND[];
}
