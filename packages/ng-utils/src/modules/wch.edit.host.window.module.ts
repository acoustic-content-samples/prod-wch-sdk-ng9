import { WindowType } from '@acoustic-content-sdk/component-api';
import { getEditHostWindow } from '@acoustic-content-sdk/component-utils';
import { WCH_TOKEN_WINDOW } from '@acoustic-content-sdk/ng-api';
import { WCH_TOKEN_EDIT_HOST_WINDOW } from '@acoustic-content-sdk/ng-edit-api';
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
 * Exposes the edit host as the `WCH_TOKEN_EDIT_HOST_WINDOW` token
 */
@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: WCH_TOKEN_EDIT_HOST_WINDOW,
      useFactory: proxyGetEditHostWindow,
      deps: [WCH_TOKEN_WINDOW]
    }
  ]
})
export class WchNgEditHostWindowModule {}
