import {
  ActivePageV2,
  DeliveryContentItem,
  DeliveryReferenceElement,
  LoggerService,
  RenderingContextV2,
} from '@acoustic-content-sdk/api';
import { DeliveryContentResolver, DeliverySiteResolver } from '@acoustic-content-sdk/component-api';
import { createBreadcrumb, getNavSelectors, NavigationJson } from '@acoustic-content-sdk/redux-utils';
import { isSiteNavigationPage, SiteNavigationPage } from '@acoustic-content-sdk/sites-api';
import {
  filterTypeOf,
  isEqual,
  isNil,
  isNotEmpty,
  jsonParse,
  mapArray,
  NOOP_LOGGER_SERVICE,
  opDistinctUntilChanged,
  opFilterNotNil,
  opFilterString,
  opReplayLast,
  rxNext,
  rxPipe,
  rxSelectProperty,
  UNDEFINED$,
} from '@acoustic-content-sdk/utils';
import { OnDestroy } from '@angular/core';
import { combineLatest, MonoTypeOperatorFunction, Observable, of } from 'rxjs';
import { distinctUntilChanged, map, pluck, switchMap } from 'rxjs/operators';

import { AbstractSitesNavigationComponent } from './abstract.sites.navigation.component';

const LOGGER = 'TypeSitesNavigationComponent';

export function selectId(
  item: DeliveryContentItem | DeliveryReferenceElement | RenderingContextV2
): string {
  return item.$metadata.id;
}

/*
 * @name Sites Navigation Component
 * @id 6854f419-3b8b-4410-8d33-134a485d05a3
 */
export abstract class TypeSitesNavigationComponent
  extends AbstractSitesNavigationComponent
  implements OnDestroy {
  currentPage$: Observable<SiteNavigationPage>;
  rootPage$: Observable<SiteNavigationPage>;
  breadcrumb$: Observable<SiteNavigationPage[]>;
  selectChildrenById: (id: string) => Observable<SiteNavigationPage[]>;
  selectChildrenByPage: (
    page: SiteNavigationPage
  ) => Observable<SiteNavigationPage[]>;

  protected constructor(
    deliverySiteResolver: DeliverySiteResolver,
    deliveryContentResolver: DeliveryContentResolver,
    activePage: ActivePageV2,
    aLogSvc?: LoggerService
  ) {
    super();

    const logSvc = aLogSvc || NOOP_LOGGER_SERVICE;
    const logger = logSvc.get(LOGGER);
    // next logger
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);

    this.currentPage$ = rxPipe(
      activePage.renderingContext$,
      distinctUntilChanged((a: SiteNavigationPage, b: SiteNavigationPage) =>
        isEqual(selectId(a), selectId(b))
      ),
      filterTypeOf(isSiteNavigationPage),
      log('Current Page'),
      opReplayLast
    );

    const currentPageId$ = rxPipe(
      this.currentPage$,
      map(selectId),
      opFilterNotNil,
      log('Current Page ID')
    );

    const site$ = deliverySiteResolver.getSiteDeliveryContentItem();

    // const getDeliveryContentItem = bindMember(deliveryContentResolver, 'getDeliveryContentItem');
    const getDeliveryContentItem = (id: string) =>
      deliveryContentResolver.getDeliveryContentItem(id);

    const nav$: Observable<NavigationJson> = rxPipe(
      site$,
      pluck('navigation'),
      map(selectId),
      opFilterNotNil,
      opDistinctUntilChanged,
      switchMap(getDeliveryContentItem),
      rxSelectProperty('navigation'),
      opFilterString,
      map<string, NavigationJson>(jsonParse),
      log('NavigationJson')
    );

    const navSelectors = getNavSelectors(nav$, aLogSvc);

    const resolvePage = (pageId: string): Observable<SiteNavigationPage> =>
      rxPipe(
        getDeliveryContentItem(pageId),
        filterTypeOf(isSiteNavigationPage)
      );

    const selectParent = (pageId: string): Observable<SiteNavigationPage> => {
      return rxPipe(
        navSelectors.selectParent(pageId),
        switchMap((parentId) =>
          isEqual(parentId, navSelectors.root) || isNil(parentId)
            ? UNDEFINED$
            : resolvePage(parentId)
        )
      );
    };

    this.selectChildrenById = (
      pageId: string
    ): Observable<SiteNavigationPage[]> =>
      rxPipe(
        navSelectors.selectChildren(pageId),
        switchMap((children) =>
          isNotEmpty(children)
            ? combineLatest(mapArray(children, getDeliveryContentItem))
            : of([])
        ),
        map((children) =>
          mapArray(children.filter(isSiteNavigationPage), (c) => c)
        )
      );

    this.selectChildrenByPage = (
      page: SiteNavigationPage
    ): Observable<SiteNavigationPage[]> =>
      this.selectChildrenById(selectId(page));

    this.breadcrumb$ = rxPipe(
      currentPageId$,
      log('Getting breadcrumb for page ID: '),
      switchMap((currentPageId) =>
        createBreadcrumb<SiteNavigationPage>(
          currentPageId,
          selectParent,
          selectId
        )
      ),
      log('Breadcrumb'),
      opReplayLast
    );

    this.rootPage$ = rxPipe(
      this.breadcrumb$,
      opFilterNotNil,
      switchMap((bc) => (bc.length === 0 ? this.currentPage$ : of(bc[0]))),
      log('Root Page'),
      opReplayLast
    );
  }
}
