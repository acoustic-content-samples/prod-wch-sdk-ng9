import { Layout, LoggerService } from '@acoustic-content-sdk/api';
import {
  ComponentTypeRef,
  ComponentTypeRefResolver,
  WCH_TOKEN_LOGGER_SERVICE
} from '@acoustic-content-sdk/ng-api';
import {
  isEqual,
  isNotNil,
  LAYOUT_TYPE_HANDLEBARS,
  NOOP_LOGGER_SERVICE
} from '@acoustic-content-sdk/utils';
import { Inject, Injectable, Optional } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';

import { HandlebarsComponent } from './../../components/hbs-edit/hbs.component';

const LOGGER = 'HandlebarsComponentResolver';

const HBS_TYPE_REF: ComponentTypeRef<HandlebarsComponent> = {
  type: HandlebarsComponent
};

const isHandlebarsLayout = ({ templateType, template }: Layout) =>
  isEqual(templateType, LAYOUT_TYPE_HANDLEBARS) && isNotNil(template);

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
    @Inject(WCH_TOKEN_LOGGER_SERVICE)
    aLogSvc: LoggerService
  ) {
    // logger
    const logSvc = aLogSvc || NOOP_LOGGER_SERVICE;
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
