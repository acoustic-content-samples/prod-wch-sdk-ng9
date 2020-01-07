import { Layout } from '@acoustic-content-sdk/api';
import { Observable } from 'rxjs';

import { AbstractComponentTypeRefResolver } from '../type/type.ref.resolver';

export interface AbstractComponentsRegistry<TYPE>
  extends AbstractComponentTypeRefResolver<TYPE> {
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
}
