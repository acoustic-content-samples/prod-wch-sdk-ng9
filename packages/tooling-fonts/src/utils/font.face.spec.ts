import { join } from 'path';
import { ASSET_ROOT } from './../test/assets';
import {
  rxReadJsonFile,
  rxReadBinaryFile,
  rxDownloadFile
} from '@acoustic-content-sdk/rx-utils';
import { kebabCase, rxPipe } from '@acoustic-content-sdk/utils';
import { createLoader } from './loader';
import { createGuidGenerator } from './name';
import { Observable } from 'rxjs';
import { FontDetails } from './webfont.helper';
import { mergeMap, map, mergeMapTo, catchError } from 'rxjs/operators';
import { createFontFaces } from './font.face';

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
    // return
    return rxPipe(local$, catchError(fallback));
  };

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

    return rxPipe(fontFace$, map(console.log)).toPromise();
  });
});
