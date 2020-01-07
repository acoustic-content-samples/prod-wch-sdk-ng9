import { AbstractRenderingComponent } from '@acoustic-content-sdk/ng-utils';
import { Component } from '@angular/core';

import { LayoutComponent } from '../../lib/decorators/layout/layout.decorator';

@LayoutComponent({
  selector: 'page-layout'
})
@Component({
  selector: 'wch-page-layout-component',
  templateUrl: './page.layout.html',
  styleUrls: ['./page.layout.scss']
})
export class PageLayoutComponent extends AbstractRenderingComponent {
  constructor() {
    super();
  }
}
