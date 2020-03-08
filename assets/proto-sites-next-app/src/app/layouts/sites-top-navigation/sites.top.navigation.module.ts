import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AcNgComponentsModule } from '@acoustic-content-sdk/ng';

import { SitesTopNavigationLayoutComponent } from './sites.top.navigation.layout';
import { SitesTopNavigationLayoutViewModule } from '../sites-top-navigation-layout-view/sites-top-navigation-layout-view.module';

@NgModule({
    /**
     * TODO explicitly add those modules that are used by the layout
     */
    imports: [
        CommonModule,
        AcNgComponentsModule,
        SitesTopNavigationLayoutViewModule
    ],
    declarations: [SitesTopNavigationLayoutComponent],
    exports: [SitesTopNavigationLayoutComponent],
    entryComponents: [SitesTopNavigationLayoutComponent]
})
export class SitesTopNavigationModule {
    private readonly ref = SitesTopNavigationLayoutComponent;
}
