import { LoggerService, RenderingContextV2 } from '@acoustic-content-sdk/api';
import { ACOUSTIC_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import { AbstractRenderingComponent } from '@acoustic-content-sdk/ng-utils';
import {
  boxLoggerService,
  opDistinctUntilChanged,
  rxNext,
  rxPipe
} from '@acoustic-content-sdk/utils';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  Optional,
  Output
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { handleInternalPathClick } from '@acoustic-content-sdk/utils';
import { AcNgMarkupRegistryService } from '../../services/markup/markup.registry.service';

const LOGGER = 'HandlebarsComponent';

const getSelector = (ctx: RenderingContextV2) =>
  `${ctx.$metadata.id}#${ctx.$metadata.accessor}`;

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
  markup$: Observable<SafeHtml>;

  @Output()
  handleInternalPathClick: Function;

  @Output()
  e: Event;

  constructor(
    aMarkupRegistry: AcNgMarkupRegistryService,
    aDomSanitizer: DomSanitizer,
    @Optional()
    @Inject(ACOUSTIC_TOKEN_LOGGER_SERVICE)
    aLogSvc?: LoggerService
  ) {
    super();
    // logger
    const logSvc = boxLoggerService(aLogSvc);
    const logger = logSvc.get(LOGGER);
    // log
    const log: <T>(value: string) => MonoTypeOperatorFunction<T> = rxNext(
      logger
    );
    // the selector
    this.markup$ = rxPipe(
      this.renderingContext$,
      map(getSelector),
      opDistinctUntilChanged,
      log('selector'),
      switchMap((selector) => aMarkupRegistry.get(selector)),
      log('markup'),
      opDistinctUntilChanged,
      map((markup) => aDomSanitizer.bypassSecurityTrustHtml(markup)),
      takeUntil(this.onDestroy$)
    );

    this.handleInternalPathClick = handleInternalPathClick;
  }
}
