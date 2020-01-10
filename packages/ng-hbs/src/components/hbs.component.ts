import { LoggerService, RenderingContextV2 } from '@acoustic-content-sdk/api';
import {
  HandlebarsProcessor,
  HandlebarsResolver,
  LayoutResolver
} from '@acoustic-content-sdk/component-api';
import {
  WCH_TOKEN_HANDLEBARS_RESOLVER,
  WCH_TOKEN_LAYOUT_RESOLVER,
  WCH_TOKEN_LOGGER_SERVICE
} from '@acoustic-content-sdk/ng-api';
import { AbstractRenderingComponent } from '@acoustic-content-sdk/ng-utils';
import {
  anyToString,
  escapeHtml,
  isNotNil,
  NOOP_LOGGER_SERVICE,
  opDistinctUntilChanged,
  rxNext,
  rxPipe,
  rxSelectProperty
} from '@acoustic-content-sdk/utils';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  Optional,
  Output
} from '@angular/core';
import { combineLatest, MonoTypeOperatorFunction, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

const LOGGER = 'HandlebarsComponent';

interface Processor {
  id: string;
  processor: HandlebarsProcessor;
}

/**
 * Apply the handlebars template to a context
 *
 * @param processor - the processor to invoke
 * @param aContext - the context
 *
 * @returns the resulting markup string
 */
function safeApplyTemplate(
  { id, processor }: Processor,
  aContext: RenderingContextV2
): string {
  try {
    return processor(aContext);
  } catch (error) {
    // error string
    const message = `${id}: ${anyToString(error)}`;
    // error markup
    return `<div>${escapeHtml(message)}</div>`;
  }
}

const emptyProcessor = (aId: string): HandlebarsProcessor => () =>
  `<div>${escapeHtml(aId)}</div>`;

@Component({
  selector: 'wch-hbs-content',
  templateUrl: './hbs.component.html',
  styleUrls: ['./hbs.component.css'],
  preserveWhitespaces: false,
  /**
   * We use 'OnPush' since all changes are transported via
   * observables.
   */
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HandlebarsComponent extends AbstractRenderingComponent {
  /**
   * rendering context input
   */
  @Input()
  renderingContext: RenderingContextV2;
  /**
   * layout mode
   */
  @Input()
  layoutMode: string;
  /**
   * The markup string to be rendered
   */
  @Output()
  markup$: Observable<string>;

  /** ID of the handlebars template */
  @Output()
  templateId$: Observable<string>;

  constructor(
    @Inject(WCH_TOKEN_HANDLEBARS_RESOLVER)
    aHandlebarsResolver: HandlebarsResolver,
    @Inject(WCH_TOKEN_LAYOUT_RESOLVER)
    aLayoutResolver: LayoutResolver,
    @Optional()
    @Inject(WCH_TOKEN_LOGGER_SERVICE)
    aLogSvc: LoggerService
  ) {
    super();
    // logger
    const logSvc = aLogSvc || NOOP_LOGGER_SERVICE;
    const logger = logSvc.get(LOGGER);
    // log
    const log: <T>(value: string) => MonoTypeOperatorFunction<T> = rxNext(
      logger
    );
    // resolution callbacks
    const resolveLayout = (
      aLayoutMode: string,
      aRenderingContext: RenderingContextV2
    ) => aLayoutResolver.resolveLayout(aLayoutMode, aRenderingContext);
    const getHandlebarsProcessor = (aId: string) =>
      isNotNil(aId)
        ? aHandlebarsResolver.getHandlebarsProcessor(aId)
        : of(emptyProcessor(aId));

    // access some props
    const { layoutMode$, renderingContext$ } = this;
    // resolve the layout
    const layout$ = rxPipe(
      combineLatest([layoutMode$, renderingContext$]),
      switchMap(([layoutMode, renderingContext]) =>
        resolveLayout(layoutMode, renderingContext)
      ),
      opDistinctUntilChanged,
      log('layout')
    );
    // template ID
    const templateId$ = rxPipe(
      layout$,
      rxSelectProperty('template'),
      log('templateId')
    );
    // resolve the processor
    const processor$ = rxPipe(
      templateId$,
      switchMap((id) =>
        rxPipe(
          getHandlebarsProcessor(id),
          map((processor) => ({ id, processor }))
        )
      )
    );
    // generate the markup
    const markup$ = rxPipe(
      combineLatest([processor$, renderingContext$]),
      map(([processor, renderingContext]) =>
        safeApplyTemplate(processor, renderingContext)
      ),
      opDistinctUntilChanged,
      log('markup')
    );
    // attach the markup observable
    this.markup$ = markup$;
  }
}
