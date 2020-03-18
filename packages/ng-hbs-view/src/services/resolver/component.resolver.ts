import { Layout, LoggerService } from '@acoustic-content-sdk/api';
import { isHandlebarsLayout } from '@acoustic-content-sdk/component-hbs';
import {
  ACOUSTIC_TOKEN_LOGGER_SERVICE,
  ComponentTypeRef,
  ComponentTypeRefResolver
} from '@acoustic-content-sdk/ng-api';
import { boxLoggerService } from '@acoustic-content-sdk/utils';
import { Inject, Injectable, Optional } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';

import { HandlebarsComponent } from './../../components/hbs-view/hbs.component';

const LOGGER = 'HandlebarsComponentResolver';

const HBS_TYPE_REF: ComponentTypeRef<HandlebarsComponent> = {
  type: HandlebarsComponent
};

/**
 * Implementation of a `ComponentTypeRefResolver` that will resolve to the
 * handlebars component if the layout is a handlebars layout.
 */
@Injectable()
export class HandlebarsComponentResolver implements ComponentTypeRefResolver {
  /**
   * Method to resolve a handlebars component to the generic rendering component
   */
  getTypeByLayout: (
    aLayout: Layout,
    aLayoutMode?: string
  ) => Observable<ComponentTypeRef<any>>;

  constructor(
    @Optional()
    @Inject(ACOUSTIC_TOKEN_LOGGER_SERVICE)
    aLogSvc: LoggerService
  ) {
    // logger
    const logSvc = boxLoggerService(aLogSvc);
    const logger = logSvc.get(LOGGER);

    const getTypeByLayout = (
      aLayout: Layout,
      aLayoutMode?: string
    ): Observable<ComponentTypeRef<any>> => {
      // log the layout
      const isHbsLayout = isHandlebarsLayout(aLayout);
      logger.info('Layout', aLayout, isHbsLayout);
      return isHbsLayout ? of(HBS_TYPE_REF) : EMPTY;
    };

    // attach
    this.getTypeByLayout = getTypeByLayout;
  }
}
