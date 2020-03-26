import {
  createFileDescriptor,
  FileDescriptor
} from '@acoustic-content-sdk/tooling';
import { isNotEmpty, rxPipe } from '@acoustic-content-sdk/utils';
import { from, Observable, UnaryFunction, zip } from 'rxjs';
import { concatMap, distinct, filter, map, mergeMap } from 'rxjs/operators';

import { FORMAT_KEYS } from './font.face';
import { FontDetails, FontVariant } from './webfont.helper';

function createFontAsset(
  aPrefix: string,
  aVariant: FontVariant,
  aLoader: UnaryFunction<string, Observable<Buffer>>,
  aNameMapper: UnaryFunction<string, Observable<string>>
): Observable<FileDescriptor<Buffer>> {
  // extract the valid tuples
  const urls$ = rxPipe(
    from(FORMAT_KEYS),
    map((key) => [key, aVariant[key]]),
    filter(([, url]) => isNotEmpty(url))
  );
  // data
  const data$ = rxPipe(
    urls$,
    concatMap(([, url]) => aLoader(url))
  );
  const name$ = rxPipe(
    urls$,
    concatMap(([format, url]) =>
      rxPipe(
        aNameMapper(url),
        map((guid) => `${aPrefix}${guid}.${format}`)
      )
    )
  );
  // merge back
  return rxPipe(
    zip(name$, data$),
    map(([name, data]) => createFileDescriptor(name, data))
  );
}

const selectKey = ([aName]: FileDescriptor<any>) => aName;

export function createFontAssets(
  aDetails: FontDetails,
  aLoader: UnaryFunction<string, Observable<Buffer>>,
  aNameMapper: UnaryFunction<string, Observable<string>>
): Observable<FileDescriptor<Buffer>> {
  // extract the relevant data
  const { id, version, variants } = aDetails;
  // prefix
  const prefix = `/assets/fonts/${id}/${version}/`;
  // for all variants create
  return rxPipe(
    from(variants),
    mergeMap((variant) =>
      createFontAsset(prefix, variant, aLoader, aNameMapper)
    ),
    distinct(selectKey)
  );
}
