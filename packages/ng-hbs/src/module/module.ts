import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WchNgHbsResolverViewModule } from '../services/resolver/resolver.module';
import { WchNgHbsComponentsViewModule } from './components.module';

@NgModule({
  imports: [
    CommonModule,
    WchNgHbsComponentsViewModule,
    WchNgHbsResolverViewModule
  ]
})
export class WchNgHbsViewModule {}
