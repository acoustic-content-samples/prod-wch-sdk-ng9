import { parse } from 'path';
import { relativePath, ensureDirPath } from '@acoustic-content-sdk/tooling';

export function importFromFileToFile(aSrc: string, aDst: string): string {
  const { dir: srcDir } = parse(aSrc);
  const { dir: dstDir, name: dstName } = parse(aDst);
  // compute
  const relPath = relativePath(ensureDirPath(srcDir), ensureDirPath(dstDir));
  return `./${relPath}/${dstName}`;
}
