import { FileDescriptor } from '@acoustic-content-sdk/tooling';
import {
  isNotNil,
  mapArray,
  reduceToObject,
  rxPipe,
  jsonStringify
} from '@acoustic-content-sdk/utils';
import { get } from 'request-promise-native';
import { from, identity, Observable } from 'rxjs';
import { filter, ignoreElements, map, mergeMap, tap } from 'rxjs/operators';

const BASE_URL = 'https://google-webfonts-helper.herokuapp.com/api/';

interface FontDescription {
  id: string;
  family: string;
  variants: string[];
  subsets: string[];
  category: string;
}

export function generateFonts(
  aNames: string,
  aDstDir: string
): Observable<FileDescriptor<any>> {
  // split the font names
  const ids: Record<string, string> = reduceToObject(
    mapArray(aNames.split(','), (name) => name.trim()),
    identity
  );
  // request the full list of fonts
  const list$: Observable<any> = rxPipe(
    from(get(`${BASE_URL}fonts`, { json: true })),
    mergeMap((list: FontDescription[]) => from(list)),
    filter(({ id }) => isNotNil(ids[id])),
    map(
      ({ id, subsets }) =>
        `${BASE_URL}fonts/${encodeURIComponent(id)}?subsets=${mapArray(
          subsets,
          encodeURIComponent
        ).join(',')}`
    ),
    mergeMap((url) => get(url, { json: true }))
  );

  return rxPipe(
    list$,
    tap((data) => console.log(jsonStringify(data))),
    ignoreElements()
  );
}
