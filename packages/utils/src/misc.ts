/* Copyright IBM Corp. 2018 */
import { identity, noop } from 'rxjs';

/** This is supposed to work via loose-envify */
export const isTest = process.env.NODE_ENV === 'test';
export const isDevelopment = isTest || process.env.NODE_ENV === 'development';
export const isProduction = !(isTest || isDevelopment);

export {
    noop,
    identity
};
