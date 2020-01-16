import {
  KEY_ID,
  KEY_METADATA,
  RenderingContextProviderV2
} from '@acoustic-content-sdk/api';
import {
  AccessorType,
  ATTR_DATA_SELECTABLE
} from '@acoustic-content-sdk/edit-api';
import {
  WchSelectableDirectiveInput,
  WchSelectableDirectiveOutput
} from '@acoustic-content-sdk/ng-edit-api';
import {
  Generator,
  isNotEmpty,
  opDistinctUntilChanged,
  pluckPath,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { Renderer2 } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { first, map, switchMapTo, takeUntil } from 'rxjs/operators';

const selectId = pluckPath<string>([KEY_METADATA, KEY_ID]);

const createSelector = (aId: string, aAccessor?: AccessorType): string =>
  isNotEmpty(aAccessor) ? `${aId}#${aAccessor}` : aId;

const setSelector = (
  aId: string,
  aElementRef: Generator<any>,
  aRenderer: Renderer2
) => aRenderer.setAttribute(aElementRef(), ATTR_DATA_SELECTABLE, aId);

export class WchSelectableDirective implements WchSelectableDirectiveOutput {
  constructor(
    aInput: WchSelectableDirectiveInput,
    aElementRef: Generator<any>,
    aRenderer: Renderer2,
    aProvider: RenderingContextProviderV2,
    aInit$: Observable<any>,
    aDone$: Observable<any>
  ) {
    // register for changes
    const { wchSelectable$ } = aInput;
    const accessor$ = rxPipe(wchSelectable$, opDistinctUntilChanged);
    // the id
    const id$ = rxPipe(
      aProvider.renderingContext$,
      map(selectId),
      opDistinctUntilChanged
    );
    // the selector
    const selector$ = rxPipe(
      combineLatest([id$, accessor$]),
      map(([id, accessor]) => createSelector(id, accessor)),
      opDistinctUntilChanged
    );
    // update the data attribute
    const update$ = rxPipe(
      aInit$,
      first(),
      switchMapTo(selector$),
      map((selector) => setSelector(selector, aElementRef, aRenderer)),
      takeUntil(aDone$)
    );
    // handle
    update$.subscribe();
  }
}
