import { Injectable, NgZone } from '@angular/core';
import { MonoTypeOperatorFunction, SchedulerLike } from 'rxjs';
import { observeOn, subscribeOn, tap } from 'rxjs/operators';

import { createZoneSchedulers } from './../../utils/rx.utils';

/* Copyright IBM Corp. 2018 */
/**
 * Service that exposes schedulers and operators that allow client code
 * to run inside or outside of angular zone.
 */
@Injectable({ providedIn: 'root' })
export class ZoneService {
  /**
   *  scheduler to run inside a zone
   */
  insideScheduler: SchedulerLike;

  /**
   *  scheduler to run outside of a zone
   */
  outsideScheduler: SchedulerLike;

  /**
   * Operator to run the observer inside of a zone
   */
  observeInside: <T>() => MonoTypeOperatorFunction<T>;

  /**
   * Operator to subscribe outside of a zone
   */
  subscribeOutside: <T>() => MonoTypeOperatorFunction<T>;

  constructor(aZone: NgZone) {
    /**
     *  the instance
     */
    const that = this;

    /**
     *  schedulers
     */
    const { inside, outside } = createZoneSchedulers(aZone);

    /**
     *  export
     */
    that.insideScheduler = inside;
    that.outsideScheduler = outside;
    that.observeInside = <T>() => observeOn(inside);
    that.subscribeOutside = <T>() => subscribeOn(outside);
  }
}

/**
 * Helper operator to assert that a function is executed in an angular zone
 *
 * @returns the assertion operator
 */
export const opAssertInAngularZone = <T>(): MonoTypeOperatorFunction<T> =>
  tap(NgZone.assertInAngularZone);
