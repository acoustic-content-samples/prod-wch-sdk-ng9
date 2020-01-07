import { Locale } from '@acoustic-content-sdk/api';

export interface Schema {
  /**
   * The path to the locale directory
   */
  dir: string;
  /**
   * The default locale to use if no other exists
   */
  default?: Locale;
}
