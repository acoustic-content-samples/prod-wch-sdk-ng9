/* Copyright IBM Corp. 2017 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IntersectionDirective } from './../directives/intersection/intersection.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [IntersectionDirective],
  exports: [IntersectionDirective]
})
export class AcNgIntersectionModule {}
