import { ActivePageV2, LoggerService } from '@acoustic-content-sdk/api';
import { DeliveryContentResolver, DeliverySiteResolver } from '@acoustic-content-sdk/component-api';
import { LayoutComponent } from '@acoustic-content-sdk/ng';
import {
  WCH_TOKEN_ACTIVE_PAGE,
  WCH_TOKEN_DELIVERY_CONTENT_RESOLVER,
  WCH_TOKEN_DELIVERY_SITE_RESOLVER,
  WCH_TOKEN_LOGGER_SERVICE,
} from '@acoustic-content-sdk/ng-api';
import { ChangeDetectionStrategy, Component, Inject, Optional } from '@angular/core';

import { TypeSitesNavigationComponent } from './../../components/sites-navigation-component/type.sites.navigation.component';

/** Useful imports */
// import { map, takeUntil, distinctUntilChanged } from 'rxjs/operators';

/*
 * @name sitesBreadcrumbNavigationLayout
 * @id sites-breadcrumb-navigation-layout
 */
@LayoutComponent({
  selector: 'sites-breadcrumb-navigation-layout'
})
@Component({
  selector: 'app-sites-breadcrumb-navigation-layout-component',
  templateUrl: './sites.breadcrumb.navigation.layout.html',
  styleUrls: ['./sites.breadcrumb.navigation.layout.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false
})
export class SitesBreadcrumbNavigationLayoutComponent extends TypeSitesNavigationComponent {
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
  }
}
