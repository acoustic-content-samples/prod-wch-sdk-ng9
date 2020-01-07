import {
  arrayPush,
  jsonStringify,
  reduceArray
} from '@acoustic-content-sdk/utils';
import { createHmac } from 'crypto';
import { v4 } from 'uuid';

import { MODULE } from './../version';

const SECRET = MODULE;

const _HEX = '0123456789abcdef';

export function createRevision(aObj: any, aSecret: string = SECRET): string {
  // produce the revision ID
  return `0-${createGuid(jsonStringify(aObj), aSecret)}`;
}

/**
 * Constructs a GUID in a reproducible way from an ID
 *
 * @param aId  - the original ID
 * @param aSecret  - some optional secret
 *
 * @returns the guid
 */
export function createGuid(aId: string, aSecret: string = SECRET): string {
  // produce the revision ID
  return createGuidFromBuffer(
    createHmac('sha256', aSecret)
      .update(aId)
      .digest()
  );
}

/**
 * Constructs a GUID in a reproducible way from an ID
 *
 * @param aId  - the original ID
 * @param aSecret  - some optional secret
 *
 * @returns the guid
 */
export function createGuidFromBuffer(aBuffer: Buffer): string {
  // produce the revision ID
  const random: number[] = [];
  for (let i = 0; i < 16; ++i) {
    random[i] = aBuffer.readUInt8(i);
  }
  // convert to guid format
  return v4({ random });
}

/**
 * Converts a byte to a string
 *
 * @param aByte - the byte
 * @returns the string
 */
const reduceByte = (aBuffer: string[], aByte: number): string[] =>
  arrayPush(_HEX[aByte & 0x0f], arrayPush(_HEX[(aByte >>> 8) & 0x0f], aBuffer));

// some character sets
const _DIGITS = '0123456789';
const _LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const _UPPERCASE = _LOWERCASE.toUpperCase();

const TOKENS = _UPPERCASE + _LOWERCASE + _DIGITS;
const TOKENS_LEN = TOKENS.length;
const TOKEN_BITS = 8 / Math.log2(TOKENS_LEN);

/**
 * Converts a buffer to an identifier string
 *
 * @param aBuffer - the buffer
 * @returns the string
 */
export function bufferToIdentifier(aBuffer: Uint8Array): string {
  // total length
  const len = aBuffer.length;
  if (len <= 0) {
    return '';
  }
  // some helper constants
  const tokensLen = BigInt(TOKENS_LEN);
  const resLen = Math.floor(len * TOKEN_BITS);
  // convert to bigint
  let num = BigInt(reduceArray(aBuffer, reduceByte, ['0x']).join(''));
  const res: string[] = [];
  for (let i = resLen; i > 0; --i) {
    arrayPush(TOKENS[Number(num % tokensLen)], res);
    num /= tokensLen;
  }
  // ok
  return res.join('');
}
