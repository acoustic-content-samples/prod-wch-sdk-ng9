import memoizeIntlConstructor from 'intl-format-cache';
import { IntlMessageFormat, Options } from 'intl-messageformat';
import { UnaryFunction } from 'rxjs';

declare type FormatInput = Parameters<IntlMessageFormat['format']>[0];
declare type FormatResult = ReturnType<IntlMessageFormat['format']>;
declare type FormatFunction = (aInput?: FormatInput) => FormatResult;

const { NumberFormat, DateTimeFormat, PluralRules } = Intl;

function memoize<T>(aCreator: () => T): () => T {
  let cached: T;
  return () => cached || (cached = aCreator());
}

// performance optimization
const OPTIONS: () => Options = memoize(() => ({
  formatters: {
    getNumberFormat: memoizeIntlConstructor(NumberFormat),
    getDateTimeFormat: memoizeIntlConstructor(DateTimeFormat),
    getPluralRules: memoizeIntlConstructor(PluralRules)
  }
}));

const genFormatMessage = (
  aLocale: string
): UnaryFunction<string, FormatFunction> | undefined => (aValue: string) => {
  if (aValue) {
    const cached = memoize(
      () => new IntlMessageFormat(aValue, aLocale, undefined, OPTIONS())
    );
    return (aData?: FormatInput) => cached().format(aData);
  }
};

export enum NLS_KEY {
  ONLY_ENGLISH,
  ONLY_GERMAN,
  PHOTOS
}
export enum NLS_LOCALE {
  DE,
  EN,
  FR
}

const createEn: () => FormatFunction[] = () =>
  [
    'Only in English',
    'ONLY_GERMAN',
    'On {takenDate, date, short} {name} took {numPhotos, plural,=0 {no photos.} =1 {one photo.} other {# photos.} }'
  ].map(genFormatMessage('en'));
const generateEn = memoize(createEn);

const createDe: () => FormatFunction[] = () =>
  Object.assign(
    [],
    generateEn(),
    [
      ,
      'Nur auf Deutsch',
      '{name} machte am {takenDate, date, short} {numPhotos, plural,=0 {kein Foto.} =1 {ein Foto.} other {# Fotos.} }'
    ].map(genFormatMessage('de'))
  );
const generateDe = memoize(createDe);

const createFr: () => FormatFunction[] = () =>
  Object.assign(
    [],
    generateEn(),
    [
      ,
      ,
      '{name} a pris {numPhotos, plural,=0 {pas de foto.} =1 {un foto.} other {# fotos.} } le {takenDate, date, short}'
    ].map(genFormatMessage('fr'))
  );
const generateFr = memoize(createFr);
const NLS_MAP: Record<NLS_LOCALE | string, () => FormatFunction[]> = {
  0: generateDe,
  1: generateEn,
  2: generateFr,
  de: generateDe,
  fr: generateFr,
  en: generateEn
};
export const NLS: UnaryFunction<NLS_LOCALE | string, FormatFunction[]> = (
  aKey
) => (NLS_MAP[aKey] || generateEn)();
export const TRANSLATE: UnaryFunction<
  NLS_LOCALE | string,
  (aKey: NLS_KEY, aInput?: FormatInput) => FormatResult
> = (aLocale: NLS_LOCALE | string) => {
  const nls = NLS(aLocale);
  return (aKey: NLS_KEY, aInput?: FormatInput) => nls[aKey](aInput);
};
