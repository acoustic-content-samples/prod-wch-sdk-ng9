import { LoggerService } from '@acoustic-content-sdk/api';
import { AbstractInlineEditSelectionService } from '@acoustic-content-sdk/component-edit';
import { InlineEditSelectionProvider } from '@acoustic-content-sdk/edit-api';
import { ACOUSTIC_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import { ACOUSTIC_TOKEN_INLINE_EDIT_SELECTION_PROVIDER } from '@acoustic-content-sdk/ng-edit-api';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnDestroy, Optional } from '@angular/core';

// TODO make this configurable via DI
const CLASS_SELECTION = 'wch-inline-edit-selection';

@Injectable({ providedIn: 'root' })
export class WchInlineEditSelectionService
  extends AbstractInlineEditSelectionService
  implements OnDestroy {
  constructor(
    @Inject(ACOUSTIC_TOKEN_INLINE_EDIT_SELECTION_PROVIDER)
    aSelectionProvider: InlineEditSelectionProvider,
    @Optional()
    @Inject(DOCUMENT)
    aDoc?: any,
    @Optional()
    @Inject(ACOUSTIC_TOKEN_LOGGER_SERVICE)
    aLogSvc?: LoggerService
  ) {
    super(CLASS_SELECTION, aSelectionProvider, aDoc, aLogSvc);
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
