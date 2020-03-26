import { createGuid } from '@acoustic-content-sdk/tooling';
import { assertFromFunction, rxPipe } from '@acoustic-content-sdk/utils';
import { from, Observable, UnaryFunction } from 'rxjs';
import { first, map } from 'rxjs/operators';

export function createGuidGenerator(
  aDelegate: UnaryFunction<string, Observable<Buffer>>
): UnaryFunction<string, Observable<string>> {
  // the cache
  const cache: Record<string, Promise<string>> = {};

  const create = (aUrl: string) =>
    rxPipe(
      aDelegate(aUrl),
      first(),
      map((data) => createGuid(data))
    ).toPromise();

  // dispatch
  return (aUrl: string): Observable<string> =>
    from<Promise<string>>(assertFromFunction(aUrl, cache, create));
}
