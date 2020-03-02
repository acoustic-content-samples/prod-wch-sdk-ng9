/* Copyright IBM Corp. 2017 */
import { ACOUSTIC_TOKEN_DELIVERY_SITE_RESOLVER } from '@acoustic-content-sdk/ng-api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SiteResolverService } from './site.resolver.service';

/**
 * {@link https://angular.io/guide/ngmodules|Angular Module} that exposes an implementation of `ACOUSTIC_TOKEN_DELIVERY_SITE_RESOLVER`.
 */
@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: ACOUSTIC_TOKEN_DELIVERY_SITE_RESOLVER,
      useClass: SiteResolverService
    }
  ]
})
export class WchNgRestSiteModule {}
