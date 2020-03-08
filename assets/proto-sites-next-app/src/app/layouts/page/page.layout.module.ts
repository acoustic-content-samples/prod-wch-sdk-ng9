import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AcNgComponentsModule } from '@acoustic-content-sdk/ng';

import { PageLayoutComponent } from './page.layout.component';

@NgModule({
  declarations: [PageLayoutComponent],
  imports: [CommonModule, AcNgComponentsModule],
  entryComponents: [PageLayoutComponent]
})
export class PageLayoutModule {
  private readonly ref = PageLayoutComponent;
}
