import {
  LoggerService,
  RenderingContextProviderV2,
  RenderingContextV2
} from '@acoustic-content-sdk/api';
import {
  RenderingContextInput,
  RenderingContextResolver
} from '@acoustic-content-sdk/component-api';
import {
  ComponentTypeRef,
  WCH_TOKEN_LOGGER_SERVICE,
  WCH_TOKEN_RENDERING_CONTEXT_PROVIDER,
  WCH_TOKEN_RENDERING_CONTEXT_RESOLVER
} from '@acoustic-content-sdk/ng-api';
import {
  cacheLast,
  createSetterOnSubject,
  createSingleSubject,
  DEFAULT_LAYOUT_MODE,
  KEY_LAYOUT_MODE,
  NOOP_LOGGER_SERVICE,
  opCacheLast,
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
  Output,
  SkipSelf
} from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  merge,
  MonoTypeOperatorFunction,
  Observable,
  of,
  ReplaySubject
} from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ComponentResolverService } from '../../services/components/component.resolver.service';
import {
  defineProperties,
  isEqualComponentTypeRef
} from '../../utils/js.utils';
import {
  createRenderingContextProviderV2Proxy,
  KEY_DEBUG
} from '../rendering.context.provider';
import { ComponentState } from './../../directives/contentref.directive';

const KEY_CTX = 'ctx';

const LOGGER = 'ContentComponent';

@Component({
  selector: 'wch-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  preserveWhitespaces: false,
  providers: [
    {
      provide: WCH_TOKEN_RENDERING_CONTEXT_PROVIDER,
      useFactory: createRenderingContextProviderV2Proxy
    }
  ],
  /**
   * We use 'OnPush' since all changes are transported via
   * observables.
   */
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent implements RenderingContextProviderV2 {
  /**
   * Rendering context used to render the component reference
   */
  @Input() ctx: RenderingContextInput;

  /**
   * Points to a piece of external content
   */
  @Input() id: string;

  /**
   * Layout mode used to render the component reference.
   */
  @Input() layoutMode: string;

  /**
   * Output that will be triggered when a new component was created
   */
  @Output() readonly component$: ReplaySubject<any> = createSingleSubject();

  /**
   * The current type to render
   */
  @Output() readonly type$: Observable<ComponentTypeRef<any>>;

  /**
   * The current rendering context
   */
  @Output() readonly renderingContext$: Observable<RenderingContextV2>;

  /**
   * The component state
   */
  readonly state$: Observable<ComponentState>;

  constructor(
    @Inject(WCH_TOKEN_RENDERING_CONTEXT_RESOLVER)
    aRenderingContextResolver: RenderingContextResolver,
    aComponentResolverService: ComponentResolverService,
    @SkipSelf()
    @Inject(WCH_TOKEN_RENDERING_CONTEXT_PROVIDER)
    aParentProvider: RenderingContextProviderV2,
    @Inject(WCH_TOKEN_RENDERING_CONTEXT_PROVIDER)
    aProvider: RenderingContextProviderV2,
    @Optional()
    @Inject(WCH_TOKEN_LOGGER_SERVICE)
    aLogSvc: LoggerService
  ) {
    // access the magic keys
    const parentId = aParentProvider[KEY_DEBUG];
    const id = aProvider[KEY_DEBUG];
    // logger
    const logSvc = aLogSvc || NOOP_LOGGER_SERVICE;
    // logger
    const logger = logSvc.get(LOGGER);
    // next logger
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(
      logger,
      id
    );

    // log this
    logger.info('Constructing', id, 'in', parentId);

    /**
     *  handle
     */
    const that = this;

    /**
     * Changes to the input
     */
    const ctxSubject = createSingleSubject<RenderingContextInput>();

    /**
     * Changes to the input
     */
    const idSubject = createSingleSubject<string>();

    /**
     * Changes to the layout mode
     */
    const modeSubject = new BehaviorSubject<string>(DEFAULT_LAYOUT_MODE);

    /**
     * handle changes
     */
    const ctx$ = rxPipe(merge(ctxSubject, idSubject), opDistinctUntilChanged);
    const layoutMode$ = rxPipe(modeSubject, opDistinctUntilChanged);

    /**
     *  attach the change handler
     */
    const renderingContext$: Observable<RenderingContextV2> = (this.renderingContext$ = aProvider.renderingContext$ = rxPipe(
      ctx$,
      // debounceTime(0),
      switchMap((ctx) =>
        aRenderingContextResolver.resolveRenderingContext(ctx, aParentProvider)
      ),
      opCacheLast
    ));

    /**
     *  the type
     */
    const type$: Observable<ComponentTypeRef<any>> = (this.type$ = rxPipe(
      combineLatest([layoutMode$, renderingContext$]),
      // debounceTime(0),
      switchMap(([layoutMode, renderingContext]) =>
        aComponentResolverService.resolveComponent(renderingContext, layoutMode)
      ),
      cacheLast(isEqualComponentTypeRef)
    ));

    /**
     * Combines the latest changes
     */
    this.state$ = combineLatest([
      type$,
      renderingContext$,
      layoutMode$,
      of(id)
    ]);

    // construct the setters
    defineProperties(that, {
      [KEY_CTX]: createSetterOnSubject(ctxSubject),
      [KEY_LAYOUT_MODE]: createSetterOnSubject(modeSubject)
    });
  }
}
