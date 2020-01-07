import { Observable } from 'rxjs';
import { HttpResourceOptions } from '../hub-info/hub-info.config';

export interface WchHttp {
  /**
   * Fetches a JSON resource and keeps this live based on the given or the default options
   *
   * $1$2 -$3
   * @returns an observable with the content
   */
  getJsonResource: <T>(
    aUrl: string,
    aOptions?: HttpResourceOptions
  ) => Observable<T>;

  /**
   * Fetches a string resource and keeps this live based on the given or the default options
   *
   * $1$2 -$3
   * @returns an observable with the content
   */
  getTextResource: (
    aUrl: string,
    aOptions?: HttpResourceOptions
  ) => Observable<string>;
}
