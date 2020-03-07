import { ACOUSTIC_TOKEN_PRE_RENDERING_RESOLVER } from '@acoustic-content-sdk/ng-api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WchNgPreRenderingService } from './pre.rendering.service';

/**
 * Module that exposes the pre-rendering service
 */
@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: ACOUSTIC_TOKEN_PRE_RENDERING_RESOLVER,
      useClass: WchNgPreRenderingService
    }
  ]
})
export class WchNgPreRenderingModule {}
