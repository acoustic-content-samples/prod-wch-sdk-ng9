import {
  rxDownloadFile,
  rxReadBinaryFile,
  rxReadJsonFile
} from '@acoustic-content-sdk/rx-utils';
import { kebabCase, rxPipe } from '@acoustic-content-sdk/utils';
import { join } from 'path';
import { Observable } from 'rxjs';
import { catchError, map, mergeMap, mergeMapTo, toArray } from 'rxjs/operators';

import { ASSET_ROOT } from './../test/assets';
import { createFontFaces } from './font.face';
import { createLoader } from './loader';
import { createGuidGenerator } from './name';
import { FontDetails } from './webfont.helper';
import { createFontAssets } from './font.assets';

describe('fontface', () => {
  const ROOT = join(ASSET_ROOT, 'fonts');

  // the load callback
  const loadBinary = (aUrl: string) => {
    // local path
    const path = join(ROOT, 'roboto', kebabCase(aUrl));
    // try to read locally
    const local$ = rxReadBinaryFile(path);
    // fallback
    const fallback = () =>
      rxPipe(rxDownloadFile(aUrl, path), mergeMapTo(local$));
    // returns the local file or downloads it if missing
    return rxPipe(local$, catchError(fallback));
  };

  fit('should generate assets', () => {
    // loader
    const loader = createLoader(loadBinary);
    const guids = createGuidGenerator(loader);
    // read the font details
    const fontDetails$: Observable<FontDetails> = rxReadJsonFile(
      join(ROOT, 'roboto.json')
    );
    // assets
    const asset$ = rxPipe(
      fontDetails$,
      mergeMap((details) => createFontAssets(details, loader, guids))
    );
    //
    return rxPipe(
      asset$,
      map(([name]) => console.log(name))
    ).toPromise();
  });

  it('should generate a fontface definition', () => {
    // loader
    const loader = createLoader(loadBinary);
    const guids = createGuidGenerator(loader);
    // read the font details
    const fontDetails$: Observable<FontDetails> = rxReadJsonFile(
      join(ROOT, 'roboto.json')
    );
    // create the details
    const fontFace$ = rxPipe(
      fontDetails$,
      mergeMap((details) => createFontFaces(details, guids))
    );

    return rxPipe(
      fontFace$,
      toArray(),
      map((data) => data.join('\n')),
      map(console.log)
    ).toPromise();
  });
});
