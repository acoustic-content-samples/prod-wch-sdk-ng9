import {
  Layout,
  LoggerService,
  RenderingContextV2
} from '@acoustic-content-sdk/api';
import { LayoutResolver } from '@acoustic-content-sdk/component-api';
import {
  ACOUSTIC_TOKEN_LAYOUT_RESOLVER,
  ACOUSTIC_TOKEN_LOGGER_SERVICE
} from '@acoustic-content-sdk/ng-api';
import { AbstractRenderingComponent } from '@acoustic-content-sdk/ng-utils';
import {
  boxLoggerService,
  firstElement,
  mapArray,
  opFilterNotNil,
  pluckProperty,
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
import { combineLatest, MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AcNgBundleService } from '../../services/bundle/bundle.service';
import { selectBundleUrl } from '../../utils/utils';

const LOGGER = 'AcWebComponent';

const KEY_TAGS = 'tags';

/**
 * Extracts the tags from the layout
 */
const selectTags = pluckProperty<Layout, typeof KEY_TAGS>(KEY_TAGS, []);

/**
 * Returns the bundle selector from the layout
 *
 * @param aLayout - the layout
 * @returns the bundle selector
 */
const getBundleSelector = (aLayout: Layout) =>
  firstElement(mapArray(selectTags(aLayout), selectBundleUrl));

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

  @Output()
  selector$: Observable<any>;

  constructor(
    aBundleService: AcNgBundleService,
    @Inject(ACOUSTIC_TOKEN_LAYOUT_RESOLVER)
    aLayoutResolver: LayoutResolver,
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
    // access the context
    const selector$ = rxPipe(
      combineLatest([this.layoutMode$, this.renderingContext$]),
      switchMap(([layoutMode, rc]) =>
        aLayoutResolver.resolveLayout(layoutMode, rc)
      ),
      log('layout'),
      map(getBundleSelector),
      log('selector'),
      opFilterNotNil,
      switchMap((selector) => aBundleService.get(selector)),
      log('component')
    );
    // decode the bundle identifier
    this.selector$ = selector$;
  }
}
