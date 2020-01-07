import { RenderingContextV2 } from '@acoustic-content-sdk/api';
import { Observable } from 'rxjs';

export interface AbstractComponentResolver<T> {
  resolveComponent(
    aRenderingContext: RenderingContextV2,
    aLayoutMode?: string
  ): Observable<T>;
}
