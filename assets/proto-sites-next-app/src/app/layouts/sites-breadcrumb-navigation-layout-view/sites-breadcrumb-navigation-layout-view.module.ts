import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SitesBreadcrumbNavigationLayoutViewComponent } from './sites-breadcrumb-navigation-layout-view.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [SitesBreadcrumbNavigationLayoutViewComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SitesBreadcrumbNavigationLayoutViewComponent
  ]
})
export class SitesBreadcrumbNavigationLayoutViewModule { }
