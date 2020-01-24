/** Copyright IBM Corp. 2017 */
import { arrayPush } from "./../js/js.utils";

// shortcut to math functions
const { sqrt, abs, floor, random, PI } = Math;

// random number
const _MAX_INT = Number.MAX_SAFE_INTEGER;

const GOLDEN_RATIO = (1 + sqrt(5)) / 2;

/**
 * some magic number
 */
// tslint:disable-next-line:no-bitwise
const GOLDEN_RATIO_64 = floor((GOLDEN_RATIO - floor(GOLDEN_RATIO)) * _MAX_INT);

/** initial value for the hash code */
// tslint:disable-next-line:no-bitwise
const HASH_SEED_64 = floor((PI - floor(PI)) * _MAX_INT);

/**
 * Returns an initial value for the hash code
 *
 * @returns the initial value
 */
function _longHash() {
  return HASH_SEED_64;
}

function toUTF8(start: number, len: number, str: string): number[] {
  const utf8: number[] = [];
  for (let i = start; i < len; i++) {
    let charcode = str.charCodeAt(i);
    if (charcode < 0x80) {
      utf8.push(charcode);
    } else if (charcode < 0x800) {
      // tslint:disable-next-line:no-bitwise
      utf8.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f));
    } else if (charcode < 0xd800 || charcode >= 0xe000) {
      utf8.push(
        // tslint:disable-next-line:no-bitwise
        0xe0 | (charcode >> 12),
        // tslint:disable-next-line:no-bitwise
        0x80 | ((charcode >> 6) & 0x3f),
        // tslint:disable-next-line:no-bitwise
        0x80 | (charcode & 0x3f)
      );
    }
    // surrogate pair
    else {
      i++;
      // UTF-16 encodes 0x10000-0x10FFFF by
      // subtracting 0x10000 and splitting the
      // 20 bits of 0x0-0xFFFFF into two halves
      charcode =
        // tslint:disable-next-line:no-bitwise
        0x10000 + (((charcode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
      utf8.push(
        // tslint:disable-next-line:no-bitwise
        0xf0 | (charcode >> 18),
        // tslint:disable-next-line:no-bitwise
        0x80 | ((charcode >> 12) & 0x3f),
        // tslint:disable-next-line:no-bitwise
        0x80 | ((charcode >> 6) & 0x3f),
        // tslint:disable-next-line:no-bitwise
        0x80 | (charcode & 0x3f)
      );
    }
  }
  return utf8;
}

function _longCombine(oldHash: number, data: number): number {
  // tslint:disable-next-line:no-bitwise
  return oldHash ^ (data + GOLDEN_RATIO_64 + (oldHash << 6) + (oldHash >>> 2));
}

const CHUNK_SIZE = 6;

function _hashStringSegment(
  oldHash: number,
  start: number,
  len: number,
  s: string
): number {
  // new hash
  let newHash = oldHash;
  // convert to utf8 first
  const utf8 = toUTF8(start, len, s);
  // split into chunks of 6
  const l1 = utf8.length;
  const l2 = floor(l1 / CHUNK_SIZE);
  // iterate over the chunk
  let idx = 0;
  for (let i = 0; i < l2; ++i) {
    // construct the number
    let data = 0;
    for (let j = CHUNK_SIZE; j > 0; j--) {
      data = data * 256 + utf8[idx++];
    }
    // combine the hash
    newHash = _longCombine(newHash, data);
  }
  // fix the remaining data
  if (idx < l1) {
    let data = 0;
    while (idx < l1) {
      // tslint:disable-next-line:no-bitwise
      data = (data << 8) | utf8[idx++];
    }
    // combine the hash
    newHash = _longCombine(newHash, data);
  }
  // done
  return newHash;
}

function _hashString(oldHash: number, s: string): number {
  return _hashStringSegment(oldHash, 0, s.length, s);
}

// some character sets
const _START = "$_";
const _DIGITS = "0123456789";
const _LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const _UPPERCASE = _LOWERCASE.toUpperCase();

// valid first letters
const _FIRST_LETTERS = _START + _LOWERCASE + _UPPERCASE;
const _NEXT_LETTERS = _FIRST_LETTERS + _DIGITS;

// valid first letters for CSS
const _FIRST_CSS_LETTERS = _LOWERCASE;
const _NEXT_CSS_LETTERS = _FIRST_CSS_LETTERS + _DIGITS;

// valid letters for link names
const _SPECIAL_LINK = " _/";
const _FIRST_LETTERS_LINK = _UPPERCASE;
const _NEXT_LETTERS_LINK = _LOWERCASE + _UPPERCASE + _DIGITS + _SPECIAL_LINK;

/**
 * Converts a hash number into a javascript identifier
 *
 * @param aHash - the hash number
 * @returns a valid javascript identifier
 */
function _hashToName(aHash: number, aFirst: string, aNext: string): string {
  // length
  const lenFirst = aFirst.length;
  const lenNext = aNext.length;
  // make sure the number is positive
  let num = abs(floor(aHash));
  const res = [aFirst[num % lenFirst]];
  num = floor(num / lenFirst);
  // next
  while (num > 0) {
    arrayPush(aNext[num % lenNext], res);
    num = floor(num / lenNext);
  }
  // ok
  return res.join("");
}

/**
 * Converts a hash number into a javascript identifier
 *
 * @param aHash - the hash number
 * @returns a valid javascript identifier
 */
export const hashToIdentifier = (aHash: number): string =>
  _hashToName(aHash, _FIRST_LETTERS, _NEXT_LETTERS);

/**
 * Converts a hash number into a CSS class name
 *
 * @param aHash - the hash number
 * @returns a valid CSS class name
 */
export const hashToClassName = (aHash: number): string =>
  _hashToName(aHash, _FIRST_CSS_LETTERS, _NEXT_CSS_LETTERS);

/**
 * Converts a hash number into a javascript identifier
 *
 * @param aHash - the hash number
 * @returns a valid javascript identifier
 */
export const hashToLinkName = (aHash: number): string =>
  _hashToName(aHash, _FIRST_LETTERS_LINK, _NEXT_LETTERS_LINK);

const randomInt = () => floor(random() * _MAX_INT);

/**
 * Returns some random identifier
 *
 * @returns a random identifier
 */
export const hashRandomIdentifier = (): string => hashToIdentifier(randomInt());

/**
 * Returns some random identifier
 *
 * @returns a random identifier
 */
export const hashRandomLinkName = (): string => hashToLinkName(randomInt());

/**
 * Returns some random identifier
 *
 * @returns a random identifier
 */
export const hashRandomClassName = (): string => hashToClassName(randomInt());

export {
  _hashString as hashString,
  _hashStringSegment as hashStringSegment,
  _longHash as longHash
};
