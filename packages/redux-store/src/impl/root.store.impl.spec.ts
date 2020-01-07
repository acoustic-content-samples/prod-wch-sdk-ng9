import { rxPipe } from '@acoustic-content-sdk/utils';

import {
  sampleFeatureModule,
  selectSampleFeature
} from '../sample/feature/feature';
import { createLog4jsLoggerService } from '../utils/log.mock';
import { createReduxRootStore, rxSelect, rxStore } from './root.store.impl';
import { Observable, identity } from 'rxjs';
import { take } from 'rxjs/operators';

describe('root.store.impl.spec', () => {
  // construct the logging service
  const logSvc = createLog4jsLoggerService();

  it('should have a rxSelect that unsubscribes', () => {
    let subCount: number = 0;

    const ob$ = new Observable<number>((sub) => {
      subCount++;

      sub.next(1);
      sub.next(2);
      sub.next(3);

      return () => {
        subCount--;
      };
    });

    const value$ = rxPipe(ob$, rxSelect(identity), take(2));

    return value$.toPromise().then(() => expect(subCount).toBe(0));
  });
});
