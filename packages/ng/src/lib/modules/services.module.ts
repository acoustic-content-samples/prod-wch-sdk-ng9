import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WchNgComponentRegistryModule } from './component.registry.module';
import { WchNgProtectedContentModule } from './protected.content.module';
import { WchNgSearchModule } from './search.module';

@NgModule({
  imports: [
    CommonModule,
    WchNgSearchModule,
    WchNgProtectedContentModule,
    WchNgComponentRegistryModule
  ]
})
export class WchNgServicesModule {}
