import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WchInlineEditSelectionService } from '../services/inline-edit/inline.edit.selection.service';

const LOGGER = 'AcNgInlineEditServiceModule';

@NgModule({
  imports: [CommonModule],
  providers: [WchInlineEditSelectionService]
})
export class AcNgInlineEditSelectionModule {
  constructor(private aSelService: WchInlineEditSelectionService) {}
}
