import {
  AbstractElement,
  AuthoringContentItem,
  AuthoringElement,
  AuthoringType,
  ContentItem,
  ELEMENT_TYPE,
  Logger,
  LoggerService,
  RenderingContext
} from '@acoustic-content-sdk/api';
import { AccessorType } from '@acoustic-content-sdk/edit-api';
import {
  isNotEmpty,
  isString,
  NOOP_LOGGER_SERVICE,
  opDistinctUntilChanged,
  opFilterNotNil,
  pluckProperty,
  rxNext,
  rxPipe,
  rxWchFromAuthoringTypeByAccessor,
  UNDEFINED$,
  wchElementFromRenderingContext
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
import { map, switchMap } from 'rxjs/operators';

const LOGGER = 'AuthTypeUtils';

/**
 * Tests if the type ID exists and if it is not empty
 *
 * @param aId - the ID
 * @returns true if the ID exists
 */
function isValidTypeId(aId: string): boolean {
  return isString(aId) && isNotEmpty(aId);
}

const selectElementType = (aElement: AuthoringElement): ELEMENT_TYPE =>
  aElement.elementType as any;

/**
 * Extracts the type ID from an item
 */
const pluckTypeId = pluckProperty<
  RenderingContext | AuthoringContentItem | ContentItem,
  'typeId'
>('typeId');

/**
 * Extracts the type ID from an item
 */
const pluckElementType = pluckProperty<AbstractElement, 'elementType'>(
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

/**
 * Decodes the element type by resolving the authoring types. Emits undefined if the type is unknown.
 *
 * @param aAuthoringTypes$  the authoring types
 * @param aLogger - the logger
 *
 * @returns operator function
 */
function typeFromAuthoringType(
  aTypeResolver: UnaryFunction<string, Observable<AuthoringType>>,
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

  // the resolution function
  return (aAccessorString) => (rc$: Observable<RenderingContext>) => {
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
              aTypeResolver,
              aScheduler
            )
          : UNDEFINED$
      ),
      log('elementType', aAccessorString)
    );
  };
}

/**
 * Resolves the element type, either directly from the element or from the authoring type
 *
 * @param aAuthoringTypes$ - the set of available authoring types
 * @param aLogSvc - logger service
 * @param aScheduler - optional scheduler
 *
 * @returns the resolved type or undefined if the type could not be determined
 */
export function rxElementType(
  aTypeResolver: UnaryFunction<string, Observable<AuthoringType>>,
  aLogSvc: LoggerService = NOOP_LOGGER_SERVICE,
  aScheduler: SchedulerLike = queueScheduler
): UnaryFunction<
  AccessorType,
  OperatorFunction<RenderingContext, ELEMENT_TYPE>
> {
  // create the logger
  const logger = aLogSvc.get(LOGGER);
  // log wrapper
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(
    logger,
    'rxElementType'
  );
  // the two possible options
  const fromContext = typeFromRenderingContext(logger, aScheduler);
  const fromType = typeFromAuthoringType(aTypeResolver, logger, aScheduler);
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
