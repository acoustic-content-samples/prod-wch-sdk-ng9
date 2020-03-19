import { WchSdkVersion } from '@acoustic-content-sdk/api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VERSION } from './../../version';
import { AcNgBundleService } from './bundle.service';

/**
 * Module that exposes a resolver for handlebars components
 */
@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: AcNgBundleService
    }
  ]
})
export class AcNgBundleModule {
  /**
   * Exposes the version information of this module
   */
  VERSION: WchSdkVersion = VERSION;
}
