import {
  ReadBuffer,
  ReadTextFile,
  rxExists
} from '@acoustic-content-sdk/tooling';
import { isNotEmpty, mapArray, rxPipe } from '@acoustic-content-sdk/utils';
import { EMPTY, forkJoin, OperatorFunction } from 'rxjs';
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
export const rxFindDir = (
  aRelPath: string,
  aTree: ReadFile
): OperatorFunction<string[], string> =>
  mergeMap((sources) =>
    isNotEmpty(sources)
      ? rxPipe(
          forkJoin(
            mapArray(sources, (dir) => rxExists(`${dir}${aRelPath}`, aTree))
          ),
          map((result) => sources.filter((src, idx) => result[idx])),
          map((result) => (isNotEmpty(result) ? result[0] : sources[0]))
        )
      : EMPTY
  );
