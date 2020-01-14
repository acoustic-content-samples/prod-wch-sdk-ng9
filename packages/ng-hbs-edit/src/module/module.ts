import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WchNgHbsRendererModule } from '../services/renderer/renderer.module';
import { WchNgHbsResolverEditModule } from '../services/resolver/resolver.module';
import { WchNgHbsComponentsEditModule } from './components.module';

/**
 * Module that provides handlebars based rendering functionality in edit mode. This will
 * register a resolver that resolves to the edit mode component if no other layout
 * override could be located.
 *
 * Pull in this module at root level for your application in edit mode
 */
@NgModule({
  imports: [
    CommonModule,
    WchNgHbsComponentsEditModule,
    WchNgHbsResolverEditModule,
    WchNgHbsRendererModule
  ]
})
export class WchNgHbsEditModule {}
