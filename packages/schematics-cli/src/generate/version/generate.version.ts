import { generateVersionSchematic } from '@acoustic-content-sdk/schematics-version';
import { Rule } from '@angular-devkit/schematics';

import { Schema } from './schema';

/**
 * Updates code artifacts to contain the current version
 *
 * @param options  - the options
 * @returns the rule that generates the artifacts
 */
export function generateVersion(options: Schema): Rule {
  // rule for the artifacts
  return generateVersionSchematic(options);
}
