import { Layout } from '@acoustic-content-sdk/api';
import { Observable } from 'rxjs';

/**
 * Service that resolves a component type ref given a layout.
 */
export interface AbstractComponentTypeRefResolver<T> {
  /**
   * Returns the type object based on the layout configuration
   *
   * @param aLayout -   the layout object
   * @param aLayoutMode - an optional layout mode, defaults to the default mode
   * @returns the type
   */
  getTypeByLayout: (aLayout: Layout, aLayoutMode?: string) => Observable<T>;
}
