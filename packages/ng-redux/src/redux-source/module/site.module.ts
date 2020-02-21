/* Copyright IBM Corp. 2017 */
import { ACOUSTIC_TOKEN_DELIVERY_SITE_RESOLVER } from '@acoustic-content-sdk/ng-api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SiteResolverService } from '../site/site.resolver.service';
import { WchNgReduxContentModule } from './content.module';

@NgModule({
  imports: [CommonModule, WchNgReduxContentModule],
  providers: [
    {
      provide: ACOUSTIC_TOKEN_DELIVERY_SITE_RESOLVER,
      useClass: SiteResolverService
    }
  ]
})
export class WchNgReduxSiteModule {}
