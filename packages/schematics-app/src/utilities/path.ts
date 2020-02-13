import { ensureDirPath, relativePath } from '@acoustic-content-sdk/tooling';
import { normalize } from '@angular-devkit/core';
import { join, parse } from 'path';

export function importFromFileToFile(aSrc: string, aDst: string): string {
  const { dir: srcDir } = parse(aSrc);
  const { dir: dstDir, name: dstName } = parse(aDst);
  // compute
  const relPath = relativePath(ensureDirPath(srcDir), ensureDirPath(dstDir));
  return `./${relPath}/${dstName}`;
}

export function resolveRelativePath(
  aSrcFile: string,
  aRelPath: string
): string {
  const { dir } = parse(aSrcFile);
  return normalize(join(dir, aRelPath));
}
