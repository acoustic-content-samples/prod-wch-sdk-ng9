import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AcNgComponentRegistryModule } from './component.registry.module';
import { AcNgProtectedContentModule } from './protected.content.module';
import { AcNgSearchModule } from './search.module';

@NgModule({
  imports: [
    CommonModule,
    AcNgSearchModule,
    AcNgProtectedContentModule,
    AcNgComponentRegistryModule
  ]
})
export class AcNgServicesModule {}
