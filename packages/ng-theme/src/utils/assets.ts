import { normalize, join } from 'path';

export const ASSET_DIR = normalize(
  join(__dirname, '..', '..', '..', '..', 'assets')
);
