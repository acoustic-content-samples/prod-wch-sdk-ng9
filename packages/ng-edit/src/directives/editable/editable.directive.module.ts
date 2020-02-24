import { ACOUSTIC_TOKEN_EDITABLE_DIRECTIVE_SERVICE } from '@acoustic-content-sdk/ng-edit-api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WchEditableDirectiveServiceImpl } from './editable.directive.service';

/**
 * Module implementing the `WchEditableDirectiveService` for the edit case
 */
@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: ACOUSTIC_TOKEN_EDITABLE_DIRECTIVE_SERVICE,
      useClass: WchEditableDirectiveServiceImpl
    }
  ]
})
export class WchNgEditableDirectiveModule {}
