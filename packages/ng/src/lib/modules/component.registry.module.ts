import { ACOUSTIC_TOKEN_COMPONENT_REGISTRY } from '@acoustic-content-sdk/ng-api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComponentRegistryService } from '../services/components/component.registry.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: ACOUSTIC_TOKEN_COMPONENT_REGISTRY,
      useClass: ComponentRegistryService
    }
  ]
})
export class WchNgComponentRegistryModule {}
