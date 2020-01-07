import { isDevelopment, isProduction, isTest } from './env';

export const isDevMode = () => isDevelopment;
export const isProdMode = () => isProduction;
export const isTestMode = () => isTest;
