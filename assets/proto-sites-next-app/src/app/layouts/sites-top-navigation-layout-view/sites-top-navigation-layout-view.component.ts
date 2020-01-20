import { SiteNavigationPage } from '@acoustic-content-sdk/sites-api';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sites-top-navigation-layout-view',
  templateUrl: './sites-top-navigation-layout-view.component.html',
  styleUrls: ['./sites-top-navigation-layout-view.component.scss'],
  animations: [
    trigger('slide', [
      state(
        '*',
        style({
          transform: 'none',
          marginBottom: '0',
          visibility: 'visible'
        })
      ),
      state(
        'void',
        style({
          visibility: 'hidden'
        })
      ),
      transition('void <=> *', animate('1s cubic-bezier(0.25, 0.8, 0.25, 1)'))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SitesTopNavigationLayoutViewComponent implements OnInit {
  @Input()
  rootPage: SiteNavigationPage;

  @Input()
  currentPage: SiteNavigationPage;

  @Input()
  topNav: SiteNavigationPage[];

  @Input()
  secondaryNav: SiteNavigationPage[];

  @Input()
  showSecondaryNav: boolean;

  @Input()
  isActive: (page: SiteNavigationPage) => boolean;

  constructor() {}

  ngOnInit() {}
}
