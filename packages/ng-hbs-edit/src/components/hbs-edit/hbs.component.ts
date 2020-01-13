import {
  KEY_ID,
  KEY_METADATA,
  LoggerService,
  RenderingContextV2
} from '@acoustic-content-sdk/api';
import { WCH_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import { AbstractRenderingComponent } from '@acoustic-content-sdk/ng-utils';
import { rxSelect } from '@acoustic-content-sdk/redux-store';
import {
  NOOP_LOGGER_SERVICE,
  pluckPath,
  rxNext,
  rxPipe
} from '@acoustic-content-sdk/utils';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  Optional
} from '@angular/core';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';

const LOGGER = 'HandlebarsComponent';

const selectId = pluckPath<string>([KEY_METADATA, KEY_ID]);

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
   * the currently selected item
   */
  contentItemId$: Observable<string>;

  constructor(
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
    // extract the ID of the item
    const contentItemId$ = rxPipe(
      this.renderingContext$,
      rxSelect(selectId),
      log('id')
    );

    // attach the markup observable
    this.contentItemId$ = contentItemId$;
  }
}
