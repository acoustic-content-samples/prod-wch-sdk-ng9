/** Copyright IBM Corp. 2017 */

/**
 * Abstraction of the logger interface, trying to be as generic
 * as possible. The identity of the logger is passed at creation
 * time via the factory. Note that this interface is compatible
 * to the console instance.
 */
export interface Logger {
    error(msg: string, ...data: any[]): void;
    info(msg: string, ...data: any[]): void;
    warn(msg: string, ...data: any[]): void;
}
