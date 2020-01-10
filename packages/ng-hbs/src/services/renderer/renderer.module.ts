import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RenderService } from './renderer';

@NgModule({
  imports: [CommonModule],
  providers: [RenderService]
})
export class WchNgHbsRendererModule {}
