import { HandlebarsResolver } from '@acoustic-content-sdk/component-api';
import { InjectionToken } from '@angular/core';

/**
 * Injection token for the page service
 */
export const WCH_TOKEN_HANDLEBARS_RESOLVER = new InjectionToken<
  HandlebarsResolver
>('WCH_TOKEN_HANDLEBARS_RESOLVER');
