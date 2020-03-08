import { ACOUSTIC_TOKEN_SELECTABLE_DIRECTIVE_SERVICE } from '@acoustic-content-sdk/ng-edit-api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WchSelectableDirectiveServiceImpl } from './selectable.directive.service';

/**
 * Module implementing the `WchSelectableDirectiveService` for the edit case
 */
@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: ACOUSTIC_TOKEN_SELECTABLE_DIRECTIVE_SERVICE,
      useClass: WchSelectableDirectiveServiceImpl
    }
  ]
})
export class AcNgSelectableDirectiveModule {}
