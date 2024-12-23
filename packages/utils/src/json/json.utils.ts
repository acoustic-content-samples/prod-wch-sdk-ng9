/* Copyright IBM Corp. 2018 */
import { UnaryFunction } from 'rxjs';

import { unary } from './../js/js.utils';

export type JSONValue =
  | boolean
  | number
  | string
  | null
  | JSONArray
  | JSONObject;
export interface JSONObject {
  [x: string]: JSONValue;
}
export interface JSONArray extends Array<JSONValue> {}

const _jsonParse: <T>(aValue: string) => T = unary(JSON.parse);
const _jsonStringify: UnaryFunction<any, string> = unary(JSON.stringify);

export const jsonStringEscape = (aValue: string) => {
  const escaped = _jsonStringify(aValue);
  return escaped.substring(1, escaped.length - 1);
};

export { _jsonParse as jsonParse, _jsonStringify as jsonStringify };
