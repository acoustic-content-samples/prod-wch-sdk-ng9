import {
  AuthoringContentItem,
  AuthoringElement,
  ELEMENT_TYPE,
  LoggerService
} from '@acoustic-content-sdk/api';
import { AccessorType } from '@acoustic-content-sdk/edit-api';
import {
  ElementTypeCallback,
  rxCreateReactRenderer
} from '@acoustic-content-sdk/react-utils';
import {
  selectAuthContentFeature,
  selectAuthoringContentItem
} from '@acoustic-content-sdk/redux-feature-auth-content';
import {
  selectAuthType,
  selectAuthTypeFeature
} from '@acoustic-content-sdk/redux-feature-auth-type';
import {
  ReduxRootStore,
  rxSelect,
  rxStore
} from '@acoustic-content-sdk/redux-store';
import {
  NOOP_LOGGER_SERVICE,
  pluckProperty,
  rxNext,
  rxPipe,
  rxWchFromAuthoringTypeByAccessor
} from '@acoustic-content-sdk/utils';
import { ReactNode } from 'react';
import {
  MonoTypeOperatorFunction,
  Observable,
  SchedulerLike,
  UnaryFunction
} from 'rxjs';
import { switchMap } from 'rxjs/operators';

// selects the element type from the authoring element
const selectElementType: UnaryFunction<
  AuthoringElement,
  ELEMENT_TYPE
> = pluckProperty<AuthoringElement, 'elementType'>('elementType') as any;

// selects the type id from a content item
const selectTypeId = pluckProperty<AuthoringContentItem, 'typeId'>('typeId');

/**
 * Renderer that converts a markup string into a react DOM representation. The react representation
 * might differ dependening on the content types
 *
 * @param aDocument - the target document
 * @returns the conversion function
 */
export function createReactRenderer(
  aStore: ReduxRootStore,
  aDoc: Document,
  aLoggerService: LoggerService = NOOP_LOGGER_SERVICE,
  aScheduler?: SchedulerLike
): UnaryFunction<string, Observable<ReactNode>> {
  // construct a logger
  const logger = aLoggerService.get('createReactRenderer');
  // next logger
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);
  // store
  const store$ = rxStore(aStore);
  // select the content
  const authContent$ = rxPipe(store$, rxSelect(selectAuthContentFeature));
  // select the type
  const authType$ = rxPipe(store$, rxSelect(selectAuthTypeFeature));
  // type callback
  const selectType = (aTypeId: string) =>
    rxPipe(authType$, rxSelect(selectAuthType(aTypeId)));
  // select type id
  const selectContent = (aItemId: string) =>
    rxPipe(authContent$, rxSelect(selectAuthoringContentItem(aItemId)));
  // the callback
  const elementTypeCallback: ElementTypeCallback = (
    aItemId: string,
    aAccessor: AccessorType
  ) =>
    rxPipe(
      selectContent(aItemId),
      rxSelect(selectTypeId),
      log(aItemId, aAccessor, 'typeId'),
      switchMap((typeId) =>
        rxWchFromAuthoringTypeByAccessor(
          aAccessor,
          typeId,
          selectElementType,
          selectType,
          aScheduler
        )
      ),
      log(aItemId, aAccessor, 'elementType')
    );
  // dispatch
  return rxCreateReactRenderer(
    elementTypeCallback,
    aDoc,
    aLoggerService,
    aScheduler
  );
}
