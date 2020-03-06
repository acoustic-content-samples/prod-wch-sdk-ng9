import { KEY_ID, KEY_METADATA, LoggerService } from '@acoustic-content-sdk/api';
import {
  DeliveryContentResolver,
  DeliverySiteResolver
} from '@acoustic-content-sdk/component-api';
import {
  boxLoggerService,
  createLruCache,
  filterTypeOf,
  isNotNil,
  opDeepDistinctUntilChanged,
  rxNext,
  rxPipe,
  rxSelectPath
} from '@acoustic-content-sdk/utils';
import { MonoTypeOperatorFunction, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { colorToHSL } from './hsl';
import { isSiteType, KEY_SITE_STYLES } from './site.type';
import { createStylesFromTheme } from './theme.generator';
import { Styles } from './theme.styles';

const LOGGER = 'ThemeService';

/**
 * Select the theme ID from the site item
 */
const THEME_ID_PATH = [KEY_SITE_STYLES, KEY_METADATA, KEY_ID];

const DEFAULT_ID: string = undefined;

const DEFAULT_STYLES: Styles = {};
const DEFAULT_STYLES$ = of(DEFAULT_STYLES);

/**
 * Service to create the theme contributions from
 * the current site.
 */
export function createThemeStyles(
  aSiteResolver: DeliverySiteResolver,
  aContentResolver: DeliveryContentResolver,
  aDocument?: Document,
  aLogSvc?: LoggerService
): Observable<Styles> {
  // logger
  const logSvc = boxLoggerService(aLogSvc);
  const logger = logSvc.get(LOGGER);
  // logging
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);
  // colorspace conversion
  const converter = colorToHSL(aDocument, aLogSvc);
  const cache = createLruCache<number[]>();
  // the cached function
  const toHsl = (aValue: string) => cache(aValue, converter);
  // the site
  const site$ = rxPipe(
    aSiteResolver.getSiteDeliveryContentItem(),
    filterTypeOf(isSiteType),
    log('site')
  );
  // extract the theme id
  const themeId$ = rxPipe(
    site$,
    rxSelectPath(THEME_ID_PATH, DEFAULT_ID),
    log('themeId')
  );
  // construct the styles from the theme ID
  const fromThemeId = (aId: string) =>
    rxPipe(
      aContentResolver.getDeliveryContentItem(aId),
      map((theme) =>
        isNotNil(theme) ? createStylesFromTheme(theme, toHsl) : DEFAULT_STYLES
      )
    );
  // the styles
  return rxPipe(
    themeId$,
    switchMap((themeId) =>
      isNotNil(themeId) ? fromThemeId(themeId) : DEFAULT_STYLES$
    ),
    opDeepDistinctUntilChanged,
    log('styles')
  );
}
