import { WchSdkVersion } from '@acoustic-content-sdk/api';
import { ACOUSTIC_TOKEN_PROTECTED_CONTENT } from '@acoustic-content-sdk/ng-api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProtectedContentService } from '../services/protected-content/protected.content.service';
import { VERSION } from './../../version';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: ACOUSTIC_TOKEN_PROTECTED_CONTENT,
      useClass: ProtectedContentService
    }
  ]
})
export class AcNgProtectedContentModule {
  /**
   * Exposes the version information of this module
   */
  VERSION: WchSdkVersion = VERSION;
}
