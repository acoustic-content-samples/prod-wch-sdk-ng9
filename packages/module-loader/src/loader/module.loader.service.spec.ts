/**
 * @jest-environment jsdom
 */
import {
  constGenerator,
  createConsoleLogger,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { EMPTY } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, tap } from 'rxjs/operators';

import { createModuleLoader } from './module.loader.service';

describe('module', () => {
  /**
   * Fetch text callback
   *
   * @param aUrl - the url
   */
  const fetchText = (aUrl: string) => {
    console.log('loading', aUrl);
    return rxPipe(
      ajax({ url: aUrl, responseType: 'text' }),
      map((resp) => resp.response)
    );
  };

  /**
   * No fallback
   */
  const fallback = constGenerator(EMPTY);

  /**
   * Logger service
   */
  const logSvc = { get: (aName: string) => createConsoleLogger(aName) };

  /**
   * The resolver
   */
  const resolver = createModuleLoader(
    fallback,
    fetchText,
    document,
    window,
    logSvc
  );

  it('should load lodash', () => {
    // load
    const lodash$ = resolver('lodash');

    return rxPipe(
      lodash$,
      tap((lod) => expect(lod._).toBeDefined())
    ).toPromise();
  });
});
