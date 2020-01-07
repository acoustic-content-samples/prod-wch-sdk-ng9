/* Copyright IBM Corp. 2018 */
import { Logger } from './../../interfaces/logging/logger';

/**
 * Service to return a logger for a given name. Calling the getter multiple
 * times with the same name will return the same instance of the logger.
 */
export interface LoggerService {

    /**
     * Returns a logger for the given name
     *
     * $1$2 -$3
     * @returns the logger singleton for this name
    */
    readonly get: (name: string) => Logger;
}
