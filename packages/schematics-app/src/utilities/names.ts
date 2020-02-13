import { ensureTrailingSlash } from '@acoustic-content-sdk/schematics-utils';
import { ArtifactMode } from '@acoustic-content-sdk/tooling-contributions';
import { parse } from 'path';

const ROOT_PATH = 'acoustic-content-sdk';

/**
 * Inserts the mode into a filename
 *
 * @param aName - the original filename
 * @param aMode - the mode
 *
 * @returns the resulting filename
 */
export function addModeToName(aName: string, aMode: ArtifactMode): string {
  // locate the actual filename
  const { dir, base } = parse(aName);
  // insert the path
  return `${dir}/${ROOT_PATH}/${aMode}/${base}`;
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
