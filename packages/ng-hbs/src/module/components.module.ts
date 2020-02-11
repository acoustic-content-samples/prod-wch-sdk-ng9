import { WchSdkVersion } from '@acoustic-content-sdk/api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HandlebarsComponent } from '../components/hbs-view/hbs.component';
import { VERSION } from './../version';

@NgModule({
  imports: [CommonModule],
  declarations: [HandlebarsComponent],
  exports: [HandlebarsComponent],
  entryComponents: [HandlebarsComponent]
})
export class WchNgHbsComponentsViewModule {
  /**
   * Exposes the version information of this module
   */
  VERSION: WchSdkVersion = VERSION;
}
