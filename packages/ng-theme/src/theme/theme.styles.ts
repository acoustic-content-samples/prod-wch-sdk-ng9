import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

// this is what [ngStyle] expects
export type Styles = Record<string, any>;

/**
 * Injection token for the theme styles
 */
export const ACOUSTIC_TOKEN_THEME_STYLES = new InjectionToken<
  Observable<Styles>
>('ACOUSTIC_TOKEN_THEME_STYLES');
