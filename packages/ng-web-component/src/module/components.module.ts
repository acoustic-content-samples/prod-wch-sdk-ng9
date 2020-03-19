import { WchSdkVersion } from '@acoustic-content-sdk/api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WebComponent } from '../components/web-view/web.component';
import { VERSION } from './../version';

@NgModule({
  imports: [CommonModule],
  declarations: [WebComponent],
  exports: [WebComponent],
  entryComponents: [WebComponent]
})
export class AcNgWebComponentViewModule {
  /**
   * Exposes the version information of this module
   */
  VERSION: WchSdkVersion = VERSION;
}
