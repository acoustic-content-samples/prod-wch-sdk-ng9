import { Observable } from 'rxjs';

/**
 * Priority of the actual request
 */
export enum FETCH_PRIORITY {
  LOW,
  NORMAL,
  HIGH
}

/**
 * Callback interface used to make a GET request to the resource
 * and to ask for text content.
 *
 * The URL can be a relative URL and will be resolved against the API URL
 */
export type FetchText = (
  aUrl: string,
  aPriority?: FETCH_PRIORITY
) => Observable<string>;

/**
 * Callback interface used to send data to the server.
 *
 * The URL can be a relative URL and will be resolved against the API URL
 */
export type WriteText = (
  aUrl: string,
  aBody: any,
  aPriority?: FETCH_PRIORITY
) => Observable<any>;
