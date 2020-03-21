import {
  BehaviorSubject,
  combineLatest,
  EMPTY,
  from,
  fromEvent,
  merge,
  NEVER,
  Observable,
  of,
  ReplaySubject,
  Subject
} from 'rxjs';

/**
 * Expose some methods from the RXJS module that we include
 * in our module, anyway
 */
export const RX_MODULE = {
  rxjs: {
    fromEvent,
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
