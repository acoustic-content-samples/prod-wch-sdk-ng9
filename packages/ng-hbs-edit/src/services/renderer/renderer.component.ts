import { LoggerService } from '@acoustic-content-sdk/api';
import { DeliveryContentResolver } from '@acoustic-content-sdk/component-api';
import { WchInlineEditServiceV2 } from '@acoustic-content-sdk/edit-api';
import {
  ACOUSTIC_TOKEN_DELIVERY_CONTENT_RESOLVER,
  ACOUSTIC_TOKEN_LOGGER_SERVICE
} from '@acoustic-content-sdk/ng-api';
import { ACOUSTIC_TOKEN_INLINE_EDIT_SERVICE } from '@acoustic-content-sdk/ng-edit-api';
import { ACOUSTIC_TOKEN_REDUX_STORE } from '@acoustic-content-sdk/ng-redux-api';
import { ReactComponent, ReactModule } from '@acoustic-content-sdk/react-api';
import {
  createHandlebarsComponent,
  HandlebarsComponentProps
} from '@acoustic-content-sdk/react-hbs-edit';
import { rxComponent } from '@acoustic-content-sdk/react-utils';
import { ReduxRootStore } from '@acoustic-content-sdk/redux-store';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable, pipe, UnaryFunction } from 'rxjs';
import { map, switchMapTo } from 'rxjs/operators';

/**
 * Constructs a component that listens for changes to the input observable
 *
 * @param id$  - id of the content to render
 * @param RendererComponent - the view layer
 *
 * @returns the react component
 */
function createReactRenderer(
  id$: Observable<string>,
  RendererComponent: ReactComponent<HandlebarsComponentProps>
): ReactModule {
  // business logic
  const bloc$ = pipe(
    switchMapTo(id$),
    map((contentItemId) => ({ contentItemId }))
  );
  // construct the component
  return rxComponent(bloc$, RendererComponent);
}

/**
 * Implementation of a service that exposes the react component that can be used
 * to render handlebars content in edit mode
 */
@Injectable()
export class HandlebarsRendererComponent {
  /**
   * create the renderer component
   */
  createRenderer: UnaryFunction<Observable<string>, ReactModule>;

  constructor(
    @Inject(ACOUSTIC_TOKEN_REDUX_STORE)
    aStore: ReduxRootStore,
    @Inject(ACOUSTIC_TOKEN_DELIVERY_CONTENT_RESOLVER)
    aDeliveryContentResolver: DeliveryContentResolver,
    @Inject(ACOUSTIC_TOKEN_INLINE_EDIT_SERVICE)
    aInlineEditService: WchInlineEditServiceV2,
    @Inject(DOCUMENT)
    aDocument: any,
    @Optional()
    @Inject(ACOUSTIC_TOKEN_LOGGER_SERVICE)
    aLogSvc: LoggerService
  ) {
    // construct the component
    const RendererComponent = createHandlebarsComponent(
      aStore,
      aDeliveryContentResolver,
      aInlineEditService,
      aDocument,
      aLogSvc
    );
    // the renderer function
    const createRenderer = (ids$: Observable<string>) =>
      createReactRenderer(ids$, RendererComponent);
    // reference this function
    this.createRenderer = createRenderer;
  }
}
