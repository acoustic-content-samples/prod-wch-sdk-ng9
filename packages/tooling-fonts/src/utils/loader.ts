import { assertFromFunction, rxPipe } from '@acoustic-content-sdk/utils';
import { from, Observable, UnaryFunction } from 'rxjs';
import { first } from 'rxjs/operators';

/**
 * Returns a cached version of the resource
 *
 * @param aDelegate - delegate function to load the resource
 * @returns the cached delegate
 */
export function createLoader(
  aDelegate: UnaryFunction<string, Observable<Buffer>>
): UnaryFunction<string, Observable<Buffer>> {
  // the cache
  const cache: Record<string, Promise<Buffer>> = {};

  const loadUrl = (aUrl: string) =>
    rxPipe(aDelegate(aUrl), first()).toPromise();

  // the callback
  return (aUrl: string): Observable<Buffer> => {
    // parse
    const idx = aUrl.lastIndexOf('#');
    const prefix = idx >= 0 ? aUrl.substr(0, idx) : aUrl;
    // load
    return from<Promise<Buffer>>(assertFromFunction(prefix, cache, loadUrl));
  };
}
