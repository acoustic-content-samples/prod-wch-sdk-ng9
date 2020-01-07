import { rxPipe } from '@acoustic-content-sdk/utils';
import { first, map, mergeMapTo } from 'rxjs/operators';

import {
  createReduxRootStore,
  rxSelect,
  rxStore
} from '../impl/root.store.impl';
import {
  sampleFeatureModule,
  selectSampleFeature
} from '../sample/feature/feature';
import { addSampleAction } from '../sample/feature/feature.actions';
import { initFeatureModule, selectInitFeature } from '../sample/init/feature';
import { createLog4jsLoggerService } from '../utils/log.mock';

describe('feature.module.spec', () => {
  // construct the logging service
  const logSvc = createLog4jsLoggerService();

  it('should listen for an init call', () => {
    // new store
    const store = createReduxRootStore({ logSvc });
    store.addFeatureModule(initFeatureModule);

    const store$ = rxStore(store);
    // check the first emission
    const initState$ = rxPipe(store$, rxSelect(selectInitFeature), first());

    const test$ = rxPipe(
      initState$,
      map((state) => expect(state).toEqual('init'))
    );

    return test$.toPromise();
  });

  it('should be able to add state to a feature store', () => {
    // new store
    const store = createReduxRootStore({ logSvc });
    store.addFeatureModule(sampleFeatureModule);

    const store$ = rxStore(store);

    // check the first emission
    const initState$ = rxPipe(store$, rxSelect(selectSampleFeature), first());

    const SAMPLE_DATE = 'SAMPLE_DATA';

    // then trigger new state
    const action$ = rxPipe(
      initState$,
      map(() => store.dispatch(addSampleAction(SAMPLE_DATE)))
    );

    // check new state
    const newState$ = rxPipe(
      action$,
      mergeMapTo(initState$),
      map((data) => expect(data).toEqual(SAMPLE_DATE))
    );

    return newState$.toPromise();
  });

  it('should register a feature store with initial state', () => {
    // new store
    const store = createReduxRootStore({ logSvc });
    store.addFeatureModule(sampleFeatureModule);

    const store$ = rxStore(store);

    // check the first emission
    const initState$ = rxPipe(
      store$,
      rxSelect(selectSampleFeature),
      first(),
      map((data) => expect(data).toEqual('default'))
    );

    return initState$.toPromise();
  });
});
