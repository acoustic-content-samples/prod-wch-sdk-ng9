import { RenderingContextProviderV2 } from '@acoustic-content-sdk/api';
import {
  WchSelectableDirectiveInput,
  WchSelectableDirectiveOutput,
  WchSelectableDirectiveService
} from '@acoustic-content-sdk/ng-edit-api';
import { Generator } from '@acoustic-content-sdk/utils';
import { Injectable, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';

import { WchSelectableDirective } from './selectable.directive';

@Injectable()
export class WchSelectableDirectiveServiceImpl
  implements WchSelectableDirectiveService {
  /**
   * Constructs an instance of the directive
   *
   * @param aElementRef - lazy reference to the element
   * @param aProvider - the rendering context provider
   * @param aInput - the input properties
   * @param aInit$ - init lifecycle
   * @param aDone$ - done lifecycle
   * @param aRenderer - the renderer, since we cannot instantiate it in a service
   *
   * @returns the creator function
   *
   * @internal
   */
  _create: (
    aElementRef: Generator<any>,
    aProvider: RenderingContextProviderV2,
    aInput: WchSelectableDirectiveInput,
    aInit$: Observable<any>,
    aDone$: Observable<any>,
    aRenderer: Renderer2
  ) => WchSelectableDirectiveOutput;

  constructor() {
    // attach the directive creator
    this._create = (
      aElementRef: Generator<HTMLElement>,
      aProvider: RenderingContextProviderV2,
      aInput: WchSelectableDirectiveInput,
      aInit$: Observable<any>,
      aDone$: Observable<any>,
      aRenderer: Renderer2
    ): WchSelectableDirectiveOutput =>
      new WchSelectableDirective(
        aInput,
        aElementRef,
        aRenderer,
        aProvider,
        aInit$,
        aDone$
      );
  }
}
