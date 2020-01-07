import { RenderingContext } from '@acoustic-content-sdk/api';
import { ComponentTypeRef } from '@acoustic-content-sdk/ng-api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { createSymbol } from '../../utils/symbol';

export type MarkupGenerator = (
  context: RenderingContext,
  options?: any
) => string;

export interface MarkupProvider {
  compile(aURL: string, aTemplateString: string): Observable<MarkupGenerator>;
  getComponentTypeRef(): ComponentTypeRef<any>;
}

export interface MarkupProviders {
  [layoutType: string]: MarkupProvider;
}

const KEY_PROVIDERS = createSymbol();

@Injectable({ providedIn: 'root' })
export class MarkupService {
  constructor() {
    this[KEY_PROVIDERS] = {};
  }

  get markupProviders(): MarkupProviders {
    return this[KEY_PROVIDERS] as MarkupProviders;
  }

  registerProvider(aLayoutType: string, aProvider: MarkupProvider) {
    /**
     *  register the provider
     */
    this[KEY_PROVIDERS][aLayoutType] = aProvider;
  }
}
