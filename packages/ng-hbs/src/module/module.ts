import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WchNgHbsComponentsEditModule } from './components.module';
import { WchNgHbsResolverEditModule } from '../services/resolver/resolver.module';

@NgModule({
  imports: [
    CommonModule,
    WchNgHbsComponentsEditModule,
    WchNgHbsResolverEditModule
  ]
})
export class WchNgHbsEditModule {}
