import { of } from 'rxjs';
import { rxDiff } from './diff';
import { Logger } from '@acoustic-content-sdk/api';

describe('diff', () => {
  it('should log JSON differences', () => {
    const json1 = { c: 'c1', a: 'a1' };
    const json2 = { ...json1, b: 'b', c: 'c1', d: 'd1' };

    // tslint:disable-next-line:no-console
    const log = console.log;

    const logger: Logger = {
      error: log,
      warn: log,
      info: log
    };
    const diff = rxDiff(logger);

    const seq$ = of(json1, json2).pipe(diff('json'));

    return seq$.toPromise();
  });
});
