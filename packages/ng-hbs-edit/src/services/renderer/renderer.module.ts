import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HandlebarsRendererComponent } from './renderer.component';

/**
 * Module that exposes the react component used actually perform a handlebars based
 * rendering.
 */
@NgModule({
  imports: [CommonModule],
  providers: [HandlebarsRendererComponent]
})
export class WchNgHbsRendererModule {}
