import { Locale, LoggerService } from '@acoustic-content-sdk/api';
import { canonicalizeLocale } from '@acoustic-content-sdk/i18n';
import {
  camelCase,
  constantCase,
  createFileDescriptor,
  ensureDirPath,
  FileDescriptor,
  ReadDirectory,
  ReadDirectoryEntry
} from '@acoustic-content-sdk/tooling';
import {
  boxLoggerService,
  forEach,
  forIn,
  isNotNil,
  jsonParse,
  jsonStringify,
  objectAssign,
  objectKeys,
  reduceForIn,
  rxNext,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { parse } from 'path';
import { MonoTypeOperatorFunction } from 'rxjs';
import { map, reduce } from 'rxjs/operators';

import { Schema } from './schema';

const LOGGER = 'generate.messages';

function isValidLocaleFile(aEntry: ReadDirectoryEntry): boolean {
  return aEntry.isDirectory || aEntry.path.endsWith('.json');
}

/**
 * Extracts all object keys from the data
 *
 * @param aData  - the full data set
 *
 * @returns list of locales
 */
const extractAllKeys = (
  aData: Record<Locale, Record<string, string>>
): Record<string, string> =>
  reduceForIn(
    aData,
    (aDst: Record<string, string>, aValues: Record<string, string>) =>
      reduceForIn(
        aValues,
        (aTgt: Record<string, string>, aValue: string, aKey: string) =>
          objectAssign(aKey, constantCase(aKey), aTgt),
        aDst
      ),
    {}
  );

const extractAllLocales = (
  aData: Record<Locale, Record<string, string>>
): Record<string, string> =>
  reduceForIn(
    aData,
    (aDst: Record<string, string>, aValue: any, aLocale: Locale) =>
      objectAssign(aLocale, constantCase(aLocale), aDst),
    {}
  );

function keyEnum(aOrder: string[], aKeys: Record<string, string>): string[] {
  const dst: string[] = [];
  dst.push('export enum NLS_KEY {');
  // export the constants
  forEach(aOrder, (aKey: string) => dst.push(`${aKeys[aKey]}, `));
  dst.push('};');
  return dst;
}

function localeEnum(
  aOrder: string[],
  aLocales: Record<string, string>
): string[] {
  const dst: string[] = [];
  dst.push('export enum NLS_LOCALE {');
  // export the constants
  forEach(aOrder, (aKey: string) => dst.push(`${aLocales[aKey]}, `));
  dst.push('};');
  return dst;
}

function getCreatorName(aLocale: Locale): string {
  return camelCase(`create ${canonicalizeLocale(aLocale)}`);
}

function getGeneratorName(aLocale: Locale): string {
  return camelCase(`generate ${canonicalizeLocale(aLocale)}`);
}

export function generateMessages(options: Schema) {
  // data directory
  const { dir } = options;

  const defaultLocale: Locale = options.default || 'en';

  function parseString(aValue: string, aLocale: string) {}

  /**
   * Rewrite the translations for a locale
   *
   * @param aFile - the descriptor
   * @returns the locale
   */
  function reduceLocaleFile(
    aDst: Record<Locale, Record<string, string>>,
    aFile: FileDescriptor<Buffer>
  ): Record<Locale, Record<string, string>> {
    // deconstruct
    const [fileName, buffer] = aFile;
    // parse
    const data = jsonParse<Record<string, string>>(buffer.toString());
    // parse the name, this the the locale
    const { name } = parse(fileName);
    const locale: Locale = canonicalizeLocale(name);
    // registers this file
    return objectAssign(locale, data, aDst);
  }

  /**
   * Rewrite the translations for a locale
   *
   * @param aFile - the descriptor
   * @returns the locale
   */
  function createDefaultLocale(
    aLocale: Locale,
    aValues: Record<string, string>,
    aKeys: string[]
  ) {
    // generate the locale overhead
    const dst: string[] = [];
    dst.push(`
    const ${getCreatorName(aLocale)}: () => FormatFunction[] = () => [`);
    // iterate over the required keys
    forEach(aKeys, (aKey: string) => {
      // check if we have a value
      const value = aValues[aKey];
      if (isNotNil(value)) {
        dst.push(`${jsonStringify(value)},`);
      } else {
        dst.push(`${jsonStringify(aKey)},`);
      }
    });
    dst.push(`].map(genFormatMessage('${aLocale}'));`);

    dst.push(
      `const ${getGeneratorName(aLocale)} = memoize(${getCreatorName(
        aLocale
      )});`
    );

    // returns the tuple of locale and code
    return dst;
  }

  /**
   * Rewrite the translations for a locale
   *
   * @param aFile - the descriptor
   * @returns the locale
   */
  function createNonDefaultLocale(
    aLocale: Locale,
    aDefaultLocale: Locale,
    aValues: Record<string, string>,
    aKeys: string[]
  ) {
    // generate the locale overhead
    const dst: string[] = [];
    dst.push(`
    const ${getCreatorName(
      aLocale
    )}: () => FormatFunction[] = () => Object.assign([], ${getGeneratorName(
      aDefaultLocale
    )}(), [`);
    // iterate over the required keys
    forEach(aKeys, (aKey: string) => {
      // check if we have a value
      const value = aValues[aKey];
      if (isNotNil(value)) {
        dst.push(`${jsonStringify(value)},`);
      } else {
        dst.push(',');
      }
    });
    dst.push(`].map(genFormatMessage('${aLocale}')));`);

    dst.push(
      `const ${getGeneratorName(aLocale)} = memoize(${getCreatorName(
        aLocale
      )});`
    );

    // returns the tuple of locale and code
    return dst;
  }

  function createTypescript(
    aData: Record<Locale, Record<string, string>>
  ): string {
    // all keys
    const keys = extractAllKeys(aData);
    const keyList = objectKeys(keys).sort();
    // all locales
    const locales = extractAllLocales(aData);
    const localeList = objectKeys(locales).sort();

    const dst: string[] = [];
    dst.push(`
    import memoizeIntlConstructor from 'intl-format-cache';
    import { IntlMessageFormat, Options } from 'intl-messageformat';
    import { UnaryFunction } from 'rxjs';

    declare type FormatInput = Parameters<IntlMessageFormat["format"]>[0];
    declare type FormatResult = ReturnType<IntlMessageFormat["format"]>;
    declare type FormatFunction = (aInput?: FormatInput) => FormatResult;

    const {NumberFormat, DateTimeFormat, PluralRules } = Intl;

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
          const cached = memoize(() => new IntlMessageFormat(aValue, aLocale, undefined, OPTIONS()));
          return (aData?: FormatInput) => cached().format(aData);
        }
      }

    `);

    // export the keys
    dst.push(...keyEnum(keyList, keys));
    // export the locales
    dst.push(...localeEnum(localeList, locales));

    // default
    dst.push(
      ...createDefaultLocale(defaultLocale, aData[defaultLocale] || {}, keyList)
    );

    // non defaults
    forIn(locales, (aLocaleConstant: string, aLocale: Locale) =>
      dst.push(
        ...(aLocale !== defaultLocale
          ? createNonDefaultLocale(
              aLocale,
              defaultLocale,
              aData[aLocale],
              keyList
            )
          : [])
      )
    );

    dst.push(
      `const NLS_MAP: Record<NLS_LOCALE | string, () => FormatFunction[]> = {`
    );
    // iterate ove the locale indexes
    localeList.forEach((aLocale, idx) =>
      dst.push(`${idx}: ${getGeneratorName(aLocale)}, `)
    );
    // iterate over the locale strings
    forIn(locales, (aConstant, aLocale) =>
      dst.push(`${jsonStringify(aLocale)}: ${getGeneratorName(aLocale)}, `)
    );
    dst.push('};');

    // export
    dst.push(
      `export const NLS: UnaryFunction<NLS_LOCALE | string, FormatFunction[]> = (aKey) => (NLS_MAP[aKey] || ${getGeneratorName(
        defaultLocale
      )})();`
    );

    dst.push(
      `export const TRANSLATE: UnaryFunction<NLS_LOCALE | string, (aKey: NLS_KEY, aInput?: FormatInput) => FormatResult> = (aLocale: NLS_LOCALE | string) => {
        const nls = NLS(aLocale); return (aKey: NLS_KEY, aInput?: FormatInput) => nls[aKey](aInput);
      };`
    );

    return dst.join('\n');
  }

  return (aReadDir: ReadDirectory, aLogSvc?: LoggerService) => {
    // logger
    const logSvc = boxLoggerService(aLogSvc);
    const logger = logSvc.get(LOGGER);
    // next logger
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);
    // parse
    return rxPipe(
      // read the locales
      aReadDir(ensureDirPath(dir), isValidLocaleFile),
      reduce(reduceLocaleFile, {}),
      map(createTypescript),
      map((result) => createFileDescriptor('nls.ts', result))
    );
  };
}
