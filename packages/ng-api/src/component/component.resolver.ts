import { RenderingContextV2 } from '@acoustic-content-sdk/api';
import { AbstractComponentResolver } from '@acoustic-content-sdk/component-api';
import { Observable } from 'rxjs';

import { ComponentTypeRef } from './../type/type.ref';

export interface ComponentResolver
  extends AbstractComponentResolver<ComponentTypeRef<any>> {
  resolveComponent(
    aRenderingContext: RenderingContextV2,
    aLayoutMode?: string
  ): Observable<ComponentTypeRef<any>>;
}
