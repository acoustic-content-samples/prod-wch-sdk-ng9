import { WindowType } from '@acoustic-content-sdk/component-api';
import { InjectionToken } from '@angular/core';

/** Create a new injection token for injecting the window into a component. */
export const WCH_TOKEN_WINDOW = new InjectionToken<WindowType>(
  'WCH_TOKEN_WINDOW'
);
