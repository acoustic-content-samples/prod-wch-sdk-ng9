import {
  AuthoringPlaceholder,
  LocalizedText,
  RenderingContextProviderV2
} from '@acoustic-content-sdk/api';
import { AccessorType, WchEditableEvent } from '@acoustic-content-sdk/edit-api';
import { ACOUSTIC_TOKEN_RENDERING_CONTEXT_PROVIDER } from '@acoustic-content-sdk/ng-api';
import {
  ACOUSTIC_TOKEN_EDITABLE_DIRECTIVE_SERVICE,
  WchEditableDirectiveInput,
  WchEditableDirectiveOutput,
  WchEditableDirectiveService
} from '@acoustic-content-sdk/ng-edit-api';
import {
  assignObject,
  BiConsumer,
  createSetterOnSubject,
  createSingleSubject,
  Generator
} from '@acoustic-content-sdk/utils';
import {
  Directive,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Observable, Subject } from 'rxjs';

const assignProps: BiConsumer<
  WchEditableDirectiveOutput,
  WchEditableDirectiveOutput
> = (
  aDst: WchEditableDirectiveOutput,
  {
    accessor$,
    wchEditable$,
    placeholder$,
    placeholderText$,
    showPlaceholder$,
    typeId$,
    data$
  }: WchEditableDirectiveOutput
) =>
  assignObject(aDst, {
    accessor$,
    wchEditable$,
    placeholder$,
    placeholderText$,
    showPlaceholder$,
    typeId$,
    data$
  });

/**
 * Directive that allows an element of a layout to be editable.
 *
 * @remarks
 * The directive relies on a `RenderingContextProviderV2` in the injection chain to tell which element is currently being rendered.
 *
 * @privateRemarks
 * This class is only a proxy. The actual implementation is injected via the `WchEditableDirectiveService` service, which
 * allows us to inject a real (expensive) implementation in edit mode and a noop implementation in view mode. Afaik there is
 * no way to directly inject a directive, hence the split.
 */
@Directive({
  selector: ':not(wch-placeholder)[wchEditable]:not([wchFormat])',
  exportAs: 'wchEditable'
})
export class EditableDirective
  implements OnDestroy, OnInit, WchEditableDirectiveOutput {
  /**
   * Main input value for the directive. It denotes the element that is being edited.
   */
  @Input()
  wchEditable: AccessorType;

  /**
   * The accessor expression
   */
  @Output()
  accessor$: Observable<string>;

  /**
   * Event that tells about the inline edit process
   */
  @Output()
  wchEditable$: Observable<WchEditableEvent>;

  /**
   * Event exposing the current placeholder. If no placeholder exists or placeholders are disabled, this
   * will return `undefined`.
   */
  @Output()
  placeholder$: Observable<AuthoringPlaceholder>;

  /**
   * Event exposing the current placeholder text. If placeholders are disabled, this will return. If no placeholder
   * has been defined this returns the default placeholder as specified by the application
   */
  @Output()
  placeholderText$: Observable<LocalizedText>;

  /**
   * Checks if we should show or hide placeholders
   */
  @Output()
  showPlaceholder$: Observable<boolean>;

  /**
   * Generates the type of the current element
   */
  @Output()
  typeId$: Observable<string>;

  /**
   * Generates the accessed data, decoded from the accessor expression
   */
  @Output()
  data$: Observable<any>;

  private readonly onInit$: Subject<any>;

  private readonly onDone$: Subject<any>;

  constructor(
    aElementRef: ElementRef,
    @Inject(ACOUSTIC_TOKEN_RENDERING_CONTEXT_PROVIDER)
    aProvider: RenderingContextProviderV2,
    @Inject(ACOUSTIC_TOKEN_EDITABLE_DIRECTIVE_SERVICE)
    aService: WchEditableDirectiveService
  ) {
    // life cycle hooks
    const onInit$ = (this.onInit$ = createSingleSubject());
    const onDone$ = (this.onDone$ = createSingleSubject());
    // element generator
    const elementRef: Generator<any> = () => aElementRef.nativeElement;

    // the accessor definitions
    const onWchEditable = createSingleSubject<AccessorType>();

    Object.defineProperties(this, {
      wchEditable: createSetterOnSubject(onWchEditable)
    });

    // input
    const input: WchEditableDirectiveInput = {
      wchEditable$: onWchEditable.asObservable()
    };

    // construct the directive
    const output: WchEditableDirectiveOutput = aService._create(
      elementRef,
      aProvider,
      input,
      onInit$,
      onDone$
    );

    // assign the properties
    assignProps(this, output);
  }

  ngOnInit() {
    this.onInit$.next();
  }

  ngOnDestroy() {
    this.onDone$.next();
  }
}
