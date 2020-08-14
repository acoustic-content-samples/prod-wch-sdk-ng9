import { Logger, LoggerService } from '@acoustic-content-sdk/api';
import {
  ATTR_DATA_SELECTABLE,
  InlineEditSelectionProvider
} from '@acoustic-content-sdk/edit-api';
import {
  boxLoggerService,
  createSingleSubject,
  filterTypeOf,
  forEach,
  isEqual,
  isFunction,
  isNotEmpty,
  isNotNil,
  Maybe,
  opDistinctUntilChanged,
  opShareLast,
  partialSecond,
  rxNext,
  rxPipe,
  pluckProperty
} from '@acoustic-content-sdk/utils';
import {
  fromEvent,
  MonoTypeOperatorFunction,
  Observable,
  Unsubscribable
} from 'rxjs';
import { map, takeUntil, filter } from 'rxjs/operators';

import {
  getAttribute,
  getElementOrParentWithAttribute,
  getElementOrParentWithClass,
  isElement
} from '../../utils/dom';

const LOGGER = 'AbstractInlineEditSelection';

const elementsToIgnore = ['ck-toolbar', 'ck-link-form'];

export function getInlineEditSelection(
  aDocument: Document,
  aLogSvc?: LoggerService
): Observable<string> {
  // logging
  const logSvc = boxLoggerService(aLogSvc);
  const logger = logSvc.get(LOGGER);
  // logging
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);
  // attach to the event
  const click$ = fromEvent(aDocument, 'click');
  // the events
  return rxPipe(
    click$,
    // get the event target
    map(pluckProperty('target')),
    // sanity check
    filterTypeOf(isElement),
    // ignore clicks on the ckeditor toolbar
    filter(
      (element) =>
        !elementsToIgnore.some((className) =>
          getElementOrParentWithClass(element, className)
        )
    ),
    // get the selectable element
    map(partialSecond(getElementOrParentWithAttribute, ATTR_DATA_SELECTABLE)),
    // retrieve the attribute value
    map(partialSecond(getAttribute, ATTR_DATA_SELECTABLE)),
    // log this
    log('selected'),
    // share
    opShareLast
  );
}

const SELECTOR = `[${ATTR_DATA_SELECTABLE}]`;

function removeSingleSelection(
  aSelection: Maybe<string>,
  aClass: string,
  aElement: HTMLElement,
  aLogger: Logger
) {
  // log this
  aLogger.info('Deselect', aElement);
  // unselect
  aElement.classList.remove(aClass);
}

function handleSingleSelection(
  aSelection: Maybe<string>,
  aClass: string,
  aElement: HTMLElement,
  aLogger: Logger
) {
  // classlist to modify
  const { classList } = aElement;
  // add or remove the class
  const sel = getAttribute(aElement, ATTR_DATA_SELECTABLE);
  if (isEqual(aSelection, sel)) {
    // log this
    aLogger.info('Select', aElement);
    // set the class
    classList.add(aClass);
  } else {
    // log this
    aLogger.info('Deselect', aElement);
    // remove the class
    classList.remove(aClass);
  }
}

/**
 * Manages the current selection
 *
 * @param aSelection - the selection string
 * @param aClass - the class to set if an element is selected
 * @param aDocument - root node
 */
function handleSelection(
  aSelection: Maybe<string>,
  aClass: string,
  aDocument: ParentNode,
  aLogger: Logger
) {
  // delegate to call
  const delegate = isNotEmpty(aSelection)
    ? handleSingleSelection
    : removeSingleSelection;
  // dispatch
  forEach(aDocument.querySelectorAll<HTMLElement>(SELECTOR), (element) =>
    delegate(aSelection, aClass, element, aLogger)
  );
}

export class AbstractInlineEditSelectionService implements Unsubscribable {
  private readonly done$ = createSingleSubject();

  constructor(
    aSelectedClass: string,
    aSelectionProvider: InlineEditSelectionProvider,
    aDocument?: any,
    aLogSvc?: LoggerService
  ) {
    // some logging
    const logSvc = boxLoggerService(aLogSvc);
    const logger = logSvc.get(LOGGER);
    // check if we have a doc
    if (isNotNil(aDocument) && isFunction(aDocument.querySelectorAll)) {
      // attach
      const update$ = rxPipe(
        aSelectionProvider.selectedCell$,
        opDistinctUntilChanged,
        map((sel) => handleSelection(sel, aSelectedClass, aDocument, logger)),
        takeUntil(this.done$)
      );
      // ok
      update$.subscribe();
    } else {
      // warn
      logger.warn('No document available.');
    }
  }

  unsubscribe() {
    this.done$.next();
  }
}
