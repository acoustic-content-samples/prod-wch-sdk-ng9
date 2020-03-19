import { WchSdkVersion } from '@acoustic-content-sdk/api';
import { ACOUSTIC_TOKEN_COMPONENT_REGISTRY } from '@acoustic-content-sdk/ng-api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComponentRegistryService } from '../services/components/component.registry.service';
import { VERSION } from './../../version';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: ACOUSTIC_TOKEN_COMPONENT_REGISTRY,
      useClass: ComponentRegistryService
    }
  ]
})
export class AcNgComponentRegistryModule {
  /**
   * Exposes the version information of this module
   */
  VERSION: WchSdkVersion = VERSION;
}
