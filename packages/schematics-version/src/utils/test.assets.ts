import { normalize, join } from 'path';

export const ASSET_ROOT = normalize(
  join(__dirname, '..', '..', '..', '..', 'assets')
);
