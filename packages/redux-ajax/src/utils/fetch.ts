import { Observable } from 'rxjs';

/**
 * Uses [the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to
 * make an HTTP request.
 *
 * **WARNING** Parts of the fetch API are still experimental. `AbortController` is
 * required for this implementation to work and use cancellation appropriately.
 *
 * Will automatically set up an internal [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
 * in order to teardown the internal `fetch` when the subscription tears down.
 *
 * If a `signal` is provided via the `init` argument, it will behave like it usually does with
 * `fetch`. If the provided `signal` aborts, the error that `fetch` normally rejects with
 * in that scenario will be emitted as an error from the observable.
 *
 * ### Basic Use
 *
 * ```ts
 * import { of } from 'rxjs';
 * import { fromFetch } from 'rxjs/fetch';
 * import { switchMap, catchError } from 'rxjs/operators';
 *
 * const data$ = fromFetch('https://api.github.com/users?per_page=5').pipe(
 *  switchMap(response => {
 *    if (response.ok) {
 *      // OK return data
 *      return response.json();
 *    } else {
 *      // Server is returning a status requiring the client to try something else.
 *      return of({ error: true, message: `Error ${response.status}` });
 *    }
 *  }),
 *  catchError(err => {
 *    // Network or other error, handle appropriately
 *    console.error(err);
 *    return of({ error: true, message: err.message })
 *  })
 * );
 *
 * data$.subscribe({
 *  next: result => console.log(result),
 *  complete: () => console.log('done')
 * })
 * ```
 *
 * @param input - The resource you would like to fetch. Can be a url or a request object.
 * @param init - A configuration object for the fetch.
 * [See MDN for more details](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)
 * @returns An Observable, that when subscribed to performs an HTTP request using the native `fetch`
 * function. The {@link Subscription} is tied to an `AbortController` for the the fetch.
 */
export function fromFetch(
  input: string | Request,
  init?: RequestInit
): Observable<Response> {
  return new Observable<Response>((subscriber) => {
    const controller = new AbortController();
    const signal = controller.signal;
    let outerSignalHandler: () => void;
    let abortable = true;
    let unsubscribed = false;

    if (init) {
      // If a signal is provided, just have it teardown. It's a cancellation token, basically.
      if (init.signal) {
        if (init.signal.aborted) {
          controller.abort();
        } else {
          outerSignalHandler = () => {
            if (!signal.aborted) {
              controller.abort();
            }
          };
          init.signal.addEventListener('abort', outerSignalHandler);
        }
      }
      init = { ...init, signal };
    } else {
      init = { signal };
    }

    fetch(input, init)
      .then((response) => {
        abortable = false;
        subscriber.next(response);
        subscriber.complete();
      })
      .catch((err) => {
        abortable = false;
        if (!unsubscribed) {
          // Only forward the error if it wasn't an abort.
          subscriber.error(err);
        }
      });

    return () => {
      unsubscribed = true;
      if (abortable) {
        controller.abort();
      }
    };
  });
}
