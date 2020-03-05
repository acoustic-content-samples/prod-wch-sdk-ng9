import { ensureTrailingSlash } from '@acoustic-content-sdk/schematics-utils';
import { getOrganization } from '@acoustic-content-sdk/tooling';
import { ArtifactMode } from '@acoustic-content-sdk/tooling-contributions';
import { parse } from 'path';

import { MODULE } from './../version';

const ROOT_PATH = getOrganization(MODULE);

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
 * @param aVersion - the version string
 * @param aMode - the mode
 *
 * @returns the resulting filename
 */
export function addModeToPath(
  aName: string,
  aVersion: string,
  aMode: ArtifactMode
): string {
  // split the extension
  return ensureTrailingSlash(
    `${ensureTrailingSlash(aName)}v${aVersion}/${aMode}`
  );
}
