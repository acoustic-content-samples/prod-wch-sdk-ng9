import { ensureTrailingSlash } from '@acoustic-content-sdk/schematics-utils';
import { ArtifactMode } from '@acoustic-content-sdk/tooling-contributions';

/**
 * Inserts the mode into a filename
 *
 * @param aName - the original filename
 * @param aMode - the mode
 *
 * @returns the resulting filename
 */
export function addModeToName(aName: string, aMode: ArtifactMode): string {
  // split the extension
  const seg = aName.split('.');
  seg.splice(-1, 0, aMode);
  return seg.join('.');
}

/**
 * Inserts the mode into a path
 *
 * @param aName - the original path
 * @param aMode - the mode
 *
 * @returns the resulting filename
 */
export function addModeToPath(aName: string, aMode: ArtifactMode): string {
  // split the extension
  return ensureTrailingSlash(`${ensureTrailingSlash(aName)}${aMode}`);
}
