import { join, normalize } from 'path';

export const ASSET_BASE = normalize(
  join(__dirname, '..', '..', '..', '..', 'assets')
);
