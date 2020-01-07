import {
  CLASSIFICATION_CONTENT,
  createVersionString,
  DeliveryContentItem,
  DeliveryContentMetadata,
  DeliveryGroupElement,
  DeliveryGroupElementMetadata,
  ExtendedContextV2,
  Logger,
  LoggerService,
  RenderingContextProviderV2,
  RenderingContextV2
} from '@acoustic-content-sdk/api';
import {
  DeliveryContentResolver,
  RenderingContextInput,
  RenderingContextResolver
} from '@acoustic-content-sdk/component-api';
import {
  assignObject,
  isNil,
  isNotNil,
  isString,
  KEY_RENDERING_CONTEXT,
  NOOP_LOGGER_SERVICE,
  opDistinctUntilChanged,
  pluckProperty,
  rxNext,
  rxPipe,
  UNDEFINED$
} from '@acoustic-content-sdk/utils';
import {
  combineLatest,
  MonoTypeOperatorFunction,
  Observable,
  UnaryFunction
} from 'rxjs';
import { map } from 'rxjs/operators';

import { selectMetadata } from '../../utils/selectors';
import { MODULE, VERSION } from './../../version';

const selectMetadataFromRenderingContext: UnaryFunction<
  RenderingContextV2,
  DeliveryContentMetadata
> = selectMetadata as any;

const selectMetadataFromGroupElement: UnaryFunction<
  DeliveryGroupElement,
  DeliveryGroupElementMetadata
> = selectMetadata as any;

const selectRenderingContext = pluckProperty<
  RenderingContextProviderV2,
  'renderingContext$'
>('renderingContext$');

const selectContext = pluckProperty<RenderingContextV2, '$context'>('$context');

const selectSystemModified = pluckProperty<any, 'systemModified'>(
  'systemModified'
);

const selectId = pluckProperty<any, 'id'>('id');

/**
 * Merge the properties
 */
function augmentDeliveryGroupElement(
  aItem: DeliveryGroupElement,
  aPartial: Partial<RenderingContextV2>
): RenderingContextV2 {
  // cleanup the group level metadata
  const $metadata = { ...selectMetadata(aPartial) };
  delete $metadata.selectedLayouts;
  assignObject($metadata, selectMetadataFromGroupElement(aItem));
  // merge the context
  return { ...aItem, ...aPartial, $metadata } as any;
}

/**
 * Merge the properties
 */
function augmentDeliveryContentItem(
  aItem: DeliveryContentItem,
  $context: ExtendedContextV2
): RenderingContextV2 {
  return { ...aItem, $context };
}

const EMPTY_DELIVERY_CONTENT_METADATA: Partial<DeliveryContentMetadata> = {
  accessor: 'elements',
  classification: CLASSIFICATION_CONTENT
};

function augmentUndefinedContentItem(
  id: string,
  $context: ExtendedContextV2
): RenderingContextV2 {
  // empty metadata
  const $metadata: any = {
    ...EMPTY_DELIVERY_CONTENT_METADATA,
    id
  };
  return { $metadata, $context };
}

function fromDeliveryContentItem(
  aItem: DeliveryContentItem,
  aProvider: RenderingContextProviderV2,
  aLogger: Logger
): Observable<RenderingContextV2> {
  // log this
  aLogger.info('fromDeliveryContentItem', aItem);
  // next logger
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(aLogger);
  // resolve
  const $context$ = rxPipe(
    selectRenderingContext(aProvider),
    map(selectContext),
    opDistinctUntilChanged
  );
  // combine
  return rxPipe(
    $context$,
    map(($context) => augmentDeliveryContentItem(aItem, $context)),
    log(KEY_RENDERING_CONTEXT)
  );
}

/**
 * Renders a group element. We pull metadata and context from the top level item
 *
 * @param aItem   - the delivery element to render
 * @param aProvider   - provider of the context
 * @param aLogger - logger
 *
 * @returns rendering context for the item
 */
function fromDeliveryGroupElement(
  aItem: DeliveryGroupElement,
  aProvider: RenderingContextProviderV2,
  aLogger: Logger
): Observable<RenderingContextV2> {
  // log this
  aLogger.info('fromDeliveryGroupElement', aItem);
  // next logger
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(aLogger);
  // resolve the original rendering context
  const renderingContext$ = rxPipe(
    selectRenderingContext(aProvider),
    opDistinctUntilChanged,
    map((rc) => ({
      $context: selectContext(rc),
      $metadata: selectMetadataFromRenderingContext(rc)
    }))
  );
  // combine
  return rxPipe(
    renderingContext$,
    map((partial) => augmentDeliveryGroupElement(aItem, partial)),
    log(KEY_RENDERING_CONTEXT)
  );
}

/**
 * Resolves the rendering context based on a string ID
 *
 * @param aItem - the string ID
 * @param aProvider - basic provider of the context
 * @param aResolver - resolver for the actual content
 *
 * @returns the resolved context
 */
function fromString(
  aItem: string,
  aProvider: RenderingContextProviderV2,
  aDeliveryContent: DeliveryContentResolver,
  aLogger: Logger
): Observable<RenderingContextV2> {
  // log the input
  aLogger.info('fromString', aItem);
  // next logger
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(aLogger);
  // resolve the basic context
  const context$ = rxPipe(
    selectRenderingContext(aProvider),
    map(selectContext),
    opDistinctUntilChanged
  );
  // resolve the content item
  const item$ = rxPipe(
    aDeliveryContent.getDeliveryContentItem(aItem),
    opDistinctUntilChanged
  );
  // combine
  return rxPipe(
    combineLatest([item$, context$]),
    // debounceTime(0),
    map(([item, $context]) =>
      isNotNil(item)
        ? augmentDeliveryContentItem(item, $context)
        : augmentUndefinedContentItem(aItem, $context)
    ),
    log(KEY_RENDERING_CONTEXT)
  );
}

/**
 * Constructs the rendering context based on the input
 *
 * @param aItem - the item to render
 * @param aProvider - basic provider of the context
 * @param aResolver - resolver for the actual content
 *
 * @returns the resolved context
 */
function createRenderingContext(
  aItem: RenderingContextInput,
  aProvider: RenderingContextProviderV2,
  aDeliveryContent: DeliveryContentResolver,
  aLogger: Logger
): Observable<RenderingContextV2> {
  // log the input
  aLogger.info('createRenderingContext', aItem);
  // quick bail out
  if (isNil(aItem)) {
    return UNDEFINED$;
  }
  // check for the cases
  if (isString(aItem)) {
    return fromString(aItem, aProvider, aDeliveryContent, aLogger);
  }
  // access the metadata to tell the items apart
  const $metadata = selectMetadata(aItem);
  // test the id
  const id = selectId($metadata);
  if (isString(id)) {
    // check if we have a top level element or a reference element
    const sysMod = selectSystemModified($metadata);
    return isNotNil(sysMod)
      ? fromDeliveryContentItem(
          aItem as DeliveryContentItem,
          aProvider,
          aLogger
        )
      : fromString(id, aProvider, aDeliveryContent, aLogger);
  }
  // this must be a group element
  return fromDeliveryGroupElement(
    aItem as DeliveryGroupElement,
    aProvider,
    aLogger
  );
}

const LOGGER = 'AbstractRenderingContextResolverService';

/**
 * Implementation of a service that resolves the outbound parts of a rendering context
 */
export class AbstractRenderingContextResolverService
  implements RenderingContextResolver {
  resolveRenderingContext: (
    aItem: RenderingContextInput,
    aProvider: RenderingContextProviderV2
  ) => Observable<RenderingContextV2>;

  protected constructor(
    aDeliveryContentResolver: DeliveryContentResolver,
    aLogSvc?: LoggerService
  ) {
    // logger
    const logSvc = aLogSvc || NOOP_LOGGER_SERVICE;
    // logger
    const logger = logSvc.get(LOGGER);

    const resolveRenderingContext = (
      aItem: RenderingContextInput,
      aProvider: RenderingContextProviderV2
    ): Observable<RenderingContextV2> =>
      createRenderingContext(
        aItem,
        aProvider,
        aDeliveryContentResolver,
        logger
      );

    this.resolveRenderingContext = resolveRenderingContext;

    // log this service
    logger.info(MODULE, createVersionString(VERSION));
  }
}
