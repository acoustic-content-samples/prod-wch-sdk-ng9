import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AcNgComponentsModule } from '../../lib/modules/components.module';
import { PageLayoutComponent } from './page.layout.component';

@NgModule({
  imports: [CommonModule, AcNgComponentsModule],
  declarations: [PageLayoutComponent],
  entryComponents: [PageLayoutComponent]
})
export class PageLayoutModule {}
