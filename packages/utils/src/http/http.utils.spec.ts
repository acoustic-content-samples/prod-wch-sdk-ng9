import { Observable, of, throwError } from 'rxjs';
import { marbles } from 'rxjs-marbles';
import { map, pluck } from 'rxjs/operators';
import { v4 } from 'uuid';
import { ErrorResponse } from '@acoustic-content-sdk/api';
import { isErrorResponse } from './../error/error';
import { JSONValue } from './../json/json.utils';
import { HttpOptions, HttpService, sendJsonRequest } from './http.utils';

describe('http.utils', () => {
  const opt: HttpOptions = {
    withCredentials: true
  };

  const mockService: HttpService = {
    getJson: <T>(aUrl: string, aOptions: HttpOptions): Observable<T> => {
      // the result
      const result: any = {
        url: aUrl
      };
      return of(result);
    },
    getText: (aUrl: string, aOptions: HttpOptions): Observable<string> =>
      of(aUrl)
  };

  it(
    'should signal an error and retry',
    marbles((m) => {
      let count = 0;

      const mockService: HttpService = {
        getJson: <T>(aUrl: string, aOptions: HttpOptions): Observable<T> => {
          // fail the third request
          if (count++ === 2) {
            const resp: ErrorResponse = {
              requestId: v4(),
              description: 'test',
              errors: [],
              service: 'http.utils',
              version: '1.0',
              message: 'test message',
              statusCode: 500
            };
            return throwError(resp);
          }
          // the result
          const result: any = {
            url: aUrl
          };
          return of(result);
        },
        getText: (aUrl: string, aOptions: HttpOptions): Observable<string> =>
          of(aUrl)
      };

      const trigger = m.cold('ttt-t|');

      const result: Observable<JSONValue> = sendJsonRequest<JSONValue>(
        'http://example.org',
        { withCredentials: true, dispatchError: true },
        trigger,
        mockService
      ).pipe(
        map((resp) =>
          isErrorResponse(resp) ? 'http://error.org' : resp['url']
        )
      );

      const expected = m.cold('uue-u|', {
        u: 'http://example.org',
        e: 'http://error.org'
      });

      m.expect(result).toBeObservable(expected);
    })
  );

  it(
    'should retry an error',
    marbles((m) => {
      let count = 0;

      const mockService: HttpService = {
        getJson: <T>(aUrl: string, aOptions: HttpOptions): Observable<T> => {
          // fail the third request
          if (count++ === 2) {
            return throwError(new Error());
          }
          // the result
          const result: any = {
            url: aUrl
          };
          return of(result);
        },
        getText: (aUrl: string, aOptions: HttpOptions): Observable<string> =>
          of(aUrl)
      };

      const trigger = m.cold('ttt-t|');

      const result: Observable<JSONValue> = sendJsonRequest<JSONValue>(
        'http://example.org',
        opt,
        trigger,
        mockService
      ).pipe(pluck('url'));

      const expected = m.cold('uu--u|', { u: 'http://example.org' });

      m.expect(result).toBeObservable(expected);
    })
  );

  it(
    'should send a normal request',
    marbles((m) => {
      const trigger = m.cold('tt|');

      const result: Observable<JSONValue> = sendJsonRequest<JSONValue>(
        'http://example.org',
        opt,
        trigger,
        mockService
      ).pipe(pluck('url'));

      const expected = m.cold('uu|', { u: 'http://example.org' });

      m.expect(result).toBeObservable(expected);
    })
  );
});
