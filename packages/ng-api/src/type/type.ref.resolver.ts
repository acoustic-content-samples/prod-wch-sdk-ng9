import { Layout } from '@acoustic-content-sdk/api';
import { AbstractComponentTypeRefResolver } from '@acoustic-content-sdk/component-api';
import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { ComponentTypeRef } from './type.ref';

/**
 * Service that resolves a component type ref given a layout.
 */
export interface ComponentTypeRefResolver
  extends AbstractComponentTypeRefResolver<ComponentTypeRef<any>> {
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
}

/**
 * A multi-provider token used for dependency injection of the {@link ComponentTypeRefResolver}s.
 *
 * @example
 * ```typescript
 * providers: [
 *   {
 *      provide: ACOUSTIC_TOKEN_COMPONENT_TYPE_REF_RESOLVERS,
 *      useClass: MyResolver,
 *      multi: true
 *   }
 * ]
 * ```
 *
 */
export const ACOUSTIC_TOKEN_COMPONENT_TYPE_REF_RESOLVERS = new InjectionToken<
  ComponentTypeRefResolver[]
>('ACOUSTIC_TOKEN_COMPONENT_TYPE_REF_RESOLVERS');
