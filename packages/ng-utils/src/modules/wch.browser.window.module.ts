import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WINDOW_PROVIDERS } from '../services/window/window.service';

/**
 * Exposes the window as the `WCH_TOKEN_WINDOW` token
 */
@NgModule({
  imports: [CommonModule],
  providers: [...WINDOW_PROVIDERS]
})
export class WchNgBrowserWindowModule {}
