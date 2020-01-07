import { rxPipe } from '@acoustic-content-sdk/utils';
import { PathLike, readFile, unlink } from 'fs';
import { Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { file } from 'tmp';

import { createFromCallback } from './rx.node';

// make sure we read a text file
export const rxReadTextFile = (path: PathLike | number) =>
  createFromCallback<string>((cb) => readFile(path, 'utf-8', cb));

// export the creator
export const rxTmpFile = createFromCallback<string>(file);

export const rxUnlink = (path: PathLike) =>
  createFromCallback<void>((cb) => unlink(path, cb));

export const rxDeleteFile: <T extends PathLike>(path: T) => Observable<T> = (
  path
) => rxPipe(rxUnlink(path), mapTo(path));
