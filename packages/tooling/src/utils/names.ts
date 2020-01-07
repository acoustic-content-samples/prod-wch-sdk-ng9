import {
  camelCase as lodashCamelCase,
  kebabCase as lodashKebabCase,
  lowerCase,
  startCase,
  upperCase
} from 'lodash';

const dotCase = (aValue: string): string =>
  lowerCase(aValue)
    .split(' ')
    .join('.');

const classCase = (aValue: string): string =>
  startCase(aValue)
    .split(' ')
    .join('');

const constantCase = (aValue: string): string =>
  upperCase(aValue)
    .split(' ')
    .join('_');

const kebabCase = (aValue: string): string => lodashKebabCase(aValue);

const camelCase = (aValue: string): string => lodashCamelCase(aValue);

export { constantCase, classCase, camelCase, kebabCase, dotCase };
