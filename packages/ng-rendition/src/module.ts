/* Copyright IBM Corp. 2017 */
import { NgModule } from '@angular/core';

import { AcNgRenditionComponentsModule } from './modules/components.module';
import { AcNgRenditionServicesModule } from './modules/services.module';

@NgModule({
  exports: [AcNgRenditionComponentsModule, AcNgRenditionServicesModule]
})
export class AcNgRenditionModule {}
