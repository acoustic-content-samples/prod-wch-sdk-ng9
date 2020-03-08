/* Copyright IBM Corp. 2017 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WchRenditionService } from './../services/rendition/wch.rendition.service';

@NgModule({
  imports: [CommonModule],
  providers: [WchRenditionService]
})
export class AcNgRenditionServicesModule {}
