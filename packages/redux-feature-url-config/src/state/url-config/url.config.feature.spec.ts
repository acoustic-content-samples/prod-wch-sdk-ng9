import { rxPipe, isUrlConfig } from '@acoustic-content-sdk/utils';
import { of } from 'rxjs';
import { first, tap } from 'rxjs/operators';

import { createLog4jsLoggerService } from './../../utils/log.mock';
import { initAction } from './../store.actions';
import { rxSelect } from './../utils';
import {
  selectUrlConfigFeature,
  UrlConfigFeatureState
} from './url.config.feature';
import { urlConfigReducer } from './url.config.state';
import { setUrlConfigAction } from './url.config.actions';

const TEST_NAME = 'url.config.feature';
describe(TEST_NAME, () => {
  const loggerService = createLog4jsLoggerService();

  it('should be able to set the config', () => {
    // logger
    const logger = loggerService.get(
      `${TEST_NAME} - should select the config state`
    );

    const state: UrlConfigFeatureState = {
      urlConfig: urlConfigReducer(
        undefined,
        setUrlConfigAction(
          'https://my.publishing-08.rtp.raleigh.ibm.com/api/5a538931-3431-49a6-a19e-d47776ef7705/'
        )
      )
    };

    expect(isUrlConfig(selectUrlConfigFeature(state)));
  });

  it('should select the config state', () => {
    // logger
    const logger = loggerService.get(
      `${TEST_NAME} - should select the config state`
    );

    const state: UrlConfigFeatureState = {
      urlConfig: urlConfigReducer(undefined, initAction())
    };

    logger.info('initial', state);

    // select the state
    const state$ = of(state);
    const urlConfig$ = rxPipe(state$, rxSelect(selectUrlConfigFeature));

    const test$ = rxPipe(
      urlConfig$,
      first(),
      tap((urlConfig) => expect(urlConfig).toBeDefined()),
      tap((urlConfig) => logger.info('logged', urlConfig))
    );

    return test$.toPromise();
  });
});
