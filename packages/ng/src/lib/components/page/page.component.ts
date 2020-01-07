import {
  DeliveryContentItem,
  LoggerService,
  RenderingContextProviderV2,
  RenderingContextV2
} from '@acoustic-content-sdk/api';
import {
  WchNgPageService,
  WCH_TOKEN_LAYOUT_RESOLVER,
  WCH_TOKEN_LOGGER_SERVICE,
  WCH_TOKEN_PAGE_SERVICE,
  WCH_TOKEN_RENDERING_CONTEXT_PROVIDER
} from '@acoustic-content-sdk/ng-api';
import { AbstractBaseComponent } from '@acoustic-content-sdk/ng-utils';
import {
  createSingleSubject,
  isNil,
  isString,
  NOOP_LOGGER_SERVICE,
  opCacheLast,
  rxNext,
  rxPipe
} from '@acoustic-content-sdk/utils';
import {
  ChangeDetectionStrategy,
  Component,
  Host,
  Inject,
  NgZone,
  OnDestroy,
  Optional,
  Output
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import {
  combineLatest,
  MonoTypeOperatorFunction,
  Observable,
  ReplaySubject,
  Subject
} from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

import { WCH_TOKEN_INTERNAL_ACTIVE_PAGE } from '../../services/page/internal.active.page.service';
import { selectId, selectMetadata } from '../../utils/selectors';
import {
  createRenderingContextProviderV2Proxy,
  KEY_DEBUG
} from '../rendering.context.provider';
import { LayoutResolverService } from './../../services/layout/layout.resolver.service';
import {
  opAssertInAngularZone,
  ZoneService
} from './../../services/zone/zone.service';

const _META_NAME_ID = 'id';
const _META_NAME_DESCRIPTION = 'description';
const _EMPTY_VALUE = '';

/**
 * Makes sure to return a string value
 *
 * @param aValue -
 */
function _boxValue(aValue?: string): string {
  return isString(aValue) ? aValue : _EMPTY_VALUE;
}

/**
 * Sets the metadata tag
 *
 * @param aMetaService - the service
 * @param aId - the ID
 * @param aValue - the value
 */
function _setMetaTag(aMetaService: Meta, aId: string, aValue?: string) {
  /**
   *  dispatch
   */
  aMetaService.updateTag({ name: aId, content: _boxValue(aValue) });
}

/**
 * Sets the title tag
 *
 * @param aMetaService - the service
 * @param aValue - the value
 */
function _setTitleTag(aTitle: Title, aValue?: string) {
  /**
   *  dispatch
   */
  aTitle.setTitle(_boxValue(aValue));
}

/**
 * Extracts the title
 *
 * @param aSitePage -   the page
 * @param aRenderingContext -   the context
 *
 * @returns the title
 */
function _getTitle(aRenderingContext: RenderingContextV2): string {
  /**
   *  extract the title
   */
  return aRenderingContext.$metadata.name;
}

/**
 * Extracts the description
 *
 * @param aSitePage -   the page
 * @param aRenderingContext -   the context
 *
 * @returns the description
 */
function _getDescription(aRenderingContext: RenderingContextV2): string {
  /**
   *  extract the title
   */
  return aRenderingContext.$metadata.description;
}

/**
 * Updates page metadata with the info from the rendering context
 *
 * @param aContext -  the context
 */
function _updateMetaData(
  aContext: RenderingContextV2,
  aTitleService: Title,
  aMetaService: Meta
) {
  /**
   *  handle the case that we don't know have a rendering context
   */
  const $metadata = selectMetadata(aContext);
  if (isNil($metadata)) {
    /**
     *  remove
     */
    _setTitleTag(aTitleService, _EMPTY_VALUE);
    _setMetaTag(aMetaService, _META_NAME_ID, _EMPTY_VALUE);
    _setMetaTag(aMetaService, _META_NAME_DESCRIPTION, _EMPTY_VALUE);
  } else {
    /**
     *  update title
     */
    _setTitleTag(aTitleService, _getTitle(aContext));
    _setMetaTag(aMetaService, _META_NAME_ID, selectId($metadata));
    _setMetaTag(
      aMetaService,
      _META_NAME_DESCRIPTION,
      _getDescription(aContext)
    );
  }
}

/**
 * Combines the active pieces of the state into one single object
 */
export declare type ComponentState = [DeliveryContentItem, string];

const LOGGER = 'PageComponent';

/**
 * The page component monitors
 */
@Component({
  selector: 'wch-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
  preserveWhitespaces: false,
  providers: [
    {
      provide: WCH_TOKEN_RENDERING_CONTEXT_PROVIDER,
      useFactory: createRenderingContextProviderV2Proxy
    },
    {
      provide: WCH_TOKEN_LAYOUT_RESOLVER,
      useExisting: LayoutResolverService
    }
  ],
  /**
   * We use 'OnPush' since all changes are transported via
   * observables.
   */
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageComponent extends AbstractBaseComponent
  implements OnDestroy, RenderingContextProviderV2 {
  /**
   * Fires whenever the layout mode changed, includes the initial default mode.
   */
  @Output() readonly layoutMode$: Observable<string>;

  /**
   * The rendering context for the page. This is the context
   * of the element that is referenced by the currently active route.
   */
  @Output() readonly renderingContext$: Observable<RenderingContextV2>;

  /**
   * Event that propagates the newly created component
   */
  @Output() readonly component$: ReplaySubject<any> = createSingleSubject();

  /**
   * The component state
   */
  readonly state$: Observable<ComponentState>;

  constructor(
    aZoneService: ZoneService,
    aRoute: ActivatedRoute,
    @Inject(WCH_TOKEN_PAGE_SERVICE)
    aPageService: WchNgPageService,
    @Inject(WCH_TOKEN_INTERNAL_ACTIVE_PAGE)
    aActivePage: Subject<RenderingContextV2>,
    aTitleService: Title,
    aMetaService: Meta,
    @Host()
    @Inject(WCH_TOKEN_RENDERING_CONTEXT_PROVIDER)
    aProvider: RenderingContextProviderV2,
    @Optional()
    @Inject(WCH_TOKEN_LOGGER_SERVICE)
    aLogSvc: LoggerService
  ) {
    /**
     *  default
     */
    super();
    // access the ID
    const id = aProvider[KEY_DEBUG];

    // get the logger
    const logSvc = aLogSvc || NOOP_LOGGER_SERVICE;
    const logger = logSvc.get(LOGGER);
    // next logger
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(
      logger,
      id
    );

    // log this
    logger.info('Constructing', id);

    /**
     *  attach to the mode
     */
    const { layoutMode$, onDestroy$ } = this;

    /**
     *  attach to the path
     */
    const renderingContext$ = (this.renderingContext$ = aProvider.renderingContext$ = rxPipe(
      // listen for the route
      aRoute.url,
      // log the route
      log('segments'),
      // context for the active page
      switchMap((segments) =>
        aPageService.getRenderingContextByUrlSegments(segments)
      ),
      /**
       * Compute outside of Angular
       */
      aZoneService.subscribeOutside(),
      /**
       * Monitor for changes
       */
      opCacheLast,
      /**
       * Make sure to observe inside
       */
      aZoneService.observeInside(),
      /**
       *  end at the right point in time
       */
      takeUntil(onDestroy$)
    ));

    /**
     * Combines the latest changes
     */
    this.state$ = rxPipe(
      combineLatest([renderingContext$, layoutMode$]),

      opAssertInAngularZone()
    );

    /**
     * Handles updates to the rendering context by updating the page title
     * and sending the current context to the internal observable.
     */
    function handleUpdate(aContext: RenderingContextV2) {
      /**
       * Sanity check
       */
      NgZone.assertInAngularZone();
      /**
       * Update metadata
       */
      _updateMetaData(aContext, aTitleService, aMetaService);
      /**
       * Update service
       */
      aActivePage.next(aContext);
    }

    /**
     * Subscribe to updates. We will unsubscribe when the component gets deleted
     */
    rxPipe(renderingContext$, map(handleUpdate)).subscribe();
  }

  /**
   *  just dispatch, otherwise the method will not be recognized
   */
  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
