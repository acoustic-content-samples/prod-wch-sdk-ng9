import { Tree } from '@angular-devkit/schematics';
import { canonicalizeJSON, serializeJson } from '@acoustic-content-sdk/schematics-utils';
import { deepEquals, jsonParse } from '@acoustic-content-sdk/utils';

export function readJson<T>(aTree: Tree, aPath: string): T {
  // only try to read if the file exists
  if (aTree.exists(aPath)) {
    try {
      // compare on a JSON basis
      return jsonParse<T>(aTree.read(aPath).toString());
    } catch (err) {
      // nothing
    }
  }
  // nothing to return
  return undefined;
}

/**
 * Overrides a JSON file
 *
 * @param aTree  - the tree
 * @param aData  - the JSON structure to write
 * @param aPath  - the target path
 *
 * @returns the tree
 */
export function writeJsonSafe(
  aTree: Tree,
  aData: any,
  aPath: string,
  bOverride: boolean
) {
  // canonicalize
  const data = Buffer.from(serializeJson(canonicalizeJSON(aData)));
  // do we already have the file?
  if (aTree.exists(aPath)) {
    // read
    try {
      // compare on a JSON basis
      const oldData = jsonParse(aTree.read(aPath).toString());
      if (!deepEquals(aData, oldData) && bOverride) {
        // override
        aTree.overwrite(aPath, data);
      }
    } catch (err) {
      // override
      aTree.overwrite(aPath, data);
    }
  } else {
    // create
    aTree.create(aPath, data);
  }
  // ok
  return aTree;
}

/**
 * Overrides a JSON file
 *
 * @param aTree  - the tree
 * @param aData  - the JSON structure to write
 * @param aPath  - the target path
 *
 * @returns the tree
 */
export function writeTextSafe(
  aTree: Tree,
  aData: string,
  aPath: string,
  bOverride: boolean
) {
  // do we already have the file?
  if (aTree.exists(aPath)) {
    // read
    try {
      // compare on a JSON basis
      const oldData = aTree.read(aPath).toString();
      if (aData !== oldData && bOverride) {
        // override
        aTree.overwrite(aPath, aData);
      }
    } catch (err) {
      // override
      aTree.overwrite(aPath, aData);
    }
  } else {
    // create
    aTree.create(aPath, aData);
  }
  // ok
  return aTree;
}

/**
 * Overrides a JSON file
 *
 * @param aTree  - the tree
 * @param aData  - the JSON structure to write
 * @param aPath  - the target path
 *
 * @returns the tree
 */
export function overrideJson(aTree: Tree, aData: any, aPath: string) {
  return writeJsonSafe(aTree, aData, aPath, true);
}
