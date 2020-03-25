import { FileDescriptor } from '@acoustic-content-sdk/tooling';
import { isNotNil, mapArray, reduceToObject, rxPipe, jsonStringify } from '@acoustic-content-sdk/utils';
import { get } from 'request-promise-native';
import { from, identity, Observable } from 'rxjs';
import { filter, ignoreElements, map, mergeMap, tap } from 'rxjs/operators';

const BASE_URL = 'https://google-webfonts-helper.herokuapp.com/api/'

/**
 * Supported subset mappings, feel free to extends
 */
const SUBSETS: Record<string, string> = {
  "cyrillic-ext": "U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F",
  "cyrillic": "U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116",
  "greek-ext": "U+1F00-1FFF",
  "greek": "U+0370-03FF",
  "vietnamese": "U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB",
  "latin-ext": "U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF",
  "latin": "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
  "hebrew": "U+0590-05FF, U+20AA, U+25CC, U+FB1D-FB4F",
  "thai": "U+0E01-0E5B, U+200C-200D, U+25CC",
  "arabic": "U+0600-06FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE80-FEFC"
};

interface FontDescription {
  id: string;
  family: string;
  variants: string[];
  subsets: string[];
  category: string;
}

interface FontVariant {
  id: string;
  eot: string;
  fontFamily: string;
  fontStyle: string;
  fontWeight: string;
  woff: string;
  local: string[];
  ttf: string;
  svg: string;
  woff2: string;
}

interface FontDetails {
  id: string;
  family: string;
  variants: FontVariant[],
  category: string
}

export function generateFonts(
  aNames: string,
  aDstDir: string
): Observable<FileDescriptor<any>> {
  // split the font names
  const ids: Record<string, string> = reduceToObject(mapArray(aNames.split(','), name => name.trim()), identity);
  // request the full list of fonts
  const list$: Observable<any> = rxPipe(
    from(get(`${BASE_URL}fonts`, { json: true })),
    mergeMap((list: FontDescription[]) => from(list)),
    filter(({ id }) => isNotNil(ids[id])),
    map(({ id, subsets }) => `${BASE_URL}fonts/${encodeURIComponent(id)}?subsets=${mapArray(subsets, encodeURIComponent).join(',')}`),
    mergeMap(url => get(url, {json: true}))
  );


  return rxPipe(list$, tap(data => console.log(jsonStringify(data))), ignoreElements());
}
