import { RenderingContextV2 } from '@acoustic-content-sdk/api';
import { AbstractComponentResolver } from '@acoustic-content-sdk/component-api';
import { Observable } from 'rxjs';

import { createReactContext } from '../utils/context';
import { ComponentTypeRef } from './../type/type.ref';

export interface ComponentResolver
  extends AbstractComponentResolver<ComponentTypeRef> {
  resolveComponent(
    aRenderingContext: RenderingContextV2,
    aLayoutMode?: string
  ): Observable<ComponentTypeRef>;
}

export const ACOUSTIC_CONTEXT_COMPONENT_RESOLVER = createReactContext<
  ComponentResolver
>('ACOUSTIC_CONTEXT_COMPONENT_RESOLVER');
