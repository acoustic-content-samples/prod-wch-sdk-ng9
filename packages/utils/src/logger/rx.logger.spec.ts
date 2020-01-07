import { Logger } from '@acoustic-content-sdk/api';
import { of } from 'rxjs';
import { map, toArray } from 'rxjs/operators';

import { rxPipe } from '../rx/rx.utils';
import { NOOP_LOGGER } from './noop.logger';
import { rxNext } from './rx.logger';

describe('rx.logger', () => {
  it('should log in a pipe sequence without a prefix', () => {
    const items = [];

    const logger: Logger = {
      ...NOOP_LOGGER,
      info: (msg: string, ...data: any[]) => items.push({ msg, data })
    };

    const info = rxNext(logger);

    const seq = of('a', 'b');

    return rxPipe(
      seq,
      info('onValue'),
      toArray(),
      map(() => {
        expect(items).toEqual([
          { msg: 'onValue', data: ['a'] },
          { msg: 'onValue', data: ['b'] }
        ]);
      })
    ).toPromise();
  });

  it('should log in a pipe sequence', () => {
    const items = [];

    const logger: Logger = {
      ...NOOP_LOGGER,
      info: (msg: string, ...data: any[]) => items.push({ msg, data })
    };

    const info = rxNext(logger, 'prefix');

    const seq = of('a', 'b');

    return rxPipe(
      seq,
      info('onValue'),
      toArray(),
      map(() => {
        expect(items).toEqual([
          { msg: 'prefix', data: ['onValue', 'a'] },
          { msg: 'prefix', data: ['onValue', 'b'] }
        ]);
      })
    ).toPromise();
  });
});
