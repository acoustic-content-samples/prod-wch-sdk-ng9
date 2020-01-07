import { CONTENT_ITEM_KIND } from '@acoustic-content-sdk/api';
import { AbstractLayoutComponentDirective } from '@acoustic-content-sdk/component-api';

export interface AbstractRegisteredLayoutMapping<TYPE> {
  /**
   * Defines the mapping between the layout controller
   * to the layout implementation. If this property is missing, the selector
   * of the component will be used instead.
   */
  selector: string | string[] | TYPE;

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

export interface AbstractRegisteredComponent<
  TYPE,
  DIRECTIVE extends AbstractLayoutComponentDirective
> {
  directive: DIRECTIVE;
  type: TYPE;
}
