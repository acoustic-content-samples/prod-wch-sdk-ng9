import { Layout } from '@acoustic-content-sdk/api';
import { AbstractComponentTypeRefResolver } from '@acoustic-content-sdk/component-api';
import { Observable } from 'rxjs';

import { createReactContext } from '../utils/context';
import { ComponentTypeRef } from './type.ref';

/**
 * Service that resolves a component type ref given a layout.
 */
export interface ComponentTypeRefResolver
  extends AbstractComponentTypeRefResolver<ComponentTypeRef> {
  /**
   * Returns the type object based on the layout configuration
   *
   * @param aLayout -   the layout object
   * @param aLayoutMode - an optional layout mode, defaults to the default mode
   * @returns the resolved component type
   */
  getTypeByLayout: (
    aLayout: Layout,
    aLayoutMode?: string
  ) => Observable<ComponentTypeRef>;
}

/**
 * A multi-provider token used for dependency injection of the ComponentTypeRefResolvers.
 */
export const WCH_CONTEXT_COMPONENT_TYPE_REF_RESOLVERS = createReactContext<
  ComponentTypeRefResolver[]
>('WCH_CONTEXT_COMPONENT_TYPE_REF_RESOLVERS');
