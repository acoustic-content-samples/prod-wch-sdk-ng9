import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BROWSER_WINDOW_PROVIDERS } from '../services/window/window.service';

/**
 * Exposes the window as the `WCH_TOKEN_WINDOW` token for the case
 * that the application runs in the browser (as opposed to running
 * on the server via Angular Universal)
 */
@NgModule({
  imports: [CommonModule],
  providers: [...BROWSER_WINDOW_PROVIDERS]
})
export class WchNgBrowserWindowModule {}
