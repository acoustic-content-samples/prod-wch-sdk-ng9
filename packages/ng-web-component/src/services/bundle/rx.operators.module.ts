import {
  catchError,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  filter,
  first,
  ignoreElements,
  map,
  mergeMap,
  pluck,
  reduce,
  scan,
  startWith,
  switchMap,
  takeUntil
} from 'rxjs/operators';

/**
 * Expose some methods from the RXJS module that we include
 * in our module, anyway
 */
export const RX_OP_MODULE = {
  'rxjs/operators': {
    map,
    switchMap,
    mergeMap,
    filter,
    takeUntil,
    pluck,
    ignoreElements,
    first,
    scan,
    reduce,
    startWith,
    concatMap,
    debounceTime,
    distinctUntilChanged,
    catchError
  }
};
