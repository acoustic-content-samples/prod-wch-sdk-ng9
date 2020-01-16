import { RenderingContextProviderV2 } from '@acoustic-content-sdk/api';
import {
  WchEditableDirectiveInput,
  WchEditableDirectiveOutput,
  WchEditableDirectiveService
} from '@acoustic-content-sdk/ng-edit-api';
import { Generator } from '@acoustic-content-sdk/utils';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { WchEditableDirective } from './editable.directive';

@Injectable()
export class WchEditableDirectiveServiceImpl
  implements WchEditableDirectiveService {
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
   *
   * @internal
   */
  _create: (
    aElementRef: Generator<any>,
    aProvider: RenderingContextProviderV2,
    aInput: WchEditableDirectiveInput,
    aInit$: Observable<any>,
    aDone$: Observable<any>
  ) => WchEditableDirectiveOutput;

  constructor() {
    // attach the directive creator
    this._create = (
      aElementRef: Generator<HTMLElement>,
      aProvider: RenderingContextProviderV2,
      aInput: WchEditableDirectiveInput,
      aInit$: Observable<any>,
      aDone$: Observable<any>
    ): WchEditableDirectiveOutput =>
      new WchEditableDirective(aInput, aProvider);
  }
}
