/* Copyright IBM Corp. 2018 */

/**
 * Implemented by objects that expose a life cycle. Calling the dispose method signals the end of this life cycle.
 */
export interface Disposable {
  dispose: () => void;
}
