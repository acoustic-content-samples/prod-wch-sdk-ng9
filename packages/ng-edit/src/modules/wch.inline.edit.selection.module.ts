import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WchInlineEditSelectionService } from '../services/inline-edit/inline.edit.selection.service';

const LOGGER = 'WchNgInlineEditServiceModule';

@NgModule({
  imports: [CommonModule],
  providers: [WchInlineEditSelectionService]
})
export class WchNgInlineEditSelectionModule {
  constructor(private aSelService: WchInlineEditSelectionService) {}
}
