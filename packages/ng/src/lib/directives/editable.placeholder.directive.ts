import {
  AuthoringPlaceholder,
  LocalizedText,
  RenderingContextProviderV2
} from '@acoustic-content-sdk/api';
import { AccessorType, WchEditableEvent } from '@acoustic-content-sdk/edit-api';
import { WCH_TOKEN_RENDERING_CONTEXT_PROVIDER } from '@acoustic-content-sdk/ng-api';
import {
  WCH_TOKEN_EDITABLE_PLACEHOLDER_DIRECTIVE_SERVICE,
  WchEditableFormat,
  WchEditablePlaceholderDirectiveInput,
  WchEditablePlaceholderDirectiveOutput,
  WchEditablePlaceholderDirectiveService
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
import { BehaviorSubject, Observable, Subject } from 'rxjs';

const assignProps: BiConsumer<
  WchEditablePlaceholderDirectiveOutput,
  WchEditablePlaceholderDirectiveOutput
> = (
  aDst: WchEditablePlaceholderDirectiveOutput,
  {
    accessor$,
    wchEditable$,
    placeholder$,
    placeholderText$,
    showPlaceholder$,
    typeId$,
    data$,
    plainText$,
    formattedText$
  }: WchEditablePlaceholderDirectiveOutput
) =>
  assignObject(aDst, {
    accessor$,
    wchEditable$,
    placeholder$,
    placeholderText$,
    showPlaceholder$,
    typeId$,
    data$,
    plainText$,
    formattedText$
  });

/**
 * Directive that allows an element of a layout to be editable. This version of the directive will also automatically inject
 * a placeholder text in edit mode.
 *
 * @remarks
 * The directive relies on a `RenderingContextProviderV2` in the injection chain to tell which element is currently being rendered.
 *
 * @privateRemarks
 * This class is only a proxy. The actual implementation is injected via the `WchEditablePlaceholderDirectiveService` service, which
 * allows us to inject a real (expensive) implementation in edit mode and a noop implementation in view mode. Afaik there is
 * no way to directly inject a directive, hence the split.
 */
@Directive({
  selector: ':not(wch-placeholder)[wchEditable][wchFormat]',
  exportAs: 'wchEditable'
})
export class EditablePlaceholderDirective
  implements OnInit, OnDestroy, WchEditablePlaceholderDirectiveOutput {
  /**
   * Main input value for the directive. It denotes the element that is being edited.
   */
  @Input()
  wchEditable: AccessorType;

  /**
   * If specified, the directive will update the textual content of the attached node with
   * either the value of the edited property or with the configured placeholder, if there is any. The
   * format flag describes if the value is considered to be plain text ('text'), formatted text ('html') or
   * if the type is to be discovered automatically.
   *
   * If missing, the property has to be updated by the designer of the template, explicitly.
   */
  @Input()
  wchFormat: WchEditableFormat;

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
   * Event exposing the current placeholder. Note that this fill only fire if the application
   * runs in preview mode. In live mode this is just the empty event.
   */
  @Output()
  placeholder$: Observable<AuthoringPlaceholder>;

  /**
   * Event exposing the current placeholder text. Note that this fill only fire if the application
   * runs in preview mode. In live mode this is just the empty event. If no placeholder
   * has been defined this returns the default placeholder as specified by the application
   */
  @Output()
  placeholderText$: Observable<LocalizedText>;

  /**
   * Generates the text of an element, potentially replaced by the placeholder
   */
  @Output()
  plainText$: Observable<LocalizedText>;

  /**
   * Generates the formatted text of an element, potentially replaced by the placeholder
   */
  @Output()
  formattedText$: Observable<LocalizedText>;

  /**
   * Generates the accessed data, decoded from the accessor expression
   */
  @Output()
  data$: Observable<any>;

  /**
   * Generates the type of the current element
   */
  @Output()
  typeId$: Observable<string>;

  /**
   * Checks if we should show or hide placeholders
   */
  @Output()
  showPlaceholder$: Observable<boolean>;

  private readonly onInit$: Subject<any>;

  private readonly onDone$: Subject<any>;

  constructor(
    aElementRef: ElementRef,
    @Inject(WCH_TOKEN_RENDERING_CONTEXT_PROVIDER)
    aProvider: RenderingContextProviderV2,
    @Inject(WCH_TOKEN_EDITABLE_PLACEHOLDER_DIRECTIVE_SERVICE)
    aService: WchEditablePlaceholderDirectiveService
  ) {
    // life cycle hooks
    const onInit$ = (this.onInit$ = createSingleSubject());
    const onDone$ = (this.onDone$ = createSingleSubject());
    // element generator
    const elementRef: Generator<any> = () => aElementRef.nativeElement;

    // the accessor definitions
    const onWchEditable = createSingleSubject<AccessorType>();
    const onWchFormat = new BehaviorSubject<WchEditableFormat>(null);

    Object.defineProperties(this, {
      wchEditable: createSetterOnSubject(onWchEditable),
      wchFormat: createSetterOnSubject(onWchFormat)
    });

    // input
    const input: WchEditablePlaceholderDirectiveInput = {
      wchEditable$: onWchEditable.asObservable(),
      wchFormat$: onWchFormat.asObservable()
    };

    // construct the directive
    const output: WchEditablePlaceholderDirectiveOutput = aService.createDirective(
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
