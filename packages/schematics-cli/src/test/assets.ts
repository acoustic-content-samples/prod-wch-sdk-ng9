import { join, normalize } from 'path';

/**
 * Directory that contains the test assets
 */
export const TEST_DIR = normalize(join(__dirname, '..', '..', 'test'));

export const ASSETS_DIR = normalize(
  join(__dirname, '..', '..', '..', '..', 'assets')
);
