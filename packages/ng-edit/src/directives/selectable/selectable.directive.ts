import {
  KEY_ID,
  KEY_METADATA,
  RenderingContextProviderV2
} from '@acoustic-content-sdk/api';
import {
  AccessorType,
  ATTR_DATA_SELECTABLE
} from '@acoustic-content-sdk/edit-api';
import { WCH_TOKEN_RENDERING_CONTEXT_PROVIDER } from '@acoustic-content-sdk/ng-api';
import {
  createSetterOnSubject,
  createSingleSubject,
  isNotEmpty,
  opDistinctUntilChanged,
  pluckPath,
  rxPipe
} from '@acoustic-content-sdk/utils';
import {
  Directive,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Renderer2
} from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { first, map, switchMapTo, takeUntil } from 'rxjs/operators';

const selectId = pluckPath<string>([KEY_METADATA, KEY_ID]);

const createSelector = (aId: string, aAccessor?: AccessorType): string =>
  isNotEmpty(aAccessor) ? `${aId}#${aAccessor}` : aId;

const setSelector = (aId: string, aElement: ElementRef, aRenderer: Renderer2) =>
  aRenderer.setAttribute(aElement.nativeElement, ATTR_DATA_SELECTABLE, aId);

@Directive({
  selector: '[wchSelectable]',
  exportAs: 'wchSelectable'
})
export class WchSelectableDirective implements OnInit, OnDestroy {
  /**
   * Main input value for the directive. It denotes the element that can be selected.
   */
  @Input()
  wchSelectable: AccessorType;

  private readonly done$ = createSingleSubject();

  private readonly init$ = createSingleSubject();

  constructor(
    aElement: ElementRef,
    aRenderer: Renderer2,
    @Inject(WCH_TOKEN_RENDERING_CONTEXT_PROVIDER)
    aProvider: RenderingContextProviderV2
  ) {
    // shorten
    const that = this;
    // register for changes
    const accessorSubject = new BehaviorSubject<string>(undefined);
    const accessor$ = rxPipe(accessorSubject, opDistinctUntilChanged);
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
      that.init$,
      first(),
      switchMapTo(selector$),
      map((selector) => setSelector(selector, aElement, aRenderer)),
      takeUntil(that.done$)
    );
    // handle
    update$.subscribe();
    // create a setter
    Object.defineProperties(that, {
      wchSelectable: createSetterOnSubject(accessorSubject)
    });
  }

  ngOnDestroy() {
    this.done$.next();
  }

  ngOnInit() {
    this.init$.next();
  }
}
