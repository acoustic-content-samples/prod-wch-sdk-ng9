import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WchNgProtectedContentModule } from './protected.content.module';
import { WchNgSearchModule } from './search.module';

@NgModule({
  imports: [CommonModule, WchNgSearchModule, WchNgProtectedContentModule]
})
export class WchNgServicesModule {}
