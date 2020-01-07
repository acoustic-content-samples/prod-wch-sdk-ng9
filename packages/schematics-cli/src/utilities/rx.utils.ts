import { objectAssign } from '@acoustic-content-sdk/utils';
import { forkJoin, Observable, of, OperatorFunction } from 'rxjs';
import { reduce } from 'rxjs/operators';
import { SourceFile } from 'typescript';

export function rxForkJoin<T>(aObservables: Observable<T>[]): Observable<T[]> {
  // check the array
  return aObservables && aObservables.length > 0
    ? forkJoin(...aObservables)
    : of([]);
}

/**
 * Reduces all source files to an object, keyed by filename
 *
 * @returns the reducer function
 */
export function reduceSourceFiles(): OperatorFunction<
  SourceFile,
  Record<string, SourceFile>
> {
  return reduce(
    (aDst: Record<string, SourceFile>, aFile: SourceFile) =>
      objectAssign(aFile.fileName, aFile, aDst),
    {}
  );
}
