import { Logger } from '@acoustic-content-sdk/api';
import { createPatch, Operation } from 'rfc6902';
import { MonoTypeOperatorFunction, UnaryFunction } from 'rxjs';
import { scan } from 'rxjs/operators';

/**
 * Reducer function executed in the context of the logger
 *
 * @param aOld - old value
 * @param aNew - new value
 *
 * @returns the new value
 */
function diffReducerFunction<T extends object>(
  aOld: T,
  aNew: T,
  aInfo: string,
  aLogger: Logger
): T {
  // only diff if there is an old object
  if (aOld !== aNew && aOld && aNew) {
    // difference
    const patch: Operation[] = createPatch(aOld, aNew);
    // log the result
    if (patch && patch.length > 0) {
      // log
      aLogger.info(aInfo, patch);
    }
  } else {
    // unable to compare
    aLogger.warn(aInfo, 'Cannot create a patch for', aOld, aNew);
  }
  // in any case return the new object
  return aNew;
}

function createDiffReducer<T extends object>(aInfo: string, aLogger: Logger) {
  // returns the context sensitive reducer
  return (aOld: T, aNew: T): T =>
    diffReducerFunction(aOld, aNew, aInfo, aLogger);
}

/**
 * Constructs a reducer that monitors differences
 *
 * @param aLogger - logger
 *
 * @returns the reducer function
 */
export function rxDiff<T extends object>(
  aLogger: Logger
): UnaryFunction<string, MonoTypeOperatorFunction<T>> {
  // perform the diff
  return (aInfo: string) => scan(createDiffReducer(aInfo, aLogger));
}
