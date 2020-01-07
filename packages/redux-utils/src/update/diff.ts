import { Logger } from '@acoustic-content-sdk/api';
import {
  isArray,
  isEqual,
  isPlainObject,
  jsonStringify,
  objectKeys,
  partialLeft,
  isNotNil
} from '@acoustic-content-sdk/utils';
import { MonoTypeOperatorFunction, UnaryFunction } from 'rxjs';
import { scan } from 'rxjs/operators';

import { levenshteinMatrix } from './levenshtein';

const PADDING = 2;

const red = (aValue: string) => `\x1b[31m${aValue}`;
const green = (aValue: string) => `\x1b[32m${aValue}`;
const blue = (aValue: string) => `\x1b[34m${aValue}`;

/**
 * Serializes an existing object
 *
 * @param aPadding - padding string
 * @param aObj - object
 * @param aStyle - style callback
 *
 * @returns the serialized segments
 */
const doSerialize = (
  aFirstLine: string,
  aPadding: string,
  aObj: any,
  aStyle: UnaryFunction<string, string>
) => {
  const lines = JSON.stringify(aObj, undefined, PADDING).split('\n');
  const len = lines.length;
  for (let i = 0; i < len; ++i) {
    // prefix
    const prefix = i === 0 ? aFirstLine : '';
    const suffix = i === len - 1 ? ',' : '';

    lines[i] = aStyle(`${aPadding}${prefix}${lines[i]}${suffix}`);
  }
  return lines;
};

function appendComma(aSegments: string[]): string[] {
  const seg = [...aSegments];
  seg[seg.length - 1] = `${seg[seg.length - 1]},`;
  return seg;
}

function doBacktrace(
  aPadding: string,
  D: number[][],
  aOld: any[],
  aNew: any[],
  aSameStyle: UnaryFunction<string, string>,
  aNewStyle: UnaryFunction<string, string>,
  aDeletedStyle: UnaryFunction<string, string>
): string[] {
  function backtrace(i: number, j: number): string[] {
    if (i > 0 && j > 0 && D[i - 1][j - 1] + 1 === D[i][j]) {
      // replacement
      return [
        ...backtrace(i - 1, j - 1),
        ...appendComma(
          doSerializeDiff(
            '',
            aPadding,
            aOld[i - 1],
            aNew[j - 1],
            aSameStyle,
            aNewStyle,
            aDeletedStyle
          )
        )
      ];
    }
    if (i > 0 && D[i - 1][j] + 1 === D[i][j]) {
      // deletion
      return [
        ...backtrace(i - 1, j),
        ...doSerialize('', aPadding, aOld[i - 1], aDeletedStyle)
      ];
    }

    if (j > 0 && D[i][j - 1] + 1 === D[i][j]) {
      /// insert
      return [
        ...backtrace(i, j - 1),
        ...doSerialize('', aPadding, aNew[j - 1], aNewStyle)
      ];
    }

    if (i > 0 && j > 0 && D[i - 1][j - 1] === D[i][j]) {
      // equal
      return [
        ...backtrace(i - 1, j - 1),
        ...doSerialize('', aPadding, aOld[i - 1], aSameStyle)
      ];
    }

    return [];
  }
  return backtrace(aOld.length, aNew.length);
}

const stringCompare = (aLeft: string, aRight: string) =>
  aLeft.localeCompare(aRight);

function doSerializeDiff(
  aFirstLine: string,
  aPadding: string,
  aOld: any,
  aNew: any,
  aSameStyle: UnaryFunction<string, string>,
  aNewStyle: UnaryFunction<string, string>,
  aDeletedStyle: UnaryFunction<string, string>
): string[] {
  // serialization
  const diff: string[] = [];
  // check for the top level styles
  if (isEqual(aOld, aNew)) {
    // all entries are equal
    diff.push(...doSerialize(aFirstLine, aPadding, aOld, aSameStyle));
  } else if (isPlainObject(aOld)) {
    // cross check
    if (isPlainObject(aNew)) {
      // the object is different
      diff.push(aNewStyle(`${aPadding}${aFirstLine}{`));
      // new padding
      const padding = `${aPadding}  `;
      // iterate over the keys
      const oldKeys = objectKeys(aOld).sort(stringCompare);
      const newKeys = objectKeys(aNew).sort(stringCompare);
      let i = 0;
      let j = 0;
      while (i < oldKeys.length && j < newKeys.length) {
        // access the keys
        const oldKey = oldKeys[i];
        const newKey = newKeys[j];
        // test the keys
        const cmp = stringCompare(oldKey, newKey);
        if (cmp === 0) {
          diff.push(
            ...doSerializeDiff(
              `${jsonStringify(oldKey)}: `,
              padding,
              aOld[oldKey],
              aNew[newKey],
              aSameStyle,
              aNewStyle,
              aDeletedStyle
            )
          );
          // forward both
          i++;
          j++;
        } else if (cmp < 0) {
          // key got deleted
          diff.push(
            ...doSerialize(
              `${jsonStringify(oldKey)}: `,
              padding,
              aOld[oldKey],
              aDeletedStyle
            )
          );
          // forward left
          i++;
        } else {
          // key got added
          diff.push(
            ...doSerialize(
              `${jsonStringify(newKey)}: `,
              padding,
              aNew[newKey],
              aNewStyle
            )
          );
          // forward right
          j++;
        }
      }
      // show remaining deleted keys
      while (i < oldKeys.length) {
        // key
        const key = oldKeys[i];
        // key got deleted
        diff.push(
          ...doSerialize(
            `${jsonStringify(key)}: `,
            padding,
            aOld[key],
            aDeletedStyle
          )
        );
        // forward left
        i++;
      }
      // show remaining new keys
      while (j < newKeys.length) {
        // key
        const key = newKeys[j];
        // key got deleted
        diff.push(
          ...doSerialize(
            `${jsonStringify(key)}: `,
            padding,
            aNew[key],
            aNewStyle
          )
        );
        // forward left
        j++;
      }
      // end marker
      diff.push(aNewStyle(`${aPadding}}`));
    } else {
      // all entries are new
      diff.push(...doSerialize(aFirstLine, aPadding, aNew, aNewStyle));
      // all previous entries have been removed
      diff.push(...doSerialize(aFirstLine, aPadding, aOld, aDeletedStyle));
    }
  } else if (isArray(aOld)) {
    // cross check
    if (isArray(aNew)) {
      // the array is different
      diff.push(aNewStyle(`${aPadding}${aFirstLine}[`));
      // new padding
      const padding = `${aPadding}  `;
      // compute the levenshtein matrix for the entries
      const mat = levenshteinMatrix(aOld, aNew);
      // go
      diff.push(
        ...doBacktrace(
          padding,
          mat,
          aOld,
          aNew,
          aSameStyle,
          aNewStyle,
          aDeletedStyle
        )
      );
      // end marker
      diff.push(aNewStyle(`${aPadding}]`));
    } else {
      // all entries are new
      diff.push(...doSerialize(aFirstLine, aPadding, aNew, aNewStyle));
      // all previous entries have been removed
      diff.push(...doSerialize(aFirstLine, aPadding, aOld, aDeletedStyle));
    }
  } else {
    // all entries are new
    diff.push(...doSerialize(aFirstLine, aPadding, aNew, aNewStyle));
    // all previous entries have been removed
    diff.push(...doSerialize(aFirstLine, aPadding, aOld, aDeletedStyle));
  }
  // ok
  return diff;
}

/**
 * Serializes the differences between two JSON objects
 *
 * @param aOld - old object
 * @param aNew - new objects
 * @param aSameStyle - styling callback for identical style
 * @param aNewStyle - styling callback for new style
 * @param aDeletedStyle - styling callback for deleted style
 *
 * @returns the serialized string
 */
export function serializeDiff(
  aOld: any,
  aNew: any,
  aSameStyle: UnaryFunction<string, string> = green,
  aNewStyle: UnaryFunction<string, string> = blue,
  aDeletedStyle: UnaryFunction<string, string> = red
): string {
  // dispatch
  return doSerializeDiff(
    '',
    '',
    aOld,
    aNew,
    aSameStyle,
    aNewStyle,
    aDeletedStyle
  ).join('\n');
}

function reduceLog<T>(aLogger: Logger, aOldValue: T, aNewValue: T): T {
  // serialize differences
  if (
    isNotNil(aOldValue) &&
    isNotNil(aNewValue) &&
    !isEqual(aOldValue, aNewValue)
  ) {
    const diff = serializeDiff(aOldValue, aNewValue);
    aLogger.info(diff);
  }
  // return the new value
  return aNewValue;
}

export function rxLogDiff<T>(aLogger: Logger): MonoTypeOperatorFunction<T> {
  // just bind the logger
  const reducer = partialLeft<Logger, T, T, T>(reduceLog, aLogger);
  // returns the operator the shows the differences
  return scan<T>(reducer);
}
