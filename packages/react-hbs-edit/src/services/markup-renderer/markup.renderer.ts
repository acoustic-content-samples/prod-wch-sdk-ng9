import {
  CLASSIFICATION_ASSET,
  CLASSIFICATION_CONTENT,
  CLASSIFICATION_CONTENT_TYPE,
  CLASSIFICATION_LAYOUT,
  CLASSIFICATION_LAYOUT_MAPPING,
  DeliveryContentItem,
  DeliveryContentMetadata,
  DeliveryGroupElement,
  ExtendedContextV2,
  KEY_METADATA,
  Logger,
  LoggerService,
  RenderingContextV2
} from '@acoustic-content-sdk/api';
import { AccessorType } from '@acoustic-content-sdk/edit-api';
import { guaranteeAuthoringContentAction } from '@acoustic-content-sdk/redux-feature-auth-content';
import {
  guaranteeAuthoringLayoutAction,
  selectAuthLayoutFeature,
  selectAuthoringLayout
} from '@acoustic-content-sdk/redux-feature-auth-layout';
import {
  guaranteeAuthoringLayoutMappingAction,
  selectAuthLayoutMappingFeature,
  selectAuthoringLayoutMappingByTypeId
} from '@acoustic-content-sdk/redux-feature-auth-layout-mapping';
import {
  guaranteeAuthoringContentTypeAction,
  selectAuthType,
  selectAuthTypeFeature
} from '@acoustic-content-sdk/redux-feature-auth-type';
import {
  selectDeliveryContentFeature,
  selectDeliveryContentItem
} from '@acoustic-content-sdk/redux-feature-delivery-content';
import { selectEditModeFeature } from '@acoustic-content-sdk/redux-feature-edit-mode';
import {
  handlebarsGuaranteeTemplateAction,
  selectHandlebarsFeature,
  selectTemplate
} from '@acoustic-content-sdk/redux-feature-handlebars';
import { selectUrlConfigFeature } from '@acoustic-content-sdk/redux-feature-url-config';
import {
  ReduxRootStore,
  rxDispatch,
  rxSelect,
  rxStore
} from '@acoustic-content-sdk/redux-store';
import {
  anyToString,
  createDeliveryContentItem,
  createMarkupRendererV2,
  escapeHtml,
  isFunction,
  isNotEmpty,
  isNotNil,
  opDeepDistinctUntilChanged,
  pluckProperty,
  rxNext,
  rxPipe,
  wchDeliveryContentByAccessor
} from '@acoustic-content-sdk/utils';
import {
  combineLatest,
  MonoTypeOperatorFunction,
  Observable,
  of,
  queueScheduler,
  SchedulerLike,
  UnaryFunction
} from 'rxjs';
import { map } from 'rxjs/operators';

const LOGGER = 'createRendererV2';

const selectMetadata = pluckProperty<any, typeof KEY_METADATA>(KEY_METADATA);

/**
 * Extracts a nested group element as a content item from an existing content item.
 *
 * @param aItem  - the original item
 * @param aAccessor - the accessor string
 */
function selectNestedDeliveryContent(
  aItem: DeliveryContentItem,
  aAccessor: AccessorType
): DeliveryContentItem {
  // select the group item
  const item = wchDeliveryContentByAccessor(aItem, aAccessor);
  const itemMetadata = selectMetadata(item);
  if (isNotNil(itemMetadata)) {
    // we know that we have a group level item
    const groupItem: DeliveryContentItem | DeliveryGroupElement = item as any;
    // merge with the top level metadata
    const contentMetadata = selectMetadata(aItem);
    // augmented
    const augMetadata: DeliveryContentMetadata = {
      ...contentMetadata,
      ...itemMetadata,
      selectedLayouts: undefined
    };
    // returns the object
    return {
      ...groupItem,
      [KEY_METADATA]: augMetadata
    };
  }
  // returns the item as is
  return aItem;
}

function createNestedDeliveryContentSelector(
  aDeliveryContent: UnaryFunction<string, Observable<DeliveryContentItem>>,
  aLogger: Logger
): UnaryFunction<string, Observable<DeliveryContentItem>> {
  // some logging
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(aLogger);
  /**
   * Our inner function
   *
   * @param aCompoundId - a potentially compound ID
   * @returns the resolved item
   */
  return (aCompoundId: string): Observable<DeliveryContentItem> => {
    // split
    const [id, accessor] = aCompoundId.split('#');
    // the original object
    const content$ = aDeliveryContent(id);
    // select a sub-content if required
    return isNotEmpty(accessor)
      ? rxPipe(
          content$,
          map((item) => selectNestedDeliveryContent(item, accessor)),
          log('nested content')
        )
      : content$;
  };
}

/**
 * Constructs a new renderer that applies a handlebars transform to produce rendered markup. The
 * markup will be kept current whenever any of the underlying data changes.
 *
 * @param aStore - the store that manages the state of interest
 * @param aLogger  - optional logger
 * @param aScheduler - optional scheduler
 *
 * @returns a function that maps from content item ID to an obervable of the rendered markup
 */
function createRendererV2(
  aStore: ReduxRootStore,
  aLoggerService: LoggerService,
  aScheduler: SchedulerLike = queueScheduler
): (aCompoundId: string, aLayoutMode?: string) => Observable<string> {
  // construct a logger
  const logger = aLoggerService.get(LOGGER);
  logger.info('v2');
  // next logger
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);
  // rx wrapper
  const store$ = rxStore(aStore);
  // dispatch
  const dispatch = rxDispatch(aStore);

  // construct the callbacks
  const deliveryContent$ = rxPipe(
    store$,
    rxSelect(selectDeliveryContentFeature)
  );
  const authoringType$ = rxPipe(store$, rxSelect(selectAuthTypeFeature));
  const authLayoutMapping$ = rxPipe(
    store$,
    rxSelect(selectAuthLayoutMappingFeature)
  );
  const authLayout$ = rxPipe(store$, rxSelect(selectAuthLayoutFeature));
  const handlebars$ = rxPipe(store$, rxSelect(selectHandlebarsFeature));
  const urlConfig$ = rxPipe(store$, rxSelect(selectUrlConfigFeature));
  const editMode$ = rxPipe(store$, rxSelect(selectEditModeFeature));

  /** Compute the extended context */
  function extendedContext(): Observable<ExtendedContextV2> {
    // derive from the hub context
    return rxPipe(
      combineLatest([urlConfig$, editMode$]),
      opDeepDistinctUntilChanged,
      map(([hub, editMode]) => ({ hub, editMode }))
    );
  }

  // we only need to compute the context, once
  const extendedContext$ = extendedContext();

  const single = <T>(aValue: T) => of(aValue, aScheduler);

  const emptyString = () => single('');

  /**
   * Produces some error markup
   *
   * @param error - the error object
   *
   * @returns the actual error markup
   */
  const errorMarkup = (error: any, aId: string) =>
    single(`<pre>${escapeHtml(anyToString(error))} @ ${aId}</pre>`);

  // generates the callback function for a markup template
  const applyTemplate = (
    aId: string,
    aTemplate: UnaryFunction<any, string>
  ): UnaryFunction<RenderingContextV2, Observable<string>> => (
    ctx: RenderingContextV2
  ) => {
    try {
      // log this
      logger.info('Apply template', aId);
      // tries to execute the
      return single(aTemplate(ctx));
    } catch (error) {
      // log this
      logger.error('Error in template', aId, error);
      // returns error markup
      return errorMarkup(error, aId);
    }
  };

  // construct the selectors
  const selectDeliveryContent$ = (aId: string) => {
    // log this
    logger.info(CLASSIFICATION_CONTENT, aId);
    // make sure we load the type
    dispatch(guaranteeAuthoringContentAction(aId));
    // resolve
    return rxPipe(
      deliveryContent$,
      rxSelect(selectDeliveryContentItem(aId)),
      rxSelect(createDeliveryContentItem),
      log(CLASSIFICATION_CONTENT, aId)
    );
  };
  const selectAuthType$ = (aId: string) => {
    // log this
    logger.info(CLASSIFICATION_CONTENT_TYPE, aId);
    // make sure we load the type
    dispatch(guaranteeAuthoringContentTypeAction(aId));
    // resolve
    return rxPipe(
      authoringType$,
      rxSelect(selectAuthType(aId)),
      log(CLASSIFICATION_CONTENT_TYPE, aId)
    );
  };
  const selectAuthLayoutMapping$ = (aId: string) => {
    // log this
    logger.info(CLASSIFICATION_LAYOUT_MAPPING, aId);
    // make sure we load the type
    dispatch(guaranteeAuthoringLayoutMappingAction(aId));
    // resolve
    return rxPipe(
      authLayoutMapping$,
      rxSelect(selectAuthoringLayoutMappingByTypeId(aId)),
      log(CLASSIFICATION_LAYOUT_MAPPING, aId)
    );
  };
  const selectAuthLayout$ = (aId: string) => {
    // log this
    logger.info(CLASSIFICATION_LAYOUT, aId);
    // make sure we load the type
    dispatch(guaranteeAuthoringLayoutAction(aId));
    // resolve
    return rxPipe(
      authLayout$,
      rxSelect(selectAuthoringLayout(aId)),
      log(CLASSIFICATION_LAYOUT, aId)
    );
  };
  const selectMarkupTemplate$ = (aId: string) => {
    // log this
    logger.info(CLASSIFICATION_ASSET, aId);
    // make sure we load the type
    dispatch(handlebarsGuaranteeTemplateAction(aId));
    // resolve
    return rxPipe(
      handlebars$,
      rxSelect(selectTemplate(aId)),
      rxSelect((tmp) =>
        isFunction(tmp) ? applyTemplate(aId, tmp) : emptyString
      )
    );
  };
  // selector to allow us to resolve nested content
  const selectedNestedContent$ = createNestedDeliveryContentSelector(
    selectDeliveryContent$,
    logger
  );
  // dispatch
  return createMarkupRendererV2(
    selectedNestedContent$,
    selectAuthType$,
    selectAuthLayoutMapping$,
    selectAuthLayout$,
    selectMarkupTemplate$,
    extendedContext$,
    aLoggerService,
    aScheduler
  );
}

export const createMarkupRenderer = createRendererV2;
