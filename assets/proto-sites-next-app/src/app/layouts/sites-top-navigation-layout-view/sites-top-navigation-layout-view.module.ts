import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SitesTopNavigationLayoutViewComponent } from './sites-top-navigation-layout-view.component';

@NgModule({
  declarations: [SitesTopNavigationLayoutViewComponent],
  imports: [CommonModule, RouterModule],
  exports: [SitesTopNavigationLayoutViewComponent]
})
export class SitesTopNavigationLayoutViewModule {}
