import { Layout, LoggerService } from '@acoustic-content-sdk/api';
import { HBS_COMPONENT_RESOLVER_WEIGHT } from '@acoustic-content-sdk/component-hbs';
import {
  ACOUSTIC_TOKEN_LOGGER_SERVICE,
  ComponentTypeRef,
  ComponentTypeRefResolver
} from '@acoustic-content-sdk/ng-api';
import {
  boxLoggerService,
  isAbsoluteURL,
  reduceArray
} from '@acoustic-content-sdk/utils';
import { Inject, Injectable, Optional } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';

import { WebComponent } from '../../components/web-view/web.component';

const LOGGER = 'WebComponentsComponentResolver';

const WEB_TYPE_REF: ComponentTypeRef<WebComponent> = {
  type: WebComponent
};

const BUNDLE_PREFIX = 'bundle:';

/**
 * Tests if we have a bundle tag
 *
 * @param aTag - the tag to check
 * @returns true if this is a bundle index, else false
 */
function isBundleTag(aTag: string): boolean {
  const leftIdx = aTag.indexOf(BUNDLE_PREFIX);
  const rightIdx = aTag.indexOf('#', leftIdx + BUNDLE_PREFIX.length);
  // check the URL
  return (
    leftIdx >= 0 &&
    rightIdx >= 0 &&
    isAbsoluteURL(aTag.substring(leftIdx + BUNDLE_PREFIX.length, rightIdx))
  );
}

/**
 * Tests if the tags contain a bundle reference
 *
 * @param aTags - the tags to check
 * @returns true if we have a bundle reference, else false
 */
function hasBundleTag(aTags?: string[]): boolean {
  return reduceArray(
    aTags,
    (aResult: boolean, aTag: string) => aResult || isBundleTag(aTag),
    false
  );
}

function isWebComponentLayout(aLayout: Layout): boolean {
  return hasBundleTag(aLayout.tags);
}

const WC_COMPONENT_RESOLVER_WEIGHT = HBS_COMPONENT_RESOLVER_WEIGHT - 1;

/**
 * Implementation of a `ComponentTypeRefResolver` that will resolve to the
 * web component if the layout is a web component layout.
 */
@Injectable()
export class WebComponentResolver implements ComponentTypeRefResolver {
  /**
   * Make sure this resolver resolves earlier than the handlebars resolver
   */
  readonly weight = WC_COMPONENT_RESOLVER_WEIGHT;
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
      const isLayout = isWebComponentLayout(aLayout);
      logger.info('Layout', aLayout, isLayout);
      return isLayout ? of(WEB_TYPE_REF) : EMPTY;
    };

    // attach
    this.getTypeByLayout = getTypeByLayout;
  }
}
