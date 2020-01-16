import { RenderingContextProviderV2 } from '@acoustic-content-sdk/api';
import {
  WchEditablePlaceholderDirectiveInput,
  WchEditablePlaceholderDirectiveOutput,
  WchEditablePlaceholderDirectiveService
} from '@acoustic-content-sdk/ng-edit-api';
import { Generator } from '@acoustic-content-sdk/utils';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { WchEditablePlaceholderDirective } from './editable.placeholder.directive';

@Injectable()
export class WchEditablePlaceholderDirectiveServiceImpl
  implements WchEditablePlaceholderDirectiveService {
  /**
   * Constructs an instance of the directive
   *
   * @param aElementRef - lazy reference to the element
   * @param aProvider - the rendering context provider
   * @param aInput - the input properties
   * @param aInit$ - init lifecycle
   * @param aDone$ - done lifecycle
   *
   * @returns the creator function
   */
  createDirective: (
    aElementRef: Generator<any>,
    aProvider: RenderingContextProviderV2,
    aInput: WchEditablePlaceholderDirectiveInput,
    aInit$: Observable<any>,
    aDone$: Observable<any>
  ) => WchEditablePlaceholderDirectiveOutput;

  constructor() {
    // attach the directive creator
    this.createDirective = (
      aElementRef: Generator<HTMLElement>,
      aProvider: RenderingContextProviderV2,
      aInput: WchEditablePlaceholderDirectiveInput,
      aInit$: Observable<any>,
      aDone$: Observable<any>
    ): WchEditablePlaceholderDirectiveOutput =>
      new WchEditablePlaceholderDirective(aInput, aProvider);
  }
}
