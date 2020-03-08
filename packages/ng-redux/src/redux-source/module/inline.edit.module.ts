import { ACOUSTIC_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import {
  ACOUSTIC_TOKEN_INLINE_EDIT_SELECTED_CELL_CONSUMER,
  ACOUSTIC_TOKEN_INLINE_EDIT_SELECTION_PROVIDER
} from '@acoustic-content-sdk/ng-edit-api';
import { ACOUSTIC_TOKEN_REDUX_STORE } from '@acoustic-content-sdk/ng-redux-api';
import { CommonModule } from '@angular/common';
import { NgModule, Optional } from '@angular/core';
import { createInlineEditSelectedCellConsumer } from '../inline-edit/inline.edit.selected.cell.consumer';
import { InlineEditSelectionProviderService } from '../inline-edit/inline.edit.selection.provider';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: ACOUSTIC_TOKEN_INLINE_EDIT_SELECTED_CELL_CONSUMER,
      useFactory: createInlineEditSelectedCellConsumer,
      deps: [ACOUSTIC_TOKEN_REDUX_STORE, [new Optional(), ACOUSTIC_TOKEN_LOGGER_SERVICE]]
    },
    {
      provide: ACOUSTIC_TOKEN_INLINE_EDIT_SELECTION_PROVIDER,
      useClass: InlineEditSelectionProviderService
    }
  ]
})
export class AcNgReduxInlineEditModule {}
