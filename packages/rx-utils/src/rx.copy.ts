/** Copyright IBM Corp. 2017 */
import { copy, CopyOptions, stat } from 'fs-extra';
import { mkdir, Stats } from 'graceful-fs';
import { join, parse } from 'path';
import {
  bindNodeCallback,
  from,
  merge,
  Observable,
  Observer,
  of,
  OperatorFunction,
  throwError,
  UnaryFunction
} from 'rxjs';
import {
  catchError,
  filter,
  map,
  mapTo,
  mergeMap,
  mergeMapTo,
  share
} from 'rxjs/operators';
import { VError } from 'verror';

import { rxCacheSingle, rxPipe } from './rx.utils';
import {
  FileDescriptor,
  rxCopyFileStream,
  rxReaddir,
  rxStats
} from './rx.walk';

/**
 * Creates a single directory
 *
 * @param aPath - the path to create
 *
 * @returns observable with the result
 */
function _rxMkDir(aPath: string): Observable<string> {
  return Observable.create((observer: Observer<string>) => {
    // create the path
    mkdir(aPath, (mkdirError) => {
      if (mkdirError) {
        // quick path to check for an existing directory
        if (mkdirError.code === 'EEXIST') {
          // success
          observer.next(aPath);
          observer.complete();
        } else {
          // test if the directory exists
          stat(aPath, (statError, stat) => {
            // in case of a stat error, bail our
            if (statError) {
              observer.error(
                new VError(statError, 'Unable to create directory [%s].', aPath)
              );
            }
            // check if the directory exists
            else if (stat.isDirectory()) {
              // success
              observer.next(aPath);
              observer.complete();
            } else {
              // bail out
              observer.error(
                new VError(
                  mkdirError,
                  'Unable to create directory [%s].',
                  aPath
                )
              );
            }
          });
        }
      } else {
        observer.next(aPath);
        observer.complete();
      }
    });
  });
}

function _rxMkDirs(): UnaryFunction<string, Observable<string>> {
  // directory map
  const dirMap: { [path: string]: Observable<string> } = {};

  function _mkdir(aDir: string): Observable<string> {
    // test if we know the directory
    return dirMap[aDir] || (dirMap[aDir] = rxCacheSingle(_rxMkDir(aDir)));
  }

  function _mkdirp(aDir: string): Observable<string> {
    // check if we know the directory
    let res = dirMap[aDir];
    if (!res) {
      // construct the parent directory
      const parsed = parse(aDir);
      // test for the root directory
      if (parsed.root === parsed.dir) {
        // do not recurse
        res = of(aDir);
      } else {
        // construct the parent and attach
        res = _mkdirp(parsed.dir).pipe(
          mergeMap(() => _mkdir(aDir)),
          catchError((error) =>
            throwError(
              new VError(
                error,
                'Unable to recursively create directory [%s].',
                aDir
              )
            )
          )
        );
      }
    }
    // ok
    return res;
  }

  return _mkdirp;
}

interface FileInfo {
  child: string;
  src: string;
  dst: string;
}

interface FileInfoWithStats extends FileInfo {
  stats: Stats;
}

/**
 * Copies one directory into the other and issues the names of the copied files
 *
 * @param aSrc - the source directory
 * @param aDst - the target directory
 * @param aOverride - true if we want to override, else false
 *
 * @returns observable of the copied files
 */
function _doCopyDir(
  aSrc: string,
  aDst: string,
  aMkdirp: UnaryFunction<string, Observable<string>>,
  aOverride: boolean
): Observable<string> {
  // create the target
  const rxDstDir = aMkdirp(aDst);

  // children
  const rxChildren: Observable<string> = rxPipe(
    rxReaddir(aSrc),
    mergeMap((children) => from(children))
  );
  const opFileInfo: OperatorFunction<string, FileInfo> = (rxChild) =>
    rxChild.pipe(
      map<string, FileInfo>((child) => ({
        child,
        src: join(aSrc, child),
        dst: join(aDst, child)
      }))
    );
  const opStats: OperatorFunction<FileInfo, FileInfoWithStats> = (rxInfo) =>
    rxInfo.pipe(
      mergeMap((info) =>
        rxStats(info.src).pipe(
          map<Stats, FileInfoWithStats>((stats: Stats) => ({ ...info, stats }))
        )
      )
    );
  const opFileInfoWithStats: OperatorFunction<string, FileInfoWithStats> = (
    rxFileInfo
  ) =>
    rxFileInfo.pipe(
      opFileInfo,
      opStats
    );
  const rxFileInfoWithStats: Observable<FileInfoWithStats> = rxChildren.pipe(
    opFileInfoWithStats,
    share<FileInfoWithStats>()
  );
  // split the children into directories and files
  const rxDirs = rxFileInfoWithStats.pipe(
    filter((info) => info.stats.isDirectory())
  );
  const rxFiles = rxFileInfoWithStats.pipe(
    filter((info) => info.stats.isFile())
  );

  // copy the files
  const rxCopyFiles = rxFiles.pipe(
    mergeMap((info) => _rxCopyFile(info.src, info.dst))
  );
  // copy the directory
  const rxCopyDir = rxDstDir.pipe(
    mergeMap(() =>
      rxDirs.pipe(
        mergeMap((info) => _doCopyDir(info.src, info.dst, aMkdirp, aOverride))
      )
    )
  );
  // combine both
  return merge(rxCopyDir, rxCopyFiles);
}

/**
 * Copies a set of source files to a destination directory
 *
 * @param aSources - the list of source files
 * @param aDst - the target directory
 *
 * @returns the list of copied filed
 */
function _copyFiles(
  aSources: Observable<FileDescriptor>,
  aDst: string
): Observable<string> {
  // mkdir hook
  const _mkdirp = _rxMkDirs();

  /**
   * Copies a single file from source to destination
   *
   * @param aSrcFile - the source file
   * @param aDstFile - the destination file
   *
   * @returns observable of the copy result
   */
  function _copyFile(aSrcFile: string, aDstFile: string): Observable<string> {
    // copy
    const parsed = parse(aDstFile);
    // do
    return _mkdirp(parsed.dir).pipe(
      mergeMapTo(rxCopyFileStream(aSrcFile, aDstFile)),
      catchError((error) =>
        throwError(
          new VError(
            error,
            'Unable to copy file [%s] to [%s].',
            aSrcFile,
            aDstFile
          )
        )
      )
    );
  }

  // execute the copy process
  return aSources.pipe(
    filter((src) => !src.stats.isDirectory()),
    mergeMap((src) => _copyFile(src.absPath, join(aDst, src.relPath)))
  );
}

// copy
const _rxCopyDir = (aSrc: string, aDst: string, aOverride?: boolean) =>
  _doCopyDir(aSrc, aDst, _rxMkDirs(), !!aOverride).pipe(
    catchError((copyError) =>
      throwError(
        new VError(copyError, 'Unable to copy [%s] to [%s].', aSrc, aDst)
      )
    )
  );

// copy
const _rxCopy = bindNodeCallback<string, string, CopyOptions>(copy);
const _rxCopyFile = (aSrc: string, aDst: string, aOverride?: boolean) =>
  rxPipe(
    _rxCopy(aSrc, aDst, {
      overwrite: !!aOverride,
      preserveTimestamps: true
    }),
    mapTo(aDst)
  );

export {
  _rxCopyFile as rxCopyFile,
  _rxCopyDir as rxCopyDir,
  _copyFiles as rxCopyFiles,
  _rxMkDirs as rxMkDirs
};
