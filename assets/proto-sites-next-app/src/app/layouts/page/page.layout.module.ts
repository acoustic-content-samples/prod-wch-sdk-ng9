import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WchNgComponentsModule } from '@acoustic-content-sdk/ng';

import { PageLayoutComponent } from './page.layout.component';

@NgModule({
  declarations: [PageLayoutComponent],
  imports: [CommonModule, WchNgComponentsModule],
  entryComponents: [PageLayoutComponent]
})
export class PageLayoutModule {
  private readonly ref = PageLayoutComponent;
}
