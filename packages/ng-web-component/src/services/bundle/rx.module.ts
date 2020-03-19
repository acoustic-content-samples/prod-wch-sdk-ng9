import { EMPTY, from, NEVER, of } from 'rxjs';
import { filter, map, mergeMap, switchMap } from 'rxjs/operators';

/**
 * Expose some methods from the RXJS module that we include
 * in our module, anyway
 */
export const RX_MODULE = {
  rxjs: {
    of,
    from,
    EMPTY,
    NEVER
  },
  'rxjs/operators': {
    map,
    switchMap,
    mergeMap,
    filter
  }
};
