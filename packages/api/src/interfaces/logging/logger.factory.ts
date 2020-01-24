/** Copyright IBM Corp. 2018 */
import { Observable } from 'rxjs';
import { Logger } from './logger';

/**
 * Instantiator for loggers. Clients of the SDK can use this
 * interface to inject their custom logger implementation.
 */
export interface LoggerFactory {

    /**
     * Construct the logger instance. There is no need to protect
     * against the creation of multiple loggers, the caller will
     * make sure that loggers are singletons.
     *
     * @param name - name of the logger
     * @returns the new logger instance
     */
    create(name: string): Logger;
}

/**
 * Instantiator for loggers. Clients of the SDK can use this
 * interface to inject their custom logger implementation.
 */
export interface DynamicLoggerFactory {

    /**
     * Returns a logger that is instantiated lazily (and potentially)
     * multiple times.
     *
     * @returns observable of the logger factory
     */
    get(): Observable<LoggerFactory>;
}
