import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpService } from './../http/http.utils';
import { JSONValue } from './../json/json.utils';
import { isAbsoluteURL, isNotNil } from './../predicates/predicates';
import { EMPTY_JSON_OBSERVABLE } from './../rx/rx.utils';
import { urlToString } from './../url/url.utils';

/* Copyright IBM Corp. 2017 */

/**
 * Accessor for static resources, placed next to the application
 */
export class StaticResources {
  private readonly base: string;

  constructor(aBaseUrl: URL | undefined, private http: HttpService) {
    // init
    this.base = urlToString(aBaseUrl);
  }

  /**
   * Retrieves the bootstrap data from the cache
   *
   * @param aKey - the key
   * @returns an observable for the result or the empty observable
   */
  get(aKey: string): Observable<JSONValue> {
    // only try a prefetch if we do not have query parameters
    if (
      isNotNil(this.base) &&
      isNotNil(aKey) &&
      aKey.indexOf('?') < 0 &&
      !isAbsoluteURL(aKey)
    ) {
      // make the request, once
      const url = `${this.base}${aKey}.json`;
      // make the request
      return this.http.getJson<JSONValue>(url, { withCredentials: false }).pipe(
        // ignore the error
        catchError((err) => {
          // log this
          if (err['status'] === 404) {
            console.info(
              'The 404 is expected, we are simply testing if a cached resources is available:',
              url
            );
          }
          // jus nothing available
          return EMPTY_JSON_OBSERVABLE;
        })
      );
    } else {
      // prefetch not available
      return EMPTY_JSON_OBSERVABLE;
    }
  }
}
