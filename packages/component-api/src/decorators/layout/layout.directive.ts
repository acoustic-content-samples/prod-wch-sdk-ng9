/** Copyright IBM Corp. 2017 */
import { CONTENT_ITEM_KIND } from '@acoustic-content-sdk/api';

/**
 * Type of the Layout metadata.
 */
export interface AbstractLayoutComponentDirective {
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
}

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
