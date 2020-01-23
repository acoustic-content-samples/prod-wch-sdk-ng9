import { canonicalizeJson, serializeJson } from '@acoustic-content-sdk/tooling';

export function plural(aKey: string) {
  return aKey + 's';
}

export function toComment(aValue: any): string {
  return serializeJson(canonicalizeJson(aValue))
    .split('\n')
    .map((line) => '   * ' + line)
    .join('\n');
}

export function getExpression(aElement: any) {
  const type = aElement.allowMultipleValues
    ? plural(aElement.elementType)
    : aElement.elementType;
  return type + '.' + aElement.key;
}

export function getBaseName(aName: string): string {
  return aName.endsWith('[]') ? aName.substr(0, aName.length - 2) : aName;
}
