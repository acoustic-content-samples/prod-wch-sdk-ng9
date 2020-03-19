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
  isNotNil,
  KEY_LAYOUT_MODE,
  KEY_RENDERING_CONTEXT,
  mapArray,
  opDistinctUntilChanged,
  opFilterNotNil,
  opShareLast,
  pluckProperty,
  rxNext,
  rxPipe
} from '@acoustic-content-sdk/utils';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  Optional
} from '@angular/core';
import { combineLatest, merge, MonoTypeOperatorFunction } from 'rxjs';
import { map, scan, switchMap, takeUntil } from 'rxjs/operators';
import { AcNgBundleService } from '../../services/bundle/bundle.service';
import { selectBundleUrl } from '../../utils/utils';

const LOGGER = 'WebComponent';

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
  firstElement(mapArray(selectTags(aLayout), selectBundleUrl).filter(isNotNil));

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
export class WebComponent extends AbstractRenderingComponent
  implements AfterViewInit, OnDestroy {
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
    aElementRef: ElementRef,
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
    // lifecycle triggers
    const init$ = this.afterContentInit$;
    const done$ = this.onDestroy$;
    // native element
    const element$ = rxPipe(
      init$,
      map(() => aElementRef.nativeElement),
      log('element')
    );
    // access the context
    const name$ = rxPipe(
      combineLatest([this.layoutMode$, this.renderingContext$]),
      switchMap(([layoutMode, rc]) =>
        aLayoutResolver.resolveLayout(layoutMode, rc)
      ),
      log('layout'),
      map(getBundleSelector),
      log('selector'),
      opFilterNotNil,
      opDistinctUntilChanged,
      switchMap((selector) => aBundleService.get(selector)),
      log('component')
    );
    // compose the component
    const component$ = rxPipe(
      combineLatest([name$, element$]),
      scan((aComponent: HTMLElement, [name, parent]: [string, HTMLElement]) => {
        // cleanup
        if (isNotNil(aComponent)) {
          // log this
          logger.info('Deleting old component', aComponent);
          // delete old component
          aComponent.parentNode.removeChild(aComponent);
        }
        // log this
        logger.info('Adding new component', name);
        // construct the new component
        return parent.appendChild(parent.ownerDocument.createElement(name));
      }, undefined),
      opShareLast
    );
    // attach the component to the layout mode and the rendering context
    const layoutMode$ = rxPipe(this.layoutMode$, opDistinctUntilChanged);
    const rc$ = rxPipe(this.renderingContext$, opDistinctUntilChanged);
    // attach
    const updateMode$ = rxPipe(
      combineLatest([component$, layoutMode$]),
      map(([cmp, mode]) => (cmp[KEY_LAYOUT_MODE] = mode))
    );
    const updateContext$ = rxPipe(
      combineLatest([component$, rc$]),
      map(([cmp, rc]) => (cmp[KEY_RENDERING_CONTEXT] = rc))
    );
    // combine everything
    rxPipe(merge(updateMode$, updateContext$), takeUntil(done$)).subscribe();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
