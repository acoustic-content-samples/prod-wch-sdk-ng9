import { normalize, join } from 'path';

export const PACKAGES = normalize(
  join(__dirname, '..', '..', '..', '..', 'packages')
);
