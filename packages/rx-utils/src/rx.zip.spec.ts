import { concat } from 'rxjs';
import { mergeMap, shareReplay, tap, toArray } from 'rxjs/operators';
import { rxDeleteDir } from './rx.delete';
import { rxTempDir } from './rx.walk';
import { rxUnzipFromUrl } from './rx.zip';

describe('rx.zip', () => {
  it(
    'should unzip a file',
    () => {
      // sample file
      const url =
        'https://github.com/ibm-wch/wch-site-application/archive/master.zip';
      // temp directory
      const tmpDir$ = rxTempDir().pipe(shareReplay());
      // delete the dir
      const deleteDir$ = tmpDir$.pipe(mergeMap(rxDeleteDir));
      // unzip
      const unzip$ = tmpDir$.pipe(
        mergeMap(tmp => rxUnzipFromUrl(url, tmp, 1)),
        toArray(),
        tap(arr => expect(arr.length).toBeGreaterThan(1))
      );

      // result
      const result$ = concat(unzip$, deleteDir$);

      return result$.toPromise();
    },
    60 * 1000
  );
});
