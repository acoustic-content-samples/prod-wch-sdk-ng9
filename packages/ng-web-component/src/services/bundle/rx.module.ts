import {
  BehaviorSubject,
  EMPTY,
  from,
  NEVER,
  Observable,
  of,
  ReplaySubject,
  Subject,
  combineLatest,
  merge
} from 'rxjs';

/**
 * Expose some methods from the RXJS module that we include
 * in our module, anyway
 */
export const RX_MODULE = {
  rxjs: {
    of,
    from,
    EMPTY,
    NEVER,
    ReplaySubject,
    BehaviorSubject,
    Subject,
    Observable,
    combineLatest,
    merge
  }
};
