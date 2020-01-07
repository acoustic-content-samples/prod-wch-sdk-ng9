import { assertFromGenerator, hashRandomIdentifier } from '@acoustic-content-sdk/utils';

const IDENTIFIERS: Record<string, string> = {};

export function getIdentifier(aValue: string): string {
  return assertFromGenerator(aValue, IDENTIFIERS, hashRandomIdentifier);
}

export function getIdentifierFrom(aValue: string, aSource: string): string {
  return getIdentifier(`${aValue} from ${aSource}`);
}
