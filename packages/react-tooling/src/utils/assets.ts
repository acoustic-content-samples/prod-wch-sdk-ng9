import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { rxLocateRootDir } from '@acoustic-content-sdk/tooling';
import { rxPipe } from '@acoustic-content-sdk/utils';
import { join } from 'path';

export function rxFindAssetDir(): Observable<string> {
  return rxPipe(rxLocateRootDir(__dirname), map((dir) => join(dir, 'assets')));
}
