import { Generator } from '../generators/generator';
import { hashRandomIdentifier } from '../hash/hash.utils';
import { UNDEFINED_TYPE } from './js.utils';

const HAS_SYMBOL = typeof Symbol !== UNDEFINED_TYPE;

export const createSymbol: Generator<string | symbol> = HAS_SYMBOL
  ? Symbol
  : hashRandomIdentifier;
