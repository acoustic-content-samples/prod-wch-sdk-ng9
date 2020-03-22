/**
 * @jest-environment jsdom
 */
import {
  constGenerator,
  createConsoleLogger,
  NOOP_LOGGER_SERVICE,
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
    NOOP_LOGGER_SERVICE
  );

  it(
    'should load moment',
    () => {
      // load
      const chart$ = resolver('moment');
      return rxPipe(
        chart$,
        tap((moment) => expect(moment).toBeDefined())
      ).toPromise();
    },
    20 * 1000
  );

  it(
    'should load chart.js',
    () => {
      // load
      const chart$ = resolver('chart.js');
      return rxPipe(
        chart$,
        tap((chart) => expect(chart).toBeDefined())
      ).toPromise();
    },
    20 * 1000
  );

  it(
    'should load d3',
    () => {
      // load
      const d3$ = resolver('d3');
      return rxPipe(
        d3$,
        tap((d3) => expect(d3).toBeDefined())
      ).toPromise();
    },
    20 * 1000
  );

  it('should load lodash', () => {
    // load
    const lodash$ = resolver('lodash');

    return rxPipe(
      lodash$,
      tap((lod) => expect(lod._).toBeDefined()),
      tap((lod) =>
        expect(
          lod.template('<div>Hello <%- name %>!</div>')({ name: 'Carsten' })
        ).toBe('<div>Hello Carsten!</div>')
      )
    ).toPromise();
  });
});
