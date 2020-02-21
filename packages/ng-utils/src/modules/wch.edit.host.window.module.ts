import { WindowType } from '@acoustic-content-sdk/component-api';
import { getEditHostWindow } from '@acoustic-content-sdk/component-utils';
import { ACOUSTIC_TOKEN_WINDOW } from '@acoustic-content-sdk/ng-api';
import { ACOUSTIC_TOKEN_EDIT_HOST_WINDOW } from '@acoustic-content-sdk/ng-edit-api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

/**
 * Returns the window that controls the application
 *
 * @param aCurrentWindow - the current window
 * @returns the controlling window
 */
export function proxyGetEditHostWindow(aCurrentWindow: WindowType): WindowType {
  return getEditHostWindow(aCurrentWindow);
}

/**
 * Exposes the edit host as the `ACOUSTIC_TOKEN_EDIT_HOST_WINDOW` token.
 *
 * Depends on: `ACOUSTIC_TOKEN_WINDOW`
 */
@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: ACOUSTIC_TOKEN_EDIT_HOST_WINDOW,
      useFactory: proxyGetEditHostWindow,
      deps: [ACOUSTIC_TOKEN_WINDOW]
    }
  ]
})
export class WchNgEditHostWindowModule {}
