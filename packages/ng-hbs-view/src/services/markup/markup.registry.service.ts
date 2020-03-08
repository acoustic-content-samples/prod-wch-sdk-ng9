import { Logger, LoggerService } from '@acoustic-content-sdk/api';
import { ProtectedContent } from '@acoustic-content-sdk/component-api';
import {
  ACOUSTIC_TOKEN_LOGGER_SERVICE,
  ACOUSTIC_TOKEN_PROTECTED_CONTENT
} from '@acoustic-content-sdk/ng-api';
import { ACOUSTIC_TOKEN_FETCH_TEXT } from '@acoustic-content-sdk/ng-rest-api';
import { FetchText } from '@acoustic-content-sdk/rest-api';
import {
  assignObject,
  boxLoggerService,
  createLruCache,
  createSingleSubject,
  forEach,
  isNil,
  isNotNil,
  rxNext,
  rxPipe,
  UNDEFINED$
} from '@acoustic-content-sdk/utils';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnDestroy, Optional } from '@angular/core';
import {
  MonoTypeOperatorFunction,
  Observable,
  Subject,
  Unsubscribable
} from 'rxjs';
import {
  catchError,
  finalize,
  first,
  map,
  switchMap,
  takeUntil
} from 'rxjs/operators';

const LOGGER = 'AcNgMarkupRegistryService';

const DATA_ACOUSTIC_MARKUP_FRAGMENT = 'data-acoustic-markup-fragment';

const FRAGMENT_SELECTOR = `[${DATA_ACOUSTIC_MARKUP_FRAGMENT}]`;

/** Default timeout */
const DEFAULT_TIMEOUT = 60 * 1000;

/** Default count */
const DEFAULT_MAXCOUNT = 1000;

const REL_PUBLIC_PATH_RENDER = 'delivery/v1/rendering/render/content/';
const REL_PROTECTED_PATH_RENDER = 'mydelivery/v1/rendering/render/content/';

/**
 * Actually send a request
 *
 * @param aIsProtected - flag to tell whether this is a public or a protected path
 * @param aId - the ID of the item
 * @param aFetchText - the client used to make the request
 *
 * @returns the observable of the pre-rendering result
 */
function sendRequest<T>(
  aIsProtected: boolean,
  aId: string,
  aFetchText: FetchText,
  aLogger: Logger
): Observable<string> {
  // the path
  const path = aIsProtected
    ? REL_PROTECTED_PATH_RENDER
    : REL_PUBLIC_PATH_RENDER;
  // build the URL
  const url = `${path}${encodeURIComponent(aId)}`;
  // make the request
  return rxPipe(
    aFetchText(url),
    catchError((error) => {
      // log a warning
      aLogger.warn(`Error fetching markup for [${aId}].`, error);
      // nothing to return
      return UNDEFINED$;
    })
  );
}

@Injectable()
export class AcNgMarkupRegistryService implements OnDestroy {
  // destroy callback
  private readonly done$ = createSingleSubject<void>();
  // manage markup fragments
  add: (aNode?: ParentNode) => void;
  get: (aSelector: string) => Observable<string>;

  constructor(
    @Inject(DOCUMENT)
    aDocument: any,
    @Inject(ACOUSTIC_TOKEN_PROTECTED_CONTENT)
    aProtected: ProtectedContent,
    @Inject(ACOUSTIC_TOKEN_FETCH_TEXT)
    aFetchText: FetchText,
    @Optional()
    @Inject(ACOUSTIC_TOKEN_LOGGER_SERVICE)
    aLogSvc?: LoggerService
  ) {
    // logger
    const logSvc = boxLoggerService(aLogSvc);
    const logger = logSvc.get(LOGGER);
    // logging
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);
    // doc
    const doc: Document = aDocument;
    // template node
    const template = doc.createElement('template');
    // the cache
    const cache = createLruCache<Subject<string>>(
      DEFAULT_TIMEOUT,
      DEFAULT_MAXCOUNT,
      logger
    );
    // getter
    const getSubject = (aSelector: string) =>
      cache(aSelector, createSingleSubject);
    // adds an element
    const addElement = (aElement: Element) =>
      getSubject(aElement.getAttribute(DATA_ACOUSTIC_MARKUP_FRAGMENT)).next(
        aElement.outerHTML
      );
    // register a new fragment
    const add = (aNode?: ParentNode) =>
      forEach((aNode || doc).querySelectorAll(FRAGMENT_SELECTOR), addElement);
    // add markup
    const addMarkup = (aId: string, aMarkup: string) => {
      // register the full fragment
      getSubject(aId).next(aMarkup);
      // parse the node
      template.innerHTML = aMarkup;
      // add all content
      add(template.content);
    };
    // loading history
    const loading: Record<string, Unsubscribable> = {};
    // registry of currently loading objects
    const registerFragment = (aId: string) => {
      // only continue if we are not loading, yet
      const sub = loading[aId];
      if (isNil(sub)) {
        // register a new fragment
        loading[aId] = rxPipe(
          // wait for the protected flag
          aProtected.protected$,
          // loads the markup string
          switchMap((bProtected) =>
            sendRequest(bProtected, aId, aFetchText, logger)
          ),
          // markup
          log(aId),
          // if have markup, register it
          map((markup) =>
            isNotNil(markup) ? addMarkup(aId, markup) : undefined
          ),
          // just get the first value
          first(),
          // unregister
          finalize(() => delete loading[aId]),
          // cancel callback
          takeUntil(this.done$)
        ).subscribe();
      }
    };
    // the getter
    const get = (aSelector: string) => {
      // split
      const idx = aSelector.lastIndexOf('#');
      const id = idx >= 0 ? aSelector.substr(0, idx) : aSelector;
      // make sure we load the id
      registerFragment(id);
      // return the fragment
      return getSubject(aSelector);
    };
    // attach
    assignObject(this, { add, get });
  }

  ngOnDestroy() {
    this.done$.next();
  }
}
