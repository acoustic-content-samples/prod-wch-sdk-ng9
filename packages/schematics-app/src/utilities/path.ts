import { ensureDirPath, relativePath } from '@acoustic-content-sdk/tooling';
import { isNotEmpty } from '@acoustic-content-sdk/utils';
import { normalize } from '@angular-devkit/core';
import { join, parse } from 'path';

const PREFIX = 'root/';

export function importFromFileToFile(aSrc: string, aDst: string): string {
  const { dir: srcDir } = parse(`${PREFIX}${aSrc}`);
  const { dir: dstDir, name: dstName } = parse(`${PREFIX}${aDst}`);
  // compute
  const relPath = relativePath(ensureDirPath(srcDir), ensureDirPath(dstDir));
  return isNotEmpty(relPath) ? `./${relPath}/${dstName}` : `./${dstName}`;
}

export function relativeFileToFile(aSrc: string, aDst: string): string {
  const { dir: srcDir } = parse(`${PREFIX}${aSrc}`);
  const { dir: dstDir, base: dstName } = parse(`${PREFIX}${aDst}`);
  // compute
  const relPath = relativePath(ensureDirPath(srcDir), ensureDirPath(dstDir));
  return isNotEmpty(relPath) ? `./${relPath}/${dstName}` : `./${dstName}`;
}

export function resolveRelativePath(
  aSrcFile: string,
  aRelPath: string
): string {
  const { dir } = parse(aSrcFile);
  return normalize(join(dir, aRelPath));
}
