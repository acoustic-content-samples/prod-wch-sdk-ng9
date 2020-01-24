/** Copyright IBM Corp. 2017 */
import { NgModule } from '@angular/core';

import { WchNgRenditionComponentsModule } from './modules/components.module';
import { WchNgRenditionServicesModule } from './modules/services.module';

@NgModule({
  exports: [WchNgRenditionComponentsModule, WchNgRenditionServicesModule]
})
export class WchNgRenditionModule {}
