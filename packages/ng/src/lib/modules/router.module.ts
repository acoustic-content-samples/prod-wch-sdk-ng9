import { WchSdkVersion } from '@acoustic-content-sdk/api';
import {
  ACOUSTIC_TOKEN_ACTIVE_PAGE,
  ACOUSTIC_TOKEN_PAGE_SERVICE
} from '@acoustic-content-sdk/ng-api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PageComponent } from '../components/page/page.component';
import {
  ACOUSTIC_TOKEN_INTERNAL_ACTIVE_PAGE,
  createInternalActivePage
} from '../services/page/internal.active.page.service';
import { WchActivePageService } from '../services/page/wch.active.page.service';
import { WchSitesPageService } from '../services/page/wch.sites.page.service';
import { VERSION } from './../../version';
import { AcNgComponentsModule } from './components.module';

@NgModule({
  imports: [CommonModule, RouterModule, AcNgComponentsModule],
  declarations: [PageComponent],
  exports: [PageComponent],
  entryComponents: [PageComponent],
  providers: [
    {
      provide: ACOUSTIC_TOKEN_INTERNAL_ACTIVE_PAGE,
      useFactory: createInternalActivePage
    },
    {
      provide: ACOUSTIC_TOKEN_PAGE_SERVICE,
      useClass: WchSitesPageService
    },
    {
      provide: ACOUSTIC_TOKEN_ACTIVE_PAGE,
      useClass: WchActivePageService
    }
  ]
})
export class AcNgRouterModule {
  /**
   * Exposes the version information of this module
   */
  VERSION: WchSdkVersion = VERSION;
}
