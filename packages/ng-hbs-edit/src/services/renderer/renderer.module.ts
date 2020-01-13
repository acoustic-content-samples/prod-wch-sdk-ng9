import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HandlebarsRendererComponent } from './renderer.component';

/**
 * Module that exposes a resolver for handlebars components
 */
@NgModule({
  imports: [CommonModule],
  providers: [HandlebarsRendererComponent]
})
export class WchNgHbsRendererModule {}
