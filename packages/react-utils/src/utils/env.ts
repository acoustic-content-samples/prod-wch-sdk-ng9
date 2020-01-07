/** This is supposed to work via loose-envify */
const HAS_PROCESS = typeof process !== 'undefined';

export const isTest = HAS_PROCESS && process.env.NODE_ENV === 'test';
export const isDevelopment =
  isTest || (HAS_PROCESS && process.env.NODE_ENV === 'development');
export const isProduction = !(isTest || isDevelopment);
