import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WchNgComponentsModule } from '../../lib/modules/components.module';
import { PageLayoutComponent } from './page.layout.component';

@NgModule({
  imports: [CommonModule, WchNgComponentsModule],
  declarations: [PageLayoutComponent],
  entryComponents: [PageLayoutComponent]
})
export class PageLayoutModule {}
