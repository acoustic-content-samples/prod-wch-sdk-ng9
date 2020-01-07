import { EqualsPredicate, isEqual } from '@acoustic-content-sdk/utils';

/**
 * Computes the levensthein matrix as defined here http://www.levenshtein.net/
 *
 * @param src   source sequence
 * @param tgt   target sequence
 * @param eq    equals predicate for the entries
 *
 * @returns the distance matrix
 */
export function levenshteinMatrix<T>(
  src: ArrayLike<T>,
  tgt: ArrayLike<T>,
  eq: EqualsPredicate<T> = isEqual
): number[][] {
  const srcLength = src.length;
  const tgtLength = tgt.length;

  const mat: number[][] = [[]];

  let prev = mat[0];
  for (let c = 0; c < tgtLength + 1; c++) {
    prev[c] = c;
  }

  for (let i = 1; i <= srcLength; i++) {
    const row = (mat[i] = [i]);
    for (let j = 1; j <= tgtLength; j++) {
      row[j] = Math.min(
        prev[j] + 1,
        row[j - 1] + 1,
        prev[j - 1] + (eq(src[i - 1], tgt[j - 1]) ? 0 : 1)
      );
    }
    prev = row;
  }

  return mat;
}