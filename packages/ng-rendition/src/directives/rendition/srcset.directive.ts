/** Copyright IBM Corp. 2017 */
import { Image, LoggerService, UrlConfig } from '@acoustic-content-sdk/api';
import {
  WCH_TOKEN_LOGGER_SERVICE,
  WCH_TOKEN_URL_CONFIG
} from '@acoustic-content-sdk/ng-api';
import { AbstractLifeCycleComponent } from '@acoustic-content-sdk/ng-utils';
import { getSourceSet } from '@acoustic-content-sdk/rendition-utils';
import {
  createSetterOnSubject,
  createSingleSubject,
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
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2
} from '@angular/core';
import { combineLatest, MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map, mapTo, takeUntil } from 'rxjs/operators';

const LOGGER = 'SrcSetDirective';

@Directive({
  selector: '[wchSrcSet]'
})
export class SrcSetDirective extends AbstractLifeCycleComponent
  implements OnInit, OnDestroy {
  // image object to be edited
  @Input() wchSrcSet: Image;

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
    const image$ = createSingleSubject<Image>();

    // declare the getters
    Object.defineProperties(that, {
      wchSrcSet: createSetterOnSubject(image$)
    });

    // exposes the current element
    const currentElement$: Observable<HTMLImageElement> = rxPipe(
      onInit$,
      mapTo(parentRef.nativeElement as HTMLImageElement),
      opFilterNotNil,
      opDistinctUntilChanged
    );

    // availability of the base URL
    const resourceUrl$: Observable<string> = rxPipe(
      aUrlConfig,
      opFilterNotNil,
      map(selectResourceUrl),
      typedPluck('href'),
      opDistinctUntilChanged
    );

    // compute the source set
    const srcSet$ = rxPipe(
      combineLatest([resourceUrl$, image$]),
      map<[string, Image], string>(([origin, img]) =>
        getSourceSet(img, origin)
      ),
      log('srcset'),
      opDistinctUntilChanged
    );

    const update$ = rxPipe(
      combineLatest([srcSet$, currentElement$]),
      map(([srcset, el]) => {
        // update the attribute
        renderer.setAttribute(el, 'srcset', srcset);
        return srcset;
      }),
      takeUntil(onDestroy$)
    );

    // attach
    update$.subscribe();
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
