import { join, Path } from '@angular-devkit/core';
import { Tree } from '@angular-devkit/schematics';
import { Logger } from '@acoustic-content-sdk/api';
import {
  arrayPush,
  forEach,
  isNil,
  isNotNil,
  isString
} from '@acoustic-content-sdk/utils';

import { NOOP_LOGGER } from './logger';

function isEqual(aFile: string | Buffer, aContent: Buffer): boolean {
  return isString(aFile)
    ? aFile === aContent.toString()
    : aFile.equals(aContent);
}

/**
 * Overwrites file content, but only if it differs
 *
 * @param aPath
 * @param aFile
 * @param aHost
 */
export function safeWrite(
  aPath: string,
  aFile: string | Buffer,
  aHost: Tree
): Tree {
  // check if we override or move
  if (aHost.exists(aPath)) {
    // check for deletion
    if (isNotNil(aFile)) {
      // check if we need to override
      const old = aHost.get(aPath);
      const eq = !(old && old.content) || isEqual(aFile, old.content);
      if (!eq) {
        aHost.overwrite(aPath, aFile);
      }
    } else {
      // delete the file
      aHost.delete(aPath);
    }
  }
  // check if we want to delete a file
  else if (isNotNil(aFile)) {
    // create a new file
    aHost.create(aPath, aFile);
  }
  // returns the tree
  return aHost;
}

export function syncDir(
  aSrc: string,
  aDst: string,
  aHost: Tree,
  aLogger: Logger = NOOP_LOGGER
): Tree {
  // log
  aLogger.info('syncDir', aSrc, aDst);
  // list and copy
  const srcDirEntry = aHost.getDir(aSrc);
  // check for the target files
  const origFiles: string[] = [];
  const dstDirEntry = aHost.getDir(aDst);
  if (dstDirEntry) {
    dstDirEntry.visit((path) => arrayPush(path, origFiles));
  }
  // prefix length
  const len = aSrc.length;
  const dstPrefix: Path = aDst as any;
  // maps from target to source
  const files: Record<string, string> = {};
  // copy
  srcDirEntry.visit((path) => {
    // target
    const dstPath = join(dstPrefix, path.substr(len));
    // write the file
    safeWrite(dstPath, aHost.get(path).content, aHost);
    // update the record
    files[dstPath] = path;
  });
  // remove target files
  forEach(origFiles, (path) => isNil(files[path]) && aHost.delete(path));
  // returns the host
  return aHost;
}

/**
 * Copies from source to target and overrides the target. But does not delete extra files
 *
 * @param aSrc - source directory
 * @param aDst - target directory
 * @param aHost - tree
 *
 * @returns the tree
 */
export function copyDir(
  aSrc: string,
  aDst: string,
  aHost: Tree,
  aLogger: Logger = NOOP_LOGGER
): Tree {
  // log
  aLogger.info('copyDir', aSrc, aDst);
  // list and copy
  const dirEntry = aHost.getDir(aSrc);
  // prefix length
  const len = aSrc.length;
  const dstPrefix: Path = aDst as any;
  // copy
  dirEntry.visit((path) =>
    safeWrite(join(dstPrefix, path.substr(len)), aHost.get(path).content, aHost)
  );
  // returns the host
  return aHost;
}
