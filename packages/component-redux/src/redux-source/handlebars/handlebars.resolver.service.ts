import { createVersionString, LoggerService } from '@acoustic-content-sdk/api';
import {
  HandlebarsProcessor,
  HandlebarsResolver
} from '@acoustic-content-sdk/component-api';
import {
  handlebarsGuaranteeTemplateAction,
  selectHandlebarsFeature,
  selectTemplate
} from '@acoustic-content-sdk/redux-feature-handlebars';
import {
  ReduxRootStore,
  rxSelect,
  rxStore
} from '@acoustic-content-sdk/redux-store';
import {
  isNil,
  boxLoggerService,
  opCacheLast,
  rxCachedFunction,
  rxNext,
  rxPipe,
  UNDEFINED$
} from '@acoustic-content-sdk/utils';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';

import { createCache } from '../../utils/cache.utils';
import { logDispatch } from '../../utils/store.utils';
import { MODULE, VERSION } from './../../version';

const LOGGER = 'HandlebarsResolverService';

export class AbstractHandlebarsResolverService implements HandlebarsResolver {
  // the actual callback function
  getHandlebarsProcessor: (aId: string) => Observable<HandlebarsProcessor>;

  protected constructor(aStore: ReduxRootStore, aLogSvc?: LoggerService) {
    // logger
    const logSvc = boxLoggerService(aLogSvc);
    // construct a logger
    const logger = logSvc.get(LOGGER);
    // next logger
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);

    const store$ = rxStore(aStore);
    const handlebar$ = rxPipe(store$, rxSelect(selectHandlebarsFeature));

    // dispatch callback
    const dispatch = logDispatch(aStore, logger);

    // select the layout
    const getHandlebarsProcessor = (
      aId: string
    ): Observable<HandlebarsProcessor> => {
      // quick check for the impossible case
      if (isNil(aId)) {
        return UNDEFINED$;
      }
      // make sure we have a layout
      dispatch(handlebarsGuaranteeTemplateAction(aId));
      // actually load the layout
      return rxPipe(
        handlebar$,
        rxSelect(selectTemplate(aId)),
        log('template'),
        opCacheLast
      );
    };

    // log this service
    logger.info(MODULE, createVersionString(VERSION));

    // load the layout
    this.getHandlebarsProcessor = rxCachedFunction(
      getHandlebarsProcessor,
      createCache(logger)
    );
  }
}
