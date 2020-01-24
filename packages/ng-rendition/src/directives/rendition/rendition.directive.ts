/* Copyright IBM Corp. 2017 */
import {
  Image,
  Logger,
  LoggerService,
  UrlConfig
} from '@acoustic-content-sdk/api';
import {
  WCH_TOKEN_LOGGER_SERVICE,
  WCH_TOKEN_URL_CONFIG
} from '@acoustic-content-sdk/ng-api';
import { AbstractLifeCycleComponent } from '@acoustic-content-sdk/ng-utils';
import {
  createDimension,
  Dimension,
  getScaledImageFromRendition,
  getScaledImageFromSize,
  ScaledImage,
  TRANSPARENT_PIXEL
} from '@acoustic-content-sdk/rendition-utils';
import {
  createSetterOnSubject,
  createSingleSubject,
  getProperty,
  isAbsoluteURL,
  isNotEmpty,
  isString,
  NOOP_LOGGER_SERVICE,
  opDistinctUntilChanged,
  opFilterNotNil,
  rxNext,
  rxPipe,
  selectResourceUrl,
  typedPluck
} from '@acoustic-content-sdk/utils';
import {
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Renderer2
} from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  fromEvent,
  merge,
  MonoTypeOperatorFunction,
  Observable,
  of
} from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  mapTo,
  startWith,
  switchMap,
  switchMapTo,
  takeUntil
} from 'rxjs/operators';

const mathRound = Math.round;

/**
 * Compares two dimension objects
 *
 * @param aLeft - left object
 * @param aRight - right object
 *
 * @returns true if the dimensions match, else false
 */
function _equalDimension(aLeft: Dimension, aRight: Dimension): boolean {
  return aLeft === aRight || (aLeft.w === aRight.w && aLeft.h === aRight.h);
}

/**
 * Tests if a URL is a valid, relative URL string
 *
 * @param aValue - any value
 * @returns true if the string is a URL, else false
 */
function _isRelativeURL(aValue: any): aValue is string {
  return isString(aValue) && isNotEmpty(aValue) && !isAbsoluteURL(aValue);
}

/**
 * Compares two scaled image objects
 *
 * @param aLeft - left object
 * @param aRight - right object
 *
 * @returns true if the scaled images match, else false
 */
function _equalScaledImage(aLeft: ScaledImage, aRight: ScaledImage): boolean {
  return (
    aLeft === aRight ||
    (_equalDimension(aLeft.img, aRight.img) &&
      _equalDimension(aLeft.container, aRight.container) &&
      aLeft.url === aRight.url)
  );
}

/**
 * Constructs the dimensions object based on an array
 *
 * @param aArray - the array
 * @returns the dimensions object
 */
function _dimensionFromArray(aArray: number[]): Dimension {
  return createDimension(aArray[0], aArray[1]);
}

/**
 * Returns the measured dimension of an item
 *
 * @param aElement - the element to measure
 * @param aRenderer - the rendered used to access the parent
 * @returns the dimension
 */
function _getMeasuredDimension(
  aElement: HTMLImageElement,
  aRenderer: Renderer2,
  aLogger: Logger
): Dimension {
  // check
  let ce: HTMLElement = aElement;
  let w = 0;
  let h = 0;
  while (w <= 0 && ce) {
    w = mathRound(ce.clientWidth);
    h = mathRound(ce.clientHeight);
    ce = aRenderer.parentNode(ce);
  }
  // log this
  aLogger.info('Measured dimension', w, 'x', h, 'via', ce);
  // returns the measured dimension
  return createDimension(w, h);
}

const LOGGER = 'WchRenditionDirective';

@Directive({
  selector: '[wchRendition]'
})
export class RenditionDirective extends AbstractLifeCycleComponent
  implements OnInit, OnDestroy {
  // optional name of the rendition
  @Input() renditionName: string;

  // image object to be edited
  @Input() wchRendition: Image;

  // relative height of image
  @Input() relHeight: number;

  // relative width of image
  @Input() relWidth: number;

  // absolute image width
  @Input() imgWidth: number;

  // relative image width
  @Input() imgHeight: number;

  // output of the actually scaled image
  @Output() image$ = new EventEmitter<ScaledImage>();

  constructor(
    parentRef: ElementRef,
    renderer: Renderer2,
    @Inject(WCH_TOKEN_URL_CONFIG)
    aUrlConfig: Observable<UrlConfig>,
    @Optional()
    @Inject(WCH_TOKEN_LOGGER_SERVICE)
    aLogSvc: LoggerService
  ) {
    super();
    // quick check
    const that = this;

    const logSvc = aLogSvc || NOOP_LOGGER_SERVICE;
    const logger = logSvc.get(LOGGER);

    // next logger
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);

    // the basic hooks
    const { onInit$, onDestroy$ } = that;

    // dynamic elements
    const renditionName$ = new BehaviorSubject<string>(null);
    const image$ = createSingleSubject<Image>();
    const relWidth$ = new BehaviorSubject<number>(0);
    const relHeight$ = new BehaviorSubject<number>(0);
    const imgWidth$ = new BehaviorSubject<number>(0);
    const imgHeight$ = new BehaviorSubject<number>(0);

    // declare the getters
    Object.defineProperties(that, {
      wchRendition: createSetterOnSubject(image$),
      relWidth: createSetterOnSubject(relWidth$),
      relHeight: createSetterOnSubject(relHeight$),
      imgWidth: createSetterOnSubject(imgWidth$),
      imgHeight: createSetterOnSubject(imgHeight$),
      renditionName: createSetterOnSubject(renditionName$)
    });

    // exposes the current element
    const currentElement$: Observable<HTMLImageElement> = rxPipe(
      onInit$,
      mapTo(parentRef.nativeElement as HTMLImageElement),
      opFilterNotNil,
      opDistinctUntilChanged
    );

    // listens for the configured dimension
    const configuredDimension$: Observable<Dimension> = rxPipe(
      onInit$,
      switchMapTo(combineLatest([imgWidth$, imgHeight$])),
      map(_dimensionFromArray),
      distinctUntilChanged(_equalDimension),
      log('config')
    );

    // relative dimensions
    const relDimension$: Observable<Dimension> = rxPipe(
      onInit$,
      switchMapTo(combineLatest([relWidth$, relHeight$])),
      map(_dimensionFromArray),
      distinctUntilChanged(_equalDimension),
      log('rel')
    );

    // measured dimensions
    const measuredDimension$: Observable<Dimension> = rxPipe(
      currentElement$,
      switchMap((ce) =>
        rxPipe(
          fromEvent(window, 'resize'),
          startWith(null),
          debounceTime(300),
          mapTo(_getMeasuredDimension(ce, renderer, logger))
        )
      ),
      distinctUntilChanged(_equalDimension),
      log('measured')
    );

    // actual dimensions to use
    const srcDimension$: Observable<Dimension> = rxPipe(
      configuredDimension$,
      switchMap((d) => {
        // shortcut
        const dw = d.w;
        const dh = d.h;
        return dw > 0 && dh > 0
          ? of(d)
          : rxPipe(
              measuredDimension$,
              map<Dimension, Dimension>((dm) => {
                // shortcut
                const mw = dm.w;
                const mh = dm.h;
                return dw > 0
                  ? createDimension(dw, mh)
                  : dh > 0
                  ? createDimension(mw, dh)
                  : dm;
              })
            );
      }),
      distinctUntilChanged(_equalDimension),
      log('src')
    );

    // compute the target dimensions
    const dstDimension$: Observable<Dimension> = rxPipe(
      srcDimension$,
      switchMap((sd) => {
        // shortcut
        const sw = sd.w;
        const sh = sd.h;
        return rxPipe(
          relDimension$,
          map((rd) => {
            // shortcut
            const rw = rd.w;
            const rh = rd.h;
            return rw > 0
              ? rh > 0
                ? createDimension(rw * sh, rh * sw)
                : createDimension(rw * sh, sh)
              : rh > 0
              ? createDimension(sw, rh * sw)
              : sd;
          })
        );
      }),
      distinctUntilChanged(_equalDimension),
      log('dst')
    );

    const nonNullImg$ = rxPipe(image$, opFilterNotNil);
    const nonNullRendition$ = rxPipe(
      renditionName$,
      opFilterNotNil,
      opDistinctUntilChanged
    );

    /**
     * Scaled image as computed from the rendition
     */
    const scaledImageFromRendition$: Observable<ScaledImage> = rxPipe(
      combineLatest([nonNullImg$, nonNullRendition$]),
      debounceTime(0),
      map(([img, name]) => getScaledImageFromRendition(name, img, logger)),
      distinctUntilChanged(_equalScaledImage),
      log('from rendition')
    );

    /**
     * Scaled image as computed from the size
     */
    const scaledImageFromSize$: Observable<ScaledImage> = rxPipe(
      combineLatest([nonNullImg$, dstDimension$]),
      debounceTime(0),
      map(([img, d]) => getScaledImageFromSize(d.w, d.h, img, logger)),
      distinctUntilChanged(_equalScaledImage),
      log('from size')
    );

    /**
     * Combine the images
     */
    const scaledImage$: Observable<ScaledImage> = merge(
      scaledImageFromRendition$,
      scaledImageFromSize$
    );

    // availability of the base URL
    const resourceUrl$: Observable<string> = rxPipe(
      aUrlConfig,
      opFilterNotNil,
      map(selectResourceUrl),
      typedPluck('href'),
      opDistinctUntilChanged
    );

    // compute the full scaled image
    const resultImg$ = rxPipe(
      combineLatest([resourceUrl$, scaledImage$]),
      debounceTime(0),
      map(([base, img]) =>
        _isRelativeURL(img.url) ? { ...img, url: `${base}${img.url}` } : img
      ),
      distinctUntilChanged(_equalScaledImage),
      log('result')
    );

    // update
    const update$ = rxPipe(
      combineLatest([resultImg$, currentElement$]),
      map(([img, el]) => {
        // keep the old attribute for fallback
        const url = getProperty(img, 'url', TRANSPARENT_PIXEL);
        renderer.setAttribute(el, 'src', url);
        // set the dimensions
        renderer.setAttribute(el, 'width', img.container.w.toString());
        renderer.setAttribute(el, 'height', img.container.h.toString());
        // returns the image
        return img;
      }),
      takeUntil(onDestroy$)
    );

    // subscribe
    update$.subscribe(that.image$);
  }

  // this seems to be required in order to have AOT recognize the method
  ngOnInit() {
    super.ngOnInit();
  }

  // this seems to be required in order to have AOT recognize the method
  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
