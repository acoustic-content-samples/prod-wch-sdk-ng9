import { WCH_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import {
  WCH_TOKEN_INLINE_EDIT_SELECTED_CELL_CONSUMER,
  WCH_TOKEN_INLINE_EDIT_SELECTION_PROVIDER
} from '@acoustic-content-sdk/ng-edit-api';
import { WCH_TOKEN_REDUX_STORE } from '@acoustic-content-sdk/ng-redux-api';
import { CommonModule } from '@angular/common';
import { NgModule, Optional } from '@angular/core';
import { createInlineEditSelectedCellConsumer } from '../inline-edit/inline.edit.selected.cell.consumer';
import { InlineEditSelectionProviderService } from '../inline-edit/inline.edit.selection.provider';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: WCH_TOKEN_INLINE_EDIT_SELECTED_CELL_CONSUMER,
      useFactory: createInlineEditSelectedCellConsumer,
      deps: [WCH_TOKEN_REDUX_STORE, [new Optional(), WCH_TOKEN_LOGGER_SERVICE]]
    },
    {
      provide: WCH_TOKEN_INLINE_EDIT_SELECTION_PROVIDER,
      useClass: InlineEditSelectionProviderService
    }
  ]
})
export class WchNgReduxInlineEditModule {}
