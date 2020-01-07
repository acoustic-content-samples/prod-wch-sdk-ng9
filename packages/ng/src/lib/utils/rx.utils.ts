import { NgZone } from '@angular/core';
import {
  queueScheduler,
  SchedulerAction,
  SchedulerLike,
  Subscription
} from 'rxjs';

/**
 * Implements a scheduler that runs the work inside or outside an angular zone.
 */
abstract class AbstractNgInZoneScheduler implements SchedulerLike {
  protected constructor(
    private zone: NgZone,
    private delegate: SchedulerLike = queueScheduler
  ) {}

  /**
   *  simply dispatch
   */
  now(): number {
    return this.delegate.now();
  }

  schedule<T>(
    work: (this: SchedulerAction<T>, state?: T) => void,
    delay?: number,
    state?: T
  ): Subscription {
    /**
     *  dispatch
     */
    const { zone, delegate } = this;
    return this.doRun(zone, () => delegate.schedule(work, delay, state));
  }

  protected abstract doRun(zone: NgZone, cb: () => Subscription): Subscription;
}

class NgInZoneScheduler extends AbstractNgInZoneScheduler {
  constructor(aZone: NgZone, aDelegate?: SchedulerLike) {
    super(aZone, aDelegate);
  }

  protected doRun(zone: NgZone, cb: () => Subscription): Subscription {
    return zone.run(cb);
  }
}

class NgOutOfZoneScheduler extends AbstractNgInZoneScheduler {
  constructor(aZone: NgZone, aDelegate?: SchedulerLike) {
    super(aZone, aDelegate);
  }

  protected doRun(zone: NgZone, cb: () => Subscription): Subscription {
    return zone.runOutsideAngular(cb);
  }
}

export interface ZoneSchedulers {
  inside: SchedulerLike;
  outside: SchedulerLike;
}

export function createZoneSchedulers(
  aZone: NgZone,
  aDelegate?: SchedulerLike
): ZoneSchedulers {
  /**
   *  construct the schedulers for our zone
   */
  const result: ZoneSchedulers = {
    inside: new NgInZoneScheduler(aZone, aDelegate),
    outside: new NgOutOfZoneScheduler(aZone, aDelegate)
  };
  /**
   *  returns the scheduler
   */
  return result;
}
