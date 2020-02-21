import {
  KEY_ACCESSOR,
  KEY_ID,
  KEY_METADATA,
  LoggerService,
  RenderingContextV2
} from '@acoustic-content-sdk/api';
import { AccessorType } from '@acoustic-content-sdk/edit-api';
import { ACOUSTIC_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import { AbstractRenderingComponent } from '@acoustic-content-sdk/ng-utils';
import { rxSelect } from '@acoustic-content-sdk/redux-store';
import {
  isNotEmpty,
  Maybe,
  boxLoggerService,
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
import { combineLatest, MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const LOGGER = 'HandlebarsComponent';

const selectId = pluckPath<string>([KEY_METADATA, KEY_ID]);

const selectAccessor = pluckPath<string>([KEY_METADATA, KEY_ACCESSOR]);

const createContentItemId = (
  aId?: string,
  aAccessor?: AccessorType
): Maybe<string> =>
  isNotEmpty(aId) && isNotEmpty(aAccessor) ? `${aId}#${aAccessor}` : aId;

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
    @Inject(ACOUSTIC_TOKEN_LOGGER_SERVICE)
    aLogSvc: LoggerService
  ) {
    super();
    // logger
    const logSvc = boxLoggerService(aLogSvc);
    const logger = logSvc.get(LOGGER);
    // log
    const log: <T>(value: string) => MonoTypeOperatorFunction<T> = rxNext(
      logger
    );
    // extract the ID of the item
    const id$ = rxPipe(this.renderingContext$, rxSelect(selectId), log('id'));

    // extract the accessor
    const accessor$ = rxPipe(
      this.renderingContext$,
      rxSelect(selectAccessor),
      log('accessor')
    );

    // combine
    const contentItemId$ = rxPipe(
      combineLatest([id$, accessor$]),
      map(([id, accessor]) => createContentItemId(id, accessor)),
      log('content item id')
    );

    // attach the markup observable
    this.contentItemId$ = contentItemId$;
  }
}
