import { WindowType } from '@acoustic-content-sdk/component-api';
import { InjectionToken } from '@angular/core';

/** Create a new injection token for injecting the window into a component. */
export const ACOUSTIC_TOKEN_WINDOW = new InjectionToken<WindowType>(
  'ACOUSTIC_TOKEN_WINDOW'
);
