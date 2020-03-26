import { isNotEmpty, isNotNil, rxPipe } from '@acoustic-content-sdk/utils';
import { concat, EMPTY, forkJoin, Observable, of, UnaryFunction } from 'rxjs';
import { map } from 'rxjs/operators';

import { FontDetails, FontVariant } from './webfont.helper';

/**
 * Supported subset mappings, feel free to extends
 */
const SUBSETS: Record<string, string> = {
  'cyrillic-ext':
    'U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F',
  cyrillic: 'U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116',
  'greek-ext': 'U+1F00-1FFF',
  greek: 'U+0370-03FF',
  vietnamese:
    'U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB',
  'latin-ext':
    'U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF',
  latin:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
  hebrew: 'U+0590-05FF, U+20AA, U+25CC, U+FB1D-FB4F',
  thai: 'U+0E01-0E5B, U+200C-200D, U+25CC',
  arabic:
    'U+0600-06FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE80-FEFC'
};

const FORMATS = {
  eot: 'embedded-opentype',
  woff2: 'woff2',
  woff: 'woff',
  ttf: 'truetype',
  svg: 'svg'
};

const FORMAT_KEYS = ['eot', 'woff2', 'woff', 'ttf', 'svg'];

/**
 * Constructs the correct URL import including a format specifier
 *
 * @param aPrefix - prefix
 * @param aUrl - the font URL
 * @param aFormat - the font format
 * @param aNameMapper - maps the url to a name
 *
 * @return the url
 */
function createUrlWithFormat(
  aPrefix: string,
  aUrl: string,
  aFormat: string,
  aNameMapper: UnaryFunction<string, Observable<string>>
): Observable<string> {
  return rxPipe(
    aNameMapper(aUrl),
    map(
      (name) =>
        `url('${aPrefix}${name}.${aFormat}') format('${FORMATS[aFormat]}')`
    )
  );
}

/**
 * Constructs the correct URL import without a format specifier
 *
 * @param aPrefix - prefix
 * @param aUrl - the font URL
 * @param aFormat - the font format
 * @param aNameMapper - maps the url to a name
 *
 * @return the url
 */
function createUrl(
  aPrefix: string,
  aUrl: string,
  aFormat: string,
  aNameMapper: UnaryFunction<string, Observable<string>>
): Observable<string> {
  return rxPipe(
    aNameMapper(aUrl),
    map((name) => `url('${aPrefix}${name}.${aFormat}')`)
  );
}

function createLocal(aName: string): string {
  return `local('${aName}')`;
}

function createSrcLine(aValues: string[]): string {
  return `src: ${aValues.join(', ')};`;
}

/**
 * Constructs the source lines for the font face
 *
 * @param aPrefix - the URL prefix
 * @param aVariant - the font variant
 * @param aNameMapper - the name mapper
 *
 * @returns the src lines
 */
function createSrc(
  aPrefix: string,
  aVariant: FontVariant,
  aNameMapper: UnaryFunction<string, Observable<string>>
): Observable<string> {
  // check for the IE special case
  const eot = aVariant.eot;
  const eot$ = isNotNil(eot)
    ? rxPipe(
        createUrl(aPrefix, eot, 'eot', aNameMapper),
        map((url) => createSrcLine([url]))
      )
    : EMPTY;
  // the regular imports
  const locals = aVariant.local.map(createLocal);
  // extract the valid tuples
  const urls = FORMAT_KEYS.map((key) => [key, aVariant[key]])
    .filter(([, url]) => isNotEmpty(url))
    .map(([format, url]) => createUrl(aPrefix, url, format, aNameMapper));
  // resolve
  const src$ = rxPipe(
    forkJoin(urls),
    map((remotes) => createSrcLine([...locals, ...remotes]))
  );
  // combine with the eot
  return concat(eot$, src$);
}

/**
 * Creates one single font variant
 *
 * @param aPrefix - the URL prefix
 * @param aVariant - the font variant
 * @param aSubset - the subset
 * @param aNameMapper - the name mapper
 *
 * @returns the lines for the font family
 */
function createFontVariant(
  aPrefix: string,
  aFontVariant: FontVariant,
  aSubset: string,
  aNameMapper: UnaryFunction<string, Observable<string>>
): Observable<string> {
  // extract
  const { fontFamily, fontStyle, fontWeight } = aFontVariant;
  // issue the lines
  const prefix$ = of(
    `/* ${fontFamily} - ${fontStyle} - ${fontWeight} - ${aSubset} */`,
    '@font-face {',
    `font-family: ${fontFamily};`,
    `font-style: ${fontStyle};`,
    `font-weight: ${fontWeight};`
  );
  // sources
  const src$ = createSrc(aPrefix, aFontVariant, aNameMapper);
  // subset
  const range = SUBSETS[aSubset];
  const range$ = isNotEmpty(range) ? of(`unicode-range: ${range};`) : EMPTY;
  // suffix
  const suffix$ = of('}');
  // combine all
  return concat(prefix$, src$, range$, suffix$);
}

function createFontVariants(
  aPrefix: string,
  aFontVariant: FontVariant,
  aSubsets: string[],
  aNameMapper: UnaryFunction<string, Observable<string>>
): Observable<string> {
  // constructs the different font variants
  const subsets = aSubsets.map((subset) =>
    createFontVariant(aPrefix, aFontVariant, subset, aNameMapper)
  );
  // return the subsets in order
  return concat(...subsets);
}

export function createFontFaces(
  aDetails: FontDetails,
  aNameMapper: UnaryFunction<string, Observable<string>>
): Observable<string> {
  // extract the relevant data
  const { id, version, subsets, variants } = aDetails;
  // prefix
  const prefix = `{{{$context.hub.resourceUrl.href}}}fonts/${id}/${version}/`;
  // construct the variants
  const vars = variants.map((vari) =>
    createFontVariants(prefix, vari, subsets, aNameMapper)
  );
  // concat all
  return concat(...vars);
}
