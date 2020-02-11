import { WchSdkVersion } from '@acoustic-content-sdk/api';

import { deepEquals } from '../js/js.utils';
import { EqualsPredicate, isEqual, isNotNil } from '../predicates/predicates';

/**
 * Tests if two versions are equal
 *
 * @param aLeft   - left version
 * @param aRight  - right version
 *
 * @returns true if the versions are equal
 */
export const isEqualVersion: EqualsPredicate<WchSdkVersion> = (
  aLeft: WchSdkVersion,
  aRight: WchSdkVersion
) =>
  isEqual(aLeft, aRight) ||
  (isNotNil(aLeft) &&
    isNotNil(aRight) &&
    deepEquals(aLeft.version, aRight.version));
