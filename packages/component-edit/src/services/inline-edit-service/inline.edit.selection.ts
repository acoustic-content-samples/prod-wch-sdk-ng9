import { Logger, LoggerService } from '@acoustic-content-sdk/api';
import {
  ATTR_DATA_SELECTABLE,
  InlineEditSelectionProvider
} from '@acoustic-content-sdk/edit-api';
import {
  createSingleSubject,
  filterTypeOf,
  forEach,
  isEqual,
  isFunction,
  isNotEmpty,
  isNotNil,
  Maybe,
  NOOP_LOGGER_SERVICE,
  opDistinctUntilChanged,
  opShareLast,
  partialSecond,
  rxNext,
  rxPipe,
  rxSelectProperty
} from '@acoustic-content-sdk/utils';
import {
  fromEvent,
  merge,
  MonoTypeOperatorFunction,
  Observable,
  Unsubscribable
} from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import {
  getAttribute,
  getElementOrParentWithAttribute,
  isElement
} from '../../utils/dom';

const LOGGER = 'AbstractInlineEditSelection';

export function getInlineEditSelection(
  aDocument: Document,
  aLogSvc?: LoggerService
): Observable<string> {
  // logging
  const logSvc = aLogSvc || NOOP_LOGGER_SERVICE;
  const logger = logSvc.get(LOGGER);
  // logging
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);
  // attach to the event
  const click$ = fromEvent(aDocument, 'click', {
    capture: true
  });
  const focus$ = fromEvent(aDocument, 'focus', {
    capture: true
  });
  // the events
  return rxPipe(
    // merge the relevant events
    merge(click$, focus$),
    // get the event target
    rxSelectProperty('target'),
    // sanity check
    filterTypeOf(isElement),
    // get the selectable element
    map(partialSecond(getElementOrParentWithAttribute, ATTR_DATA_SELECTABLE)),
    // do not count twice
    opDistinctUntilChanged,
    // retrieve the attribute value
    map(partialSecond(getAttribute, ATTR_DATA_SELECTABLE)),
    // do not count twice
    opDistinctUntilChanged,
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
    const logSvc = aLogSvc || NOOP_LOGGER_SERVICE;
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
