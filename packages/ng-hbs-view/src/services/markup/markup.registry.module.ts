import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WchNgMarkupRegistryService } from './markup.registry.service';

/**
 * Module that exposes a resolver for handlebars components
 */
@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: WchNgMarkupRegistryService
    }
  ]
})
export class WchNgMarkupRegistryModule {}
