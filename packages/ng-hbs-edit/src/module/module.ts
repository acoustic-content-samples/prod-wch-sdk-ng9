import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WchNgHbsRendererModule } from '../services/renderer/renderer.module';
import { WchNgHbsResolverEditModule } from '../services/resolver/resolver.module';
import { WchNgHbsComponentsEditModule } from './components.module';

@NgModule({
  imports: [
    CommonModule,
    WchNgHbsComponentsEditModule,
    WchNgHbsResolverEditModule,
    WchNgHbsRendererModule
  ]
})
export class WchNgHbsEditModule {}
