import { OptionSelection } from '@acoustic-content-sdk/api';
import { isNotNil, isNumber, isString, reduceArray } from '@acoustic-content-sdk/utils';

import {
  AlignmentOptionsType,
  KEY_ALIGNMENT_OPTIONS
} from '../elements/alignment-options/alignmentOptionsType';
import {
  BoundaryOptionsType,
  KEY_BOTTOM,
  KEY_LEFT,
  KEY_RIGHT,
  KEY_TOP
} from '../elements/boundary-options/boundaryOptionsType';
import { ColorsType, KEY_COLOR_CODE } from '../elements/colors/colorsType';
import {
  FontOptions,
  KEY_FONTS,
  FontOptionsType
} from '../elements/font-options/fontOptionsType';
import { KEY_TEXT_STYLE, KEY_BACKGROUND, KEY_ALIGNMENT, KEY_LINE_HEIGHT } from '../elements/text/textType';
import { KEY_SIZE, KEY_COLOR, KEY_FONT, StylingType } from '../elements/styling/stylingType';
import { BackgroundExtensionType, KEY_BACKGROUND_COLOR, KEY_IMAGE } from '../elements/background-extension/backgroundExtensionType';
import { KEY_SOCIAL_ICONS } from '../elements/social-follow/socialFollowType';
import { LineHeightOptionsType, KEY_LINE_HEIGHT_OPTIONS } from '../elements/line-height-options/lineHeightOptionsType';

export type Styles = Record<string, string>;

const EMPTY_STYLES = {};

const BOUNDARY_KEYS = [KEY_TOP, KEY_BOTTOM, KEY_LEFT, KEY_RIGHT];

const KEY_PADDING = 'padding';
const KEY_MARGIN = 'margin';
const KEY_WIDTH = 'width';
const KEY_HEIGHT = 'height';
//const KEY_BACKGROUND_COLOR = 'backgroundColor';

function getCssDimension(aValue: number): string {
  return aValue > 0 ? `${aValue}px` : `${aValue}`;
}

/**
 * Converts the boundary options object into a CSS style map
 *
 * @param aPrefix - the prefix
 * @param aOptions - the options object
 *
 * @returns the styles map
 */
function getFromBoundaryOptions(
  aPrefix: 'padding' | 'margin',
  aOptions?: BoundaryOptionsType
): Styles {
  // result
  const result: Styles = {};
  // dispatch
  return isNotNil(aOptions)
    ? reduceArray(
        BOUNDARY_KEYS,
        (aDst, aKey) => {
          // check for existence of the key
          const value = aOptions[aKey];
          if (isNumber(value)) {
            // add
            const key = `${aPrefix}-${aKey}`;
            const cssValue = getCssDimension(value);
            // insert
            aDst[key] = cssValue;
          }
          // the result
          return aDst;
        },
        result
      )
    : result;
}

function getPaddingFromBoundaryOptions(aOptions?: BoundaryOptionsType): Styles {
  return getFromBoundaryOptions(KEY_PADDING, aOptions);
}

//function getSpacing(aSpacing: Space)

function getMarginFromBoundaryOptions(aOptions?: BoundaryOptionsType): Styles {
  return getFromBoundaryOptions(KEY_MARGIN, aOptions);
}

function getFont(aFont?: string | FontOptionsType): Styles {
  return isString(aFont)
    ? { 'font-family': aFont }
    : isNotNil(aFont)
    ? getFont(aFont[KEY_FONTS].selection)
    : EMPTY_STYLES;
}

function getTextStyle(aTextStyle?: StylingType): Styles {
  return isNotNil(aTextStyle) ? {
    'font-family': aTextStyle[KEY_FONT],
    'color': aTextStyle[KEY_COLOR],
    'font-size': getCssDimension(aTextStyle[KEY_SIZE])
  } : EMPTY_STYLES;
}

function getLineHeight(aLineHeight?: LineHeightOptionsType) {
  return isNotNil(aLineHeight) &&  isNotNil(aLineHeight[KEY_LINE_HEIGHT_OPTIONS]) ? {
    'line-height': aLineHeight[KEY_LINE_HEIGHT_OPTIONS].selection
  } : EMPTY_STYLES;
}

function getBackgroundStyle(aBackgroundStyle?: BackgroundExtensionType): Styles {
  // TODO: Missing background styles
  const result = {};
  if (isNotNil(aBackgroundStyle) ) {
    if (isNotNil(aBackgroundStyle[KEY_BACKGROUND_COLOR]) && isNotNil(aBackgroundStyle[KEY_BACKGROUND_COLOR][KEY_COLOR_CODE])) {
      result['background-color'] =  aBackgroundStyle[KEY_BACKGROUND_COLOR][KEY_COLOR_CODE];
    }
    if (isNotNil(aBackgroundStyle[KEY_IMAGE]) && isNotNil(aBackgroundStyle[KEY_IMAGE].url)) {
      result['background-image'] = aBackgroundStyle[KEY_IMAGE].url;
    }
  }
  return result;
}

function getBackgroundColor(aColor?: string | ColorsType): Styles {
  return isString(aColor)
    ? { 'background-color': aColor }
    : isNotNil(aColor)
    ? getBackgroundColor(aColor[KEY_COLOR_CODE])
    : EMPTY_STYLES;
}

function addKey(aKey: string, aElement: any, aDst: Styles) {
  const value = aElement[aKey];
  if (isNumber(value)) {
    aDst[aKey] = getCssDimension(value);
  }
}

function getWidthAndHeight(aElement?: {
  [KEY_WIDTH]?: number;
  [KEY_HEIGHT]?: number;
}): Styles {
  const result: Styles = {};
  addKey(KEY_WIDTH, aElement, result);
  addKey(KEY_HEIGHT, aElement, result);
  // ok
  return result;
}

function iconSizeToWidthAndHeight(aSize?: number) {
  return isNotNil(aSize)
    ? {width: getCssDimension(aSize), height: getCssDimension(aSize)}
    : EMPTY_STYLES;
}

function getAlignStylesFromSelection(aSel?: string): Styles {
  if (!isString(aSel)) {
    return EMPTY_STYLES;
  }
  return { 'text-align': aSel };
}

function getAlignStylesFromOptions(aOptions?: OptionSelection): Styles {
  return isNotNil(aOptions)
    ? getAlignStylesFromSelection(aOptions.selection)
    : EMPTY_STYLES;
}

export function getAlignStyles(aAlignment?: AlignmentOptionsType): Styles {
  return isNotNil(aAlignment)
    ? getAlignStylesFromOptions(aAlignment[KEY_ALIGNMENT_OPTIONS])
    : EMPTY_STYLES;
}

export function getAlign(anAlignment?: AlignmentOptionsType): string {
  return isNotNil(anAlignment) && isNotNil(anAlignment[KEY_ALIGNMENT_OPTIONS]) ?
  anAlignment[KEY_ALIGNMENT_OPTIONS].selection : '';
}

/**
 * Returns the styles that define the boundary from an element that carries paddings and margins
 *
 * @param aElement - the element that carries the information
 * @returns the styles
 */
export function getStyles(aElement?: {
  [KEY_PADDING]?: BoundaryOptionsType;
  [KEY_MARGIN]?: BoundaryOptionsType;
  [KEY_ALIGNMENT]?: AlignmentOptionsType;
  [KEY_TEXT_STYLE]?: StylingType;
  [KEY_LINE_HEIGHT]?: LineHeightOptionsType;
  [KEY_BACKGROUND]?: BackgroundExtensionType;
  [KEY_WIDTH]?: number;
  [KEY_HEIGHT]?: number;
  [KEY_SIZE]?: number;
  [KEY_BACKGROUND_COLOR]?: string | ColorsType;
}): Styles {
  return isNotNil(aElement)
    ? {
        ...getPaddingFromBoundaryOptions(aElement[KEY_PADDING]),
        ...getMarginFromBoundaryOptions(aElement[KEY_MARGIN]),
        ...getAlignStyles(aElement[KEY_ALIGNMENT]),
        ...getTextStyle(aElement[KEY_TEXT_STYLE]),
        ...getLineHeight(aElement[KEY_LINE_HEIGHT]),
        ...getBackgroundStyle(aElement[KEY_BACKGROUND]),
        ...getWidthAndHeight(aElement),
        ...iconSizeToWidthAndHeight(aElement[KEY_SIZE]),
        ...getBackgroundColor(aElement[KEY_BACKGROUND_COLOR])
      }
    : EMPTY_STYLES;
}
