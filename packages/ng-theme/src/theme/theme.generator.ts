import { DeliveryContentItem } from '@acoustic-content-sdk/api';
import {
  isEqual,
  isNotEmpty,
  isNotNil,
  isNumber,
  isPlainObject,
  isString,
  kebabCase,
  reduceForIn
} from '@acoustic-content-sdk/utils';
import { UnaryFunction } from 'rxjs';

import { Styles } from './theme.styles';

// ignore hidden keys
const isValidKey = (aKey: string) =>
  !aKey.startsWith('$') && !isEqual(aKey, 'key');

function reduceStyles(
  aConverter: UnaryFunction<string, number[]>,
  aPrefix: string,
  aDst: Styles,
  aValue: any,
  aKey: string
): Styles {
  // sanity check on the key
  if (isValidKey(aKey) && isNotNil(aValue)) {
    // full style name
    const fullName = `${aPrefix} ${aKey}`;
    // test the value
    if (isString(aValue) || isNumber(aValue)) {
      // make it a nice key
      const key = `--${kebabCase(fullName)}`;
      // string case
      if (isString(aValue) && isNotEmpty(aValue)) {
        // assume a color for now
        const [h, s, l, a] = aConverter(aValue);
        // set the decomposed keys
        aDst[`${key}-h`] = h;
        aDst[`${key}-s`] = `${s}%`;
        aDst[`${key}-l`] = `${l}%`;
        aDst[`${key}-a`] = a;
      }
      // attach the value
      aDst[key] = aValue;
    }
    // recurse
    if (isPlainObject(aValue)) {
      // recurse
      reduceForIn(
        aValue,
        (aDst, aValue, aKey) =>
          reduceStyles(aConverter, fullName, aDst, aValue, aKey),
        aDst
      );
    }
  }
  // ok
  return aDst;
}

/**
 * Generate some generic styling
 *
 * @param aTheme the theme item
 * @param aConverter the converter from color value to HSL
 *
 * @returns the decoded styles
 */
export function createStylesFromTheme(
  aTheme: DeliveryContentItem,
  aConverter: UnaryFunction<string, number[]>
): Styles {
  // prefix using the type
  const {
    $metadata: { type = '' }
  } = aTheme;
  // iterate
  return reduceForIn(
    aTheme,
    (aDst, aValue, aKey) => reduceStyles(aConverter, type, aDst, aValue, aKey),
    {}
  );
}
