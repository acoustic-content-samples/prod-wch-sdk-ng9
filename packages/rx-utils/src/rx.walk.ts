/* Copyright IBM Corp. 2017 */
import { ensureDir, remove } from 'fs-extra';
import {
  createReadStream,
  createWriteStream,
  PathLike,
  readdir,
  readFile,
  stat,
  Stats,
  writeFile
} from 'graceful-fs';
import { join } from 'path';
import {
  bindNodeCallback,
  EMPTY,
  from,
  merge,
  Observable,
  Observer,
  of,
  throwError,
  UnaryFunction
} from 'rxjs';
import { catchError, map, mapTo, mergeMap } from 'rxjs/operators';
import { dir, tmpName } from 'tmp';
import { VError } from 'verror';

import { rxPipe } from './rx.utils';

export interface FileDescriptor {
  root: string;
  relPath: string;
  absPath: string;
  stats: Stats;
}

export function rxGetFileDescriptor(
  aFile: string,
  aRoot: string
): Observable<FileDescriptor> {
  return rxPipe(
    rxStats(aFile),
    map((stats) => ({
      root: aRoot,
      stats,
      absPath: aFile,
      relPath: aFile.substring(aRoot.length + 1)
    }))
  );
}

function doWalkFiles(
  root: string,
  relPath: string,
  aAccept: UnaryFunction<FileDescriptor, boolean>
): Observable<FileDescriptor> {
  // full path
  const absPath = join(root, relPath);
  // make the descriptor
  const desc$ = rxPipe(
    rxStats(absPath),
    map((stats) => ({ root, absPath, relPath, stats }))
  );
  // get the children
  const children$ = rxPipe(
    // list the immediate children
    rxReaddir(absPath),
    // isolate individual files
    mergeMap((children) => from(children)),
    // recurse
    mergeMap((child) => doWalkFiles(root, join(relPath, child), aAccept))
  );
  // check if accepted
  return rxPipe(
    desc$,
    mergeMap((desc) =>
      aAccept(desc)
        ? desc.stats.isDirectory()
          ? merge(of(desc), children$)
          : of(desc)
        : EMPTY
    )
  );
}

const ACCEPT_ALWAYS = () => true;

export function rxWalkFiles(
  aRoot: string,
  aAccept: UnaryFunction<FileDescriptor, boolean> = ACCEPT_ALWAYS
): Observable<FileDescriptor> {
  // start the recursion, now
  return doWalkFiles(aRoot, '', aAccept);
}

function _writeFileIfChanged(aPath: string, aData: any): Observable<string> {
  return Observable.create((observer: Observer<string>) => {
    // test if the file exists
    readFile(aPath, 'utf-8', (errRead, data) => {
      // check if the data changes
      if (!errRead && data === aData) {
        observer.complete();
      } else {
        // override
        writeFile(aPath, aData, (errWrite) => {
          if (errWrite) {
            observer.error(errWrite);
          } else {
            observer.next(aPath);
            observer.complete();
          }
        });
      }
    });
  });
}

// delete
const _rxDeleteFile = (aPath: string) =>
  rxPipe(from(remove(aPath)), mapTo(aPath));

// mkdir
const _rxMkdirp = (aPath: string) =>
  rxPipe(from(ensureDir(aPath)), mapTo(aPath));

// stats
export const rxStats = bindNodeCallback<PathLike, Stats>(stat);

export function rxCopyFileStream(
  aSrc: string,
  aDst: string
): Observable<string> {
  return Observable.create((aObserver: Observer<string>) => {
    const onError = (err: any) => aObserver.error(err);
    const onOk = () => {
      aObserver.next(aDst);
      aObserver.complete();
    };

    const rd = createReadStream(aSrc);
    rd.on('error', onError);

    const wr = createWriteStream(aDst);
    wr.on('error', onError);
    wr.on('close', onOk);
    rd.pipe(wr);
  });
}

export const rxReaddir = bindNodeCallback<PathLike, string[]>(readdir);

function _validateNotExists(aDir: string): Observable<string> {
  return rxStats(aDir).pipe(
    catchError((err) => of(err)),
    mergeMap((data) =>
      data instanceof Error
        ? of(aDir)
        : throwError(
            `Directory [${aDir}] already exists. Use --override to overwrite it.`
          )
    )
  );
}

function _rxTempDir(): Observable<string> {
  return Observable.create((o: Observer<string>) => {
    // dispatch
    dir((tmpError, tmpPath) => {
      // test for error
      if (tmpError) {
        o.error(new VError(tmpError, 'Unable to create temporary directory.'));
      } else {
        o.next(tmpPath);
        o.complete();
      }
    });
  });
}

function _rxTempName(): Observable<string> {
  return Observable.create((o: Observer<string>) => {
    // dispatch
    tmpName((tmpError, tmpName) => {
      // test for error
      if (tmpError) {
        o.error(new VError(tmpError, 'Unable to get a temporary name.'));
      } else {
        o.next(tmpName);
        o.complete();
      }
    });
  });
}

export {
  _writeFileIfChanged as writeFileIfChanged,
  _rxMkdirp as rxMkdirp,
  _rxDeleteFile as rxDeleteFile,
  _rxTempDir as rxTempDir,
  _rxTempName as rxTempName,
  _validateNotExists as rxValidateNotExists
};
