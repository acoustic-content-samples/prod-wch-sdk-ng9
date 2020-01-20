import { ActivePageV2, Logger, LoggerService } from '@acoustic-content-sdk/api';
import { DeliveryContentResolver, DeliverySiteResolver } from '@acoustic-content-sdk/component-api';
import { LayoutComponent } from '@acoustic-content-sdk/ng';
import {
  WCH_TOKEN_ACTIVE_PAGE,
  WCH_TOKEN_DELIVERY_CONTENT_RESOLVER,
  WCH_TOKEN_DELIVERY_SITE_RESOLVER,
  WCH_TOKEN_LOGGER_SERVICE,
} from '@acoustic-content-sdk/ng-api';
import { SiteNavigationPage } from '@acoustic-content-sdk/sites-api';
import { hashRandomIdentifier, NOOP_LOGGER_SERVICE, opReplayLast, rxNext, rxPipe } from '@acoustic-content-sdk/utils';
import { ChangeDetectionStrategy, Component, Inject, OnDestroy, Optional } from '@angular/core';
import { combineLatest, MonoTypeOperatorFunction, Observable, of } from 'rxjs';
import { map, pluck, switchMap } from 'rxjs/operators';
import {
  KEY_NUMBER_OF_NAVIGATION_LEVELS,
} from 'src/app/elements/sites-navigation-component/sites.navigation.component.type';

import {
  selectId,
  TypeSitesNavigationComponent,
} from './../../components/sites-navigation-component/type.sites.navigation.component';

const LOGGER = 'SitesTopNavigationLayoutComponent';
/*
 * @name sitesTopNavigationLayout
 * @id sites-top-navigation-layout
 */
@LayoutComponent({
  selector: 'sites-top-navigation-layout'
})
@Component({
  selector: 'app-sites-top-navigation-layout-component',
  templateUrl: './sites.top.navigation.layout.html',
  styleUrls: ['./sites.top.navigation.layout.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false
})
export class SitesTopNavigationLayoutComponent
  extends TypeSitesNavigationComponent
  implements OnDestroy {
  private logger: Logger;
  topNav$: Observable<SiteNavigationPage[]>;
  showSecondaryNav$: Observable<boolean>;
  secondaryNav$: Observable<SiteNavigationPage[]>;

  constructor(
    @Inject(WCH_TOKEN_DELIVERY_SITE_RESOLVER)
    deliverySiteResolver: DeliverySiteResolver,
    @Inject(WCH_TOKEN_DELIVERY_CONTENT_RESOLVER)
    deliveryContentResolver: DeliveryContentResolver,
    @Inject(WCH_TOKEN_ACTIVE_PAGE)
    activePage: ActivePageV2,
    @Optional()
    @Inject(WCH_TOKEN_LOGGER_SERVICE)
    aLogSvc: LoggerService
  ) {
    super(deliverySiteResolver, deliveryContentResolver, activePage, aLogSvc);

    const id = hashRandomIdentifier();

    const logSvc = aLogSvc || NOOP_LOGGER_SERVICE;
    const logger = this.logger = logSvc.get(LOGGER);
    // next logger
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(
      logger,
      id
    );

    logger.info('Constructing', id);

    this.topNav$ = rxPipe(
      this.rootPage$,
      map(selectId),
      switchMap(this.selectChildrenById),
      log('Top Nav')
    );

    this.secondaryNav$ = rxPipe(
      this.breadcrumb$,
      switchMap(bc => {
        switch (bc.length) {
          case 0:
            return of([]);
          case 1:
            return rxPipe(
              this.currentPage$,
              switchMap(this.selectChildrenByPage)
            );
          default:
            return this.selectChildrenByPage(bc[1]);
        }
      }),
      log('Secondary Nav'),
      opReplayLast
    );

    const navigationLevels$ = rxPipe(
      this.renderingContext$,
      log('renderingContext'),
      pluck(KEY_NUMBER_OF_NAVIGATION_LEVELS)
    );

    this.showSecondaryNav$ = rxPipe(
      combineLatest([navigationLevels$, this.secondaryNav$]),
      map(([levels, nav]) => levels > 1 && nav.length > 0),
      log('Show Secondary Nav')
    );
  }

  isActiveClosure(): (page: SiteNavigationPage) => Observable<boolean> {
    return (page: SiteNavigationPage) => this.isActive(this, page);
  }

  isActive(context: SitesTopNavigationLayoutComponent, page: SiteNavigationPage): Observable<boolean> {
    return rxPipe(
      combineLatest([context.currentPage$, context.breadcrumb$]),
      map(
        ([cp, bc]) =>
          selectId(cp) === selectId(page) ||
          bc.map(selectId).includes(selectId(page))
      )
    );
  }

  // needed for AOT
  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
