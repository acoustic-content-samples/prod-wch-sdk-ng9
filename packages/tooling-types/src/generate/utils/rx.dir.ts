import { rxForkJoin } from '@acoustic-content-sdk/rx-utils';
import {
  ReadBuffer,
  ReadTextFile,
  rxExists
} from '@acoustic-content-sdk/tooling';
import { isNotEmpty, mapArray, rxPipe } from '@acoustic-content-sdk/utils';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

export type ReadFile = ReadTextFile | ReadBuffer;

/**
 * Locates the first directory that contains a certain file
 *
 * @param aSources - the list of source files to check
 * @param aRelPath - the relative path
 *
 * @returns the observable
 */
export function rxFindDir(
  aSources: Observable<string[]>,
  aRelPath: string,
  aTree: ReadFile
): Observable<string> {
  // map each source to a check
  return rxPipe(
    aSources,
    mergeMap((sources) =>
      rxPipe(
        rxForkJoin(
          mapArray(sources, (dir) => rxExists(`${dir}${aRelPath}`, aTree))
        ),
        map((result) => sources.filter((src, idx) => result[idx])),
        map((result) => (isNotEmpty(result) ? result[0] : sources[0]))
      )
    )
  );
}
