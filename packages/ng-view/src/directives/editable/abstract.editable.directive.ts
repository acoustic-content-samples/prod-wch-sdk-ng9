import {
  AuthoringPlaceholder,
  LocalizedText,
  RenderingContextProviderV2,
  RenderingContextV2
} from '@acoustic-content-sdk/api';
import { AccessorType, WchEditableEvent } from '@acoustic-content-sdk/edit-api';
import { FALSE$, UNDEFINED$ } from '@acoustic-content-sdk/utils';
import { EMPTY, Observable } from 'rxjs';

export interface AbstractWchEditableDirectiveInput {
  /**
   * Main input value for the directive. It denotes the element that is being edited.
   */
  wchEditable$: Observable<AccessorType>;
}

export abstract class AbstractWchEditableDirective
  implements RenderingContextProviderV2 {
  /**
   * Event that tells about the inline edit process
   */
  wchEditable$: Observable<WchEditableEvent> = EMPTY;

  /**
   * Event exposing the current placeholder. If no placeholder exists or placeholders are disabled, this
   * will return 'undefined'.
   */
  placeholder$: Observable<AuthoringPlaceholder> = UNDEFINED$;

  /**
   * Event exposing the current placeholder text. If placeholders are disabled, this will return 'undefined'. If no placeholder
   * has been defined this returns the default placeholder as specified by the application, else 'undefined'.
   */
  placeholderText$: Observable<LocalizedText> = UNDEFINED$;

  /**
   * Generates the accessed data, decoded from the accessor expression
   */
  data$: Observable<any> = EMPTY;

  /**
   * Exposes the decoded accessor string into the renderign context
   */
  accessor$: Observable<string>;

  /**
   * Exposes the rendering context
   */
  renderingContext$: Observable<RenderingContextV2>;

  /**
   * Checks if we should show or hide placeholders
   */
  showPlaceholder$: Observable<boolean> = FALSE$;

  /**
   * Generates the type of the current element
   */
  typeId$: Observable<string> = EMPTY;

  protected constructor(
    aInput: AbstractWchEditableDirectiveInput,
    aProvider: RenderingContextProviderV2
  ) {
    // shorten
    const that = this;

    // input
    const { wchEditable$ } = aInput;

    // availability of the rendering context, detected from the hosting component
    const renderingContext$: Observable<RenderingContextV2> =
      aProvider.renderingContext$;

    // make the data available in any case
    that.accessor$ = wchEditable$;
    that.renderingContext$ = renderingContext$;
  }
}
