/* Copyright IBM Corp. 2017 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RenditionDirective } from './../directives/rendition/rendition.directive';
import { SrcSetDirective } from './../directives/rendition/srcset.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [RenditionDirective, SrcSetDirective],
  providers: [],
  exports: [RenditionDirective, SrcSetDirective],
  entryComponents: []
})
export class WchNgRenditionComponentsModule {}
