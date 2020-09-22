import { Logger, LoggerService } from '@acoustic-content-sdk/api';
import { ACOUSTIC_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import {
  boxLoggerService,
  createSingleSubject,
  forIn,
  isEqual,
  isNotNil,
  opDistinctUntilChanged,
  reduceForIn,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { DOCUMENT } from '@angular/common';
import {
  Directive,
  Inject,
  OnDestroy,
  Optional,
  Renderer2,
  RendererStyleFlags2
} from '@angular/core';
import { Observable } from 'rxjs';
import { reduce, takeUntil } from 'rxjs/operators';

import { ACOUSTIC_TOKEN_THEME_STYLES, Styles } from './theme.styles';

const LOGGER = 'ThemeStylesDirective';

/**
 * Reducer for styles, it will set new styles if they have changed and remove deprecated
 * styles
 *
 * @param aOldStyles - the old styles, this will be used as the reference
 * @param aNewStyles - the set of new styles
 * @param aItem - item to set the styles on
 * @param aRenderer - renderer to modify
 * @param aLogger - the logger
 *
 * @returns the new styles
 */
function reduceStyles(
  aOldStyles: Styles,
  aNewStyles: Styles,
  aItem: any,
  aRenderer: Renderer2,
  aLogger: Logger
): Styles {
  // just a quick sanity check
  if (isNotNil(aItem)) {
    const updatedStyles = [];
    // work on the styles
    const remaining = reduceForIn(
      aNewStyles,
      (aOld: Styles, aValue: any, aKey: string) => {
        // check the old value
        const oldValue = aOld[aKey];
        delete aOld[aKey];
        // sanity check
        if (!isEqual(oldValue, aValue)) {
          // log this
          aLogger.info('setting style', aKey, aValue);
          // set the style
          //          aRenderer.setStyle(aItem, aKey, aValue, RendererStyleFlags2.DashCase);
          updatedStyles.push(aKey + ':' + aValue + '; ');
        }
        // returns the updated copy
        return aOld;
      },
      { ...aOldStyles }
    );
    aRenderer.setAttribute(aItem, 'style', updatedStyles.reduce((allStyles, aStyle) => {
      allStyles += aStyle;
      return allStyles;
    }, aItem.getAttribute('style') || ''));
    //TODO - the initial value for the reduce here is starting with all current styles on body
    // (from getAttribute call), then adding new/updated styles, but not removing old styles
    // remove extra styles
    forIn(remaining, (aValue: any, aKey: string) => {
      // log this
      aLogger.info('removing style', aKey);
      // remove the style
      aRenderer.removeStyle(aItem, aKey, RendererStyleFlags2.DashCase);
    });
  } else {
    // warn
    aLogger.warn('Body element not found ...');
  }
  // return the new styles
  return aNewStyles;
}

@Directive({ selector: '[themeStyles]' })
export class ThemeStylesDirective implements OnDestroy {
  // lifecycle hook
  private readonly done$ = createSingleSubject();

  constructor(
    @Inject(ACOUSTIC_TOKEN_THEME_STYLES) aThemeStyles$: Observable<Styles>,
    @Inject(DOCUMENT) aDocument: any,
    aRenderer: Renderer2,
    @Optional()
    @Inject(ACOUSTIC_TOKEN_LOGGER_SERVICE)
    aLoggerService?: LoggerService
  ) {
    // logging
    const logSvc = boxLoggerService(aLoggerService);
    const logger = logSvc.get(LOGGER);
    // handle the styles
    rxPipe(
      aThemeStyles$,
      opDistinctUntilChanged,
      reduce(
        (aOld: Styles, aNew: Styles) =>
          reduceStyles(aOld, aNew, aDocument.body, aRenderer, logger),
        {}
      ),
      takeUntil(this.done$)
    ).subscribe();
  }

  ngOnDestroy() {
    this.done$.next();
  }
}
