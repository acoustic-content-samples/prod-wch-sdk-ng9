import {
  AbstractElement,
  AUTHORING_ELEMENT_IMAGE_TYPE,
  AuthoringContentItem,
  AuthoringElement,
  AuthoringImageElement,
  AuthoringType,
  ContentItem,
  ELEMENT_TYPE,
  Logger,
  RenderingContext
} from '@acoustic-content-sdk/api';
import { AccessorType } from '@acoustic-content-sdk/edit-api';
import { rxSelect } from '@acoustic-content-sdk/redux-store';
import { FetchText } from '@acoustic-content-sdk/rest-api';
import {
  arrayPush,
  filterArray,
  isNotEmpty,
  isString,
  opDistinctUntilChanged,
  opFilterNotNil,
  pluckProperty,
  Predicate,
  rxNext,
  rxPipe,
  rxWchFromAuthoringTypeByAccessor,
  UNDEFINED$,
  wchElementFromRenderingContext,
  wchForEachType,
  wchResolveType
} from '@acoustic-content-sdk/utils';
import {
  merge,
  MonoTypeOperatorFunction,
  Observable,
  OperatorFunction,
  queueScheduler,
  SchedulerLike,
  UnaryFunction
} from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';

import { selectAuthType } from '../state/auth-type/auth.type.selectors';
import { AuthoringTypeState } from '../state/auth-type/auth.type.state';

const REL_PATH_TYPE_BY_ID = 'delivery/v1/rendering/type/';

/**
 * Extracts the type ID from an item
 */
export const pluckTypeId = pluckProperty<
  RenderingContext | AuthoringContentItem | ContentItem,
  'typeId'
>('typeId');

/**
 * Extracts the type ID from an item
 */
export const pluckElementType = pluckProperty<AbstractElement, 'elementType'>(
  'elementType'
);

/**
 * Decodes the type from the rendering context. Emits undefined if we do not have a type.
 *
 * @param aLogger - the logger
 * @param aScheduler  - the scheduler
 */
function typeFromRenderingContext(
  aLogger: Logger,
  aScheduler: SchedulerLike
): UnaryFunction<
  AccessorType,
  OperatorFunction<RenderingContext, ELEMENT_TYPE>
> {
  // log wrapper
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(
    aLogger,
    'typeFromRenderingContext'
  );
  // dispatch
  return (aAccessorString) => (rc$) =>
    rxPipe(
      rc$,
      map((rc) => wchElementFromRenderingContext(rc, aAccessorString)),
      map(pluckElementType),
      log('elementType', aAccessorString),
      opDistinctUntilChanged
    );
}

export function selectAcceptType(
  aElement: AuthoringImageElement
): AUTHORING_ELEMENT_IMAGE_TYPE[] {
  return aElement.acceptType;
}

function selectElementType(aElement: AuthoringElement): ELEMENT_TYPE {
  return aElement.elementType as any;
}

/**
 * Tests if the type ID exists and if it is not empty
 *
 * @param aId - the ID
 * @returns true if the ID exists
 */
function isValidTypeId(aId: string): boolean {
  return isString(aId) && isNotEmpty(aId);
}

/**
 * Decodes the element type by resolving the authoring types. Emits undefined if the type is unknown.
 *
 * @param aAuthoringTypes$ - the authoring types
 * @param aLogger - the logger
 *
 * @returns operator function
 */
function typeFromAuthoringType(
  aAuthoringTypes$: Observable<AuthoringTypeState>,
  aLogger: Logger,
  aScheduler: SchedulerLike
): UnaryFunction<
  AccessorType,
  OperatorFunction<RenderingContext, ELEMENT_TYPE>
> {
  // log wrapper
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(
    aLogger,
    'typeFromAuthoringType'
  );

  // resolver for types
  const typeResolver: UnaryFunction<string, Observable<AuthoringType>> = (id) =>
    rxPipe(aAuthoringTypes$, rxSelect(selectAuthType(id)));

  // the resolution function
  const resolve = (aAccessorString) => (rc$: Observable<RenderingContext>) => {
    /**
     * Extract the type ID. If we do not have a type ID, return undefined
     */
    const typeId$: Observable<string> = rxPipe(
      rc$,
      map(pluckTypeId),
      opDistinctUntilChanged,
      log('typeId', aAccessorString)
    );

    /** Resolves the authoring type by ID */
    return rxPipe(
      typeId$,
      switchMap((typeId) =>
        isValidTypeId(typeId)
          ? rxWchFromAuthoringTypeByAccessor(
              aAccessorString,
              typeId,
              selectElementType,
              typeResolver,
              aScheduler
            )
          : UNDEFINED$
      ),
      log('elementType', aAccessorString)
    );
  };

  // returns the resolution function
  return resolve;
}

/**
 * Resolves the element type, either directly from the element or from the authoring type
 *
 * @param aAuthoringTypes$ - the set of available authoring types
 * @param aLogger - optional logger
 * @param aScheduler - optional scheduler
 *
 * @returns the resolved type or undefined if the type could not be determined
 */
export function rxElementType(
  aAuthoringTypes$: Observable<AuthoringTypeState>,
  aLogger: Logger,
  aScheduler: SchedulerLike = queueScheduler
): UnaryFunction<
  AccessorType,
  OperatorFunction<RenderingContext, ELEMENT_TYPE>
> {
  // log wrapper
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(
    aLogger,
    'rxResolveAuthoringType'
  );
  // the two possible options
  const fromContext = typeFromRenderingContext(aLogger, aScheduler);
  const fromType = typeFromAuthoringType(aAuthoringTypes$, aLogger, aScheduler);
  // the callback
  function resolve(
    aAccessor: AccessorType
  ): OperatorFunction<RenderingContext, ELEMENT_TYPE> {
    // get the operators
    const opContext = fromContext(aAccessor);
    const opType = fromType(aAccessor);
    // implement the actual operator
    return (rc$) => {
      /** The type from the context, we do not want undefined emissions  */
      const ctx$ = rxPipe(rc$, opContext, opFilterNotNil);
      /** The type from the authoring type, we want undefined emissions if we
       * cannot determine the type.
       */
      const type$ = rxPipe(rc$, opType);
      // merge and take the most relevant one
      return rxPipe(
        merge(ctx$, type$, aScheduler),
        opDistinctUntilChanged,
        log('elementType')
      );
    };
  }
  // return the resolver
  return resolve;
}

/**
 * Returns all authoring types contained oi
 *
 * @param aAuthoringType - * @returns the list of referenced types
 */
export function authoringTypes(aAuthoringType: AuthoringType): AuthoringType[] {
  // target
  const types: AuthoringType[] = [];
  // iterate over the available types
  wchForEachType(aAuthoringType, (type) => arrayPush(type, types));
  // ok
  return types;
}

/**
 * Loads the authoring type via the delivery route. The resulting type will
 * have the typeRef fields expanded.
 *
 * @param aFetchText - callback used to load the type
 * @param aTypeId - ID of the type to load
 * @param aLogger - optional logger
 * @returns an observable of the loaded type
 */
function loadAuthoringType(
  aFetchText: FetchText,
  aTypeId: string,
  aLogger: Logger
): Observable<AuthoringType> {
  // construct the URL
  const url = `${REL_PATH_TYPE_BY_ID}${encodeURIComponent(aTypeId)}`;
  // load
  return rxPipe(
    aFetchText(url),
    first(),
    map(wchResolveType),
    tap((type) => aLogger.info('type', type))
  );
}

export type AuthoringTypeService = UnaryFunction<
  string,
  Observable<AuthoringType>
>;

/**
 * Returns a function that loads the authoring type per type ID. The type
 * information is resovled transitively across custom elements
 *
 * @param wchHttp - the service used to load the type
 * @param logger - optional logger
 *
 * @returns an observable of the desired type
 */
export const rxAuthoringType: (
  aFetchText: FetchText,
  aLogger: Logger
) => AuthoringTypeService = (fetchText, logger) => (typeId) =>
  isString(typeId) ? loadAuthoringType(fetchText, typeId, logger) : null;

/**
 * Returns all elements of a particular type
 *
 * @param aType - the au
 * @param aPredicate
 */
function getElementTypes(
  aType: AuthoringType,
  aPredicate: Predicate<AuthoringElement>
): AuthoringElement[] {
  return filterArray(aType.elements, aPredicate);
}
