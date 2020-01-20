import { WchNgComponentsModule } from '@acoustic-content-sdk/ng';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SitesBreadcrumbNavigationLayoutViewModule } from '../sites-breadcrumb-navigation-layout-view/sites-breadcrumb-navigation-layout-view.module';
import { SitesBreadcrumbNavigationLayoutComponent } from './sites.breadcrumb.navigation.layout';

@NgModule({
  /**
   * TODO explicitly add those modules that are used by the layout
   */
  imports: [
    CommonModule,
    WchNgComponentsModule,
    SitesBreadcrumbNavigationLayoutViewModule
  ],
  declarations: [SitesBreadcrumbNavigationLayoutComponent],
  exports: [SitesBreadcrumbNavigationLayoutComponent],
  entryComponents: [SitesBreadcrumbNavigationLayoutComponent]
})
export class SitesBreadcrumbNavigationModule {
  private readonly ref = SitesBreadcrumbNavigationLayoutComponent;
}
