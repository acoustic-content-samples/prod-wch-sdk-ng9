import {
  AuthoringPlaceholder,
  LocalizedText,
  LoggerService,
  RenderingContextProviderV2,
  RenderingContextV2
} from '@acoustic-content-sdk/api';
import { AccessorType } from '@acoustic-content-sdk/edit-api';
import {
  WCH_TOKEN_LOGGER_SERVICE,
  WCH_TOKEN_RENDERING_CONTEXT_PROVIDER
} from '@acoustic-content-sdk/ng-api';
import {
  WCH_TOKEN_PLACEHOLDER_PROVIDER,
  WchPlaceholder,
  WchPlaceholderProvider
} from '@acoustic-content-sdk/ng-edit-api';
import { AbstractLifeCycleComponent } from '@acoustic-content-sdk/ng-utils';
import {
  createSetterOnSubject,
  createSingleSubject,
  NOOP_LOGGER_SERVICE,
  opDistinctUntilChanged,
  opShareLast,
  rxNext,
  rxPipe
} from '@acoustic-content-sdk/utils';
import {
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output
} from '@angular/core';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import {
  opOnAccessor,
  opOnData,
  opOnFormattedText,
  opOnPlaceholder,
  opOnPlaceholderText,
  opOnPlainText,
  opOnShowPlaceholder,
  opOnTypeId
} from '../../services/placeholders/placeholders.impl';

const LOGGER = 'WchPlaceholderComponent';

@Component({
  selector: 'wch-placeholder [wchEditable]',
  templateUrl: './wch.placeholder.html',
  styleUrls: ['./wch.placeholder.scss']
})
export class WchPlaceholderComponent extends AbstractLifeCycleComponent
  implements OnInit, OnDestroy, RenderingContextProviderV2, WchPlaceholder {
  /**
   * Main input value for the directive. It denotes the element that is being edited.
   */
  @Input()
  wchEditable: AccessorType;

  /**
   * Exposes the rendering context
   */
  @Output()
  renderingContext$: Observable<RenderingContextV2>;

  /**
   * Checks if we should show or hide placeholders
   */
  @Output()
  showPlaceholder$: Observable<boolean>;

  /**
   * Event exposing the current placeholder. If no placeholder exists or placeholders are disabled, this
   * will return 'undefined'.
   */
  @Output()
  placeholder$: Observable<AuthoringPlaceholder>;

  /**
   * Event exposing the current placeholder text. If placeholders are disabled, this will return 'undefined'. If no placeholder
   * has been defined this returns the default placeholder as specified by the application, else 'undefined'.
   */
  @Output()
  placeholderText$: Observable<LocalizedText>;

  /**
   * Generates the accessed data, decoded from the accessor expression
   */
  @Output()
  data$: Observable<any>;

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
   * The accessor expression
   */
  @Output()
  accessor$: Observable<string>;

  /**
   * Decodes the type of the currently accessed element
   */
  @Output()
  typeId$: Observable<string>;

  constructor(
    @Inject(WCH_TOKEN_RENDERING_CONTEXT_PROVIDER)
    aProvider: RenderingContextProviderV2,
    @Inject(WCH_TOKEN_PLACEHOLDER_PROVIDER)
    aPhProvider: WchPlaceholderProvider,
    @Optional()
    @Inject(WCH_TOKEN_LOGGER_SERVICE)
    aLoggerService: LoggerService
  ) {
    super();

    const that = this;
    // logger
    const logSvc = aLoggerService || NOOP_LOGGER_SERVICE;

    // some logging
    const logger = logSvc.get(LOGGER);
    const log: <T>(value: string) => MonoTypeOperatorFunction<T> = rxNext(
      logger
    );

    // the accessor definitions
    const onWchEditable = createSingleSubject<AccessorType>();

    Object.defineProperties(that, {
      wchEditable: createSetterOnSubject(onWchEditable)
    });

    // attach to lifecycle hooks
    const init$ = that.onInit$;
    const opUntilDestroyed: <T>(
      src: Observable<T>
    ) => Observable<T> = takeUntil(that.onDestroy$);

    // attach to the parent rendering context
    const renderingContext$ = aProvider.renderingContext$;

    // lookup the editable
    const wchPlaceholder$ = rxPipe(
      onWchEditable,
      map((acc) => aPhProvider.getPlaceholder(acc, aProvider)),
      opShareLast
    );

    // attach to the placeholder
    const placeholder$ = rxPipe(wchPlaceholder$, opOnPlaceholder);

    /**
     * Expose the placeholder text
     */
    const placeholderText$ = rxPipe(wchPlaceholder$, opOnPlaceholderText);

    // attach to the data
    const data$ = rxPipe(wchPlaceholder$, opOnData);

    // attach to the plain text
    const plainText$ = rxPipe(wchPlaceholder$, opOnPlainText);

    // attach to the formatted text
    const formattedText$ = rxPipe(wchPlaceholder$, opOnFormattedText);

    // attach to the type
    const typeId$ = rxPipe(wchPlaceholder$, opOnTypeId);

    // attach to the accessor
    const accessor$ = rxPipe(
      wchPlaceholder$,
      opOnAccessor,
      log('accessor'),
      opDistinctUntilChanged
    );

    /**
     * Test if we would show placeholders
     */
    const showPlaceholder$ = rxPipe(wchPlaceholder$, opOnShowPlaceholder);

    // attach to our fields
    that.renderingContext$ = rxPipe(renderingContext$, opUntilDestroyed);
    that.placeholderText$ = rxPipe(placeholderText$, opUntilDestroyed);
    that.placeholder$ = rxPipe(placeholder$, opUntilDestroyed);
    that.data$ = rxPipe(data$, opUntilDestroyed);
    that.plainText$ = rxPipe(plainText$, opUntilDestroyed);
    that.formattedText$ = rxPipe(formattedText$, opUntilDestroyed);
    that.accessor$ = rxPipe(accessor$, opUntilDestroyed);
    that.showPlaceholder$ = rxPipe(showPlaceholder$, opUntilDestroyed);
    that.typeId$ = rxPipe(typeId$, opUntilDestroyed);
  }

  // AOT workaround
  ngOnInit() {
    // just dispatch, AOT seems to need this
    super.ngOnInit();
  }

  // AOT workaround
  ngOnDestroy() {
    // just dispatch, AOT seems to need this
    super.ngOnDestroy();
  }
}
