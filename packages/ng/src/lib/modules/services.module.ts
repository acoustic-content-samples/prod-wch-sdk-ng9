import { WchSdkVersion } from '@acoustic-content-sdk/api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VERSION } from './../../version';
import { AcNgComponentRegistryModule } from './component.registry.module';
import { AcNgProtectedContentModule } from './protected.content.module';
import { AcNgSearchModule } from './search.module';
import { AcNgSdkModule } from './sdk.module';

@NgModule({
  imports: [
    CommonModule,
    AcNgSearchModule,
    AcNgProtectedContentModule,
    AcNgComponentRegistryModule,
    AcNgSdkModule
  ]
})
export class AcNgServicesModule {
  /**
   * Exposes the version information of this module
   */
  VERSION: WchSdkVersion = VERSION;
}
