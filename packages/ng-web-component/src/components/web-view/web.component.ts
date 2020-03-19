import { LoggerService, RenderingContextV2 } from '@acoustic-content-sdk/api';
import { ACOUSTIC_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import { AbstractRenderingComponent } from '@acoustic-content-sdk/ng-utils';
import { boxLoggerService, rxNext } from '@acoustic-content-sdk/utils';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  Optional
} from '@angular/core';
import { MonoTypeOperatorFunction } from 'rxjs';

import { AcNgBundleService } from '../../services/bundle/bundle.service';

const LOGGER = 'AcWebComponent';

const getSelector = (ctx: RenderingContextV2) =>
  `${ctx.$metadata.id}#${ctx.$metadata.accessor}`;

@Component({
  selector: 'ac-web-content',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.css'],
  preserveWhitespaces: false,
  /**
   * We use 'OnPush' since all changes are transported via
   * observables.
   */
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WebComponent extends AbstractRenderingComponent {
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

  constructor(
    aBundleService: AcNgBundleService,
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
  }
}
