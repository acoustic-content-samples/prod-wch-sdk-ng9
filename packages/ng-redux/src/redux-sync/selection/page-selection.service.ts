import {
  ActivePageV2,
  createVersionString,
  KEY_ID,
  KEY_METADATA,
  LoggerService
} from '@acoustic-content-sdk/api';
import {
  ACOUSTIC_TOKEN_ACTIVE_PAGE,
  ACOUSTIC_TOKEN_LOGGER_SERVICE
} from '@acoustic-content-sdk/ng-api';
import { ACOUSTIC_TOKEN_REDUX_STORE } from '@acoustic-content-sdk/ng-redux-api';
import {
  selectAuthContentFeature,
  selectAuthoringContentItem
} from '@acoustic-content-sdk/redux-feature-auth-content';
import {
  addInlineEditSelectedItemAction,
  selectInlineEditFeature,
  selectInlineEditSelectedItem
} from '@acoustic-content-sdk/redux-feature-inline-edit';
import {
  ReduxRootStore,
  rxSelect,
  rxStore
} from '@acoustic-content-sdk/redux-store';
import { isAuthoringSiteNavigationPage } from '@acoustic-content-sdk/sites-api';
import {
  filterTypeOf,
  isEqual,
  boxLoggerService,
  opShareLast,
  rxNext,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { Inject, Injectable, NgZone, OnDestroy, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, merge, MonoTypeOperatorFunction, Subject } from 'rxjs';
import {
  filter,
  map,
  pluck,
  takeUntil,
  tap,
  withLatestFrom
} from 'rxjs/operators';

import { selectCanonicalPath } from '../../utils/selection.utils';
import { MODULE, VERSION } from './../../version';

const LOGGER = 'PageSelectionService';

@Injectable()
export class PageSelectionService implements OnDestroy {
  // done trigger
  private readonly done$ = new Subject<any>();

  constructor(
    zone: NgZone,
    router: Router,
    @Inject(ACOUSTIC_TOKEN_REDUX_STORE)
    store: ReduxRootStore,
    @Inject(ACOUSTIC_TOKEN_ACTIVE_PAGE)
    activePage: ActivePageV2,
    @Optional()
    @Inject(ACOUSTIC_TOKEN_LOGGER_SERVICE)
    aLogSvc?: LoggerService
  ) {
    // resolve the logger
    const logSvc = boxLoggerService(aLogSvc);
    const logger = logSvc.get(LOGGER);
    // next logger
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);

    logger.info('Initializing...');

    const store$ = rxStore(store);

    const authoringContent$ = rxPipe(
      store$,
      rxSelect(selectAuthContentFeature)
    );
    const inlineEdit$ = rxPipe(store$, rxSelect(selectInlineEditFeature));

    const selectedItemId$ = rxPipe(
      inlineEdit$,
      rxSelect(selectInlineEditSelectedItem),
      log('Selected item ID'),
      opShareLast
    );

    const authContentSelector$ = rxPipe(
      selectedItemId$,
      rxSelect(selectAuthoringContentItem)
    );

    const selectedPage$ = rxPipe(
      combineLatest(authContentSelector$, authoringContent$),
      rxSelect(([authContentSelector, authoringContent]) =>
        authContentSelector(authoringContent)
      ),
      log('Authoring content'),
      filterTypeOf(isAuthoringSiteNavigationPage),
      log('Selected page')
    );

    const newPath$ = rxPipe(
      selectedPage$,
      rxSelect(selectCanonicalPath),
      log('Selected path'),
      filter((path) => !isEqual(path, router.url)),
      log('Navigating to path'),
      tap((path) => zone.run(() => router.navigateByUrl(path)))
    );

    const dispatchAction$ = rxPipe(
      activePage.renderingContext$,
      pluck(KEY_METADATA, KEY_ID),
      log('New Page ID'),
      withLatestFrom(selectedItemId$),
      filter(([newId, currentId]) => !isEqual(newId, currentId)),
      map(([newId]) => addInlineEditSelectedItemAction(newId)),
      log('Dispatching action'),
      tap((action) => store.dispatch(action))
    );

    rxPipe(merge(dispatchAction$, newPath$), takeUntil(this.done$)).subscribe();

    // log this service
    logger.info(MODULE, createVersionString(VERSION));
  }

  ngOnDestroy(): void {
    this.done$.next();
  }
}
