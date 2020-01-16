import { RenderingContextProviderV2 } from '@acoustic-content-sdk/api';
import { AccessorType } from '@acoustic-content-sdk/edit-api';
import { WCH_TOKEN_RENDERING_CONTEXT_PROVIDER } from '@acoustic-content-sdk/ng-api';
import {
  WchSelectableDirectiveInput,
  WchSelectableDirectiveOutput,
  WchSelectableDirectiveService,
  WCH_TOKEN_SELECTABLE_DIRECTIVE_SERVICE
} from '@acoustic-content-sdk/ng-edit-api';
import {
  BiConsumer,
  createSetterOnSubject,
  createSingleSubject,
  Generator,
  noop
} from '@acoustic-content-sdk/utils';
import {
  Directive,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';

const assignProps: BiConsumer<
  WchSelectableDirectiveOutput,
  WchSelectableDirectiveOutput
> = noop;

/**
 * Directive that allow an element to be selectable.
 *
 * @remarks
 * The directive relies on a `RenderingContextProviderV2` in the injection chain to tell which element is currently being rendered.
 *
 * @privateRemarks
 * This class is only a proxy. The actual implementation is injected via the `WchSelectableDirectiveService` service, which
 * allows us to inject a real implementation in edit mode and a noop implementation in view mode. Afaik there is
 * no way to directly inject a directive, hence the split.
 */
@Directive({
  selector: '[wchSelectable]',
  exportAs: 'wchSelectable'
})
export class SelectableDirective
  implements OnInit, OnDestroy, WchSelectableDirectiveOutput {
  /**
   * Main input value for the directive. It denotes the element that can be selected.
   */
  @Input()
  wchSelectable: AccessorType;

  private readonly onDone$;

  private readonly onInit$;

  constructor(
    aElementRef: ElementRef,
    @Inject(WCH_TOKEN_RENDERING_CONTEXT_PROVIDER)
    aProvider: RenderingContextProviderV2,
    @Inject(WCH_TOKEN_SELECTABLE_DIRECTIVE_SERVICE)
    aService: WchSelectableDirectiveService
  ) {
    // life cycle hooks
    const onInit$ = (this.onInit$ = createSingleSubject());
    const onDone$ = (this.onDone$ = createSingleSubject());
    // element generator
    const elementRef: Generator<any> = () => aElementRef.nativeElement;

    // the accessor definitions
    const onWchSelectable = createSingleSubject<AccessorType>();

    Object.defineProperties(this, {
      wchSelectable: createSetterOnSubject(onWchSelectable)
    });

    // input
    const input: WchSelectableDirectiveInput = {
      wchSelectable$: onWchSelectable.asObservable()
    };

    // construct the directive
    const output: WchSelectableDirectiveOutput = aService.createDirective(
      elementRef,
      aProvider,
      input,
      onInit$,
      onDone$
    );

    assignProps(this, output);
  }

  ngOnInit() {
    this.onInit$.next();
  }

  ngOnDestroy() {
    this.onDone$.next();
  }
}
