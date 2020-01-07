/* Copyright IBM Corp. 2017 */

function _assert<T>(
  aPredicate: (aValue: T) => boolean,
  aFailHandler: (aValue: T) => void
): (aValue: T) => void {
  return (aValue: T) => {
    if (!aPredicate(aValue)) {
      aFailHandler(aValue);
    }
  };
}

export { _assert as assertValue };
