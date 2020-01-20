import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { SiteNavigationPage } from '@acoustic-content-sdk/sites-api';

@Component({
  selector: 'app-sites-breadcrumb-navigation-layout-view',
  templateUrl: './sites-breadcrumb-navigation-layout-view.component.html',
  styleUrls: ['./sites-breadcrumb-navigation-layout-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SitesBreadcrumbNavigationLayoutViewComponent implements OnInit {

  @Input()
  currentPage$: Observable<SiteNavigationPage>;

  @Input()
  breadcrumb$: Observable<SiteNavigationPage[]>;
  constructor() { }

  ngOnInit() {
  }

}
