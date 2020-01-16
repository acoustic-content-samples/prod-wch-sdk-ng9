import { WCH_TOKEN_EDITABLE_PLACEHOLDER_DIRECTIVE_SERVICE } from '@acoustic-content-sdk/ng-edit-api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WchEditablePlaceholderDirectiveServiceImpl } from './editable.placeholder.directive.service';

/**
 * Module implementing the `WchEditableDirectiveService` for the edit case
 */
@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: WCH_TOKEN_EDITABLE_PLACEHOLDER_DIRECTIVE_SERVICE,
      useClass: WchEditablePlaceholderDirectiveServiceImpl
    }
  ]
})
export class WchNgEditablePlaceholderDirectiveModule {}
