import { LoggerService } from '@acoustic-content-sdk/api';
import { rxPipe } from '@acoustic-content-sdk/utils';
import { AbstractInlineEditSelectionService } from '@acoustic-content-sdk/component-edit';
import { InlineEditSelectionProvider } from '@acoustic-content-sdk/edit-api';
import { ACOUSTIC_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import { ACOUSTIC_TOKEN_INLINE_EDIT_SELECTION_PROVIDER } from '@acoustic-content-sdk/ng-edit-api';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnDestroy, Optional } from '@angular/core';
import { take } from 'rxjs/operators';

// TODO make this configurable via DI
const CLASS_SELECTION = 'ac--inline-edit-selection';

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
    rxPipe(window.parent['@acoustic/destroy-obs'], take(1)).subscribe(() => {
      this.unsubscribe();
    })
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
