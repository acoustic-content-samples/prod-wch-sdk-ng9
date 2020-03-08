import { InjectionToken } from '@angular/core';

/**
 * Type that extracts the type of an injection token
 */
export type ExtractInjectionTokenType<
  T extends InjectionToken<any>
> = T extends InjectionToken<infer F> ? F : never;
