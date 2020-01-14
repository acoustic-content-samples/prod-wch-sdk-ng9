import { join, normalize } from 'path';

export const ASSET_DIR = normalize(
  join(__dirname, '..', '..', '..', '..', 'data')
);
