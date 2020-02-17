import { rxSpawn, SPAWN_OUTPUT_TYPE } from '@acoustic-content-sdk/rx-utils';
import { FALSE$, isEqual, rxPipe } from '@acoustic-content-sdk/utils';
import { Observable } from 'rxjs';
import { catchError, filter, first, map, mapTo } from 'rxjs/operators';

/**
 * Tests if we have an `npm` installation
 *
 * @returns true if we have an installation, else false
 */
export function rxSupportsNpm(): Observable<boolean> {
  return rxPipe(
    rxSpawn('npm', ['--version']),
    filter(([type]) => isEqual(type, SPAWN_OUTPUT_TYPE.STDOUT)),
    map(([, line]) => line),
    filter((line) => /\d+.\d+.\d+/.test(line)),
    first(),
    mapTo(true),
    catchError(() => FALSE$)
  );
}
