import {
  Directive,
  ElementRef,
  Inject,
  Injectable,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output
} from '@angular/core';
import { LoggerService } from '@acoustic-content-sdk/api';
import { WCH_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import { AbstractLifeCycleComponent } from '@acoustic-content-sdk/ng-utils';
import {
  createConsumerOnSubject,
  createSetterOnSubject,
  identity,
  boxLoggerService,
  opDistinctUntilChanged,
  rxNext,
  rxPipe
} from '@acoustic-content-sdk/utils';
import {
  BehaviorSubject,
  combineLatest,
  EMPTY,
  MonoTypeOperatorFunction,
  Observable,
  Observer
} from 'rxjs';
import { concatMap, filter, map, switchMap, takeUntil } from 'rxjs/operators';

const LOGGER = 'WchIntersectionDirective';

const bHasIntersectionObserver = typeof IntersectionObserver !== 'undefined';

const DEFAULT_ROOT_MARGIN = '0px';

const DEFAULT_THRESHOLD = 0;

@Directive({
  selector: '[wchIntersect]'
})
@Injectable()
export class IntersectionDirective extends AbstractLifeCycleComponent
  implements OnInit, OnDestroy {
  @Input() intersectRootMargin: number;

  @Input() intersectThreshold: number | number[];

  @Output() intersect$: Observable<IntersectionObserverEntry>;

  constructor(
    aElement: ElementRef,
    @Optional()
    @Inject(WCH_TOKEN_LOGGER_SERVICE)
    aLogSvc: LoggerService
  ) {
    super();
    // capture the input field
    const rootMarginSubject = new BehaviorSubject<string>(DEFAULT_ROOT_MARGIN);
    const thresholdSubject = new BehaviorSubject<number | number[]>(
      DEFAULT_THRESHOLD
    );
    // attach
    const setRootMargin = createSetterOnSubject(rootMarginSubject);
    const setThreshold = createSetterOnSubject(thresholdSubject);
    // quick pointer
    const that = this;
    const logSvc = boxLoggerService(aLogSvc);
    const logger = logSvc.get(LOGGER);

    // next logger
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);

    // test if we have a window
    if (bHasIntersectionObserver) {
      // destroy
      const onDestroy$ = that.onDestroy$;
      const onInit$ = that.onInit$;
      // config
      const rootMargin$ = rxPipe(
        rootMarginSubject,
        filter(Boolean),
        opDistinctUntilChanged
      );
      const threshold$ = rxPipe(thresholdSubject, opDistinctUntilChanged);
      // observer
      const options$: Observable<IntersectionObserverInit> = rxPipe(
        combineLatest([rootMargin$, threshold$]),
        // construct the options object
        map<[string, number | number[]], IntersectionObserverInit>(
          ([rootMargin, threshold]) => ({ rootMargin, threshold })
        ),
        // just log
        log('options')
      );
      // construct the observer
      const intersectionObserverEntry$: Observable<IntersectionObserverEntry> = rxPipe(
        combineLatest([options$, onInit$]),
        // when the options change, reconnect
        switchMap<
          [IntersectionObserverInit, void],
          Observable<IntersectionObserverEntry[]>
        >(([opt]) =>
          Observable.create((ob: Observer<IntersectionObserverEntry[]>) => {
            // construct the new observer
            const intersectObserver = new IntersectionObserver(
              createConsumerOnSubject(ob),
              opt
            );
            // start consuming
            intersectObserver.observe(aElement.nativeElement);
            // shutdown
            return () => intersectObserver.disconnect();
          })
        ),
        // map the array into a sequence
        concatMap(identity),
        // log this
        log('intersection'),
        // disconnect when the component gets destroyed
        takeUntil(onDestroy$)
      );
      // attach
      that.intersect$ = intersectionObserverEntry$;
    } else {
      // warn about this
      logger.warn('IntersectionObserver not defined.');
      // nothing to do
      that.intersect$ = EMPTY;
    }
    // define the setter
    Object.defineProperties(that, {
      intersectRootMargin: setRootMargin,
      intersectThreshold: setThreshold
    });
  }

  // AOT needs this override
  ngOnInit() {
    super.ngOnInit();
  }

  // AOT needs this override
  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
