export function isString(aValue: any): aValue is string {
  return typeof aValue === 'string';
}

export function isFunction(aValue: any): aValue is Function {
  return typeof aValue === 'function';
}

export const isArray = Array.isArray;
