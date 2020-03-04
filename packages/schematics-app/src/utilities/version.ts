import { isNotEmpty } from '@acoustic-content-sdk/utils';
import { env } from 'process';

const KEY_NPM_VERSION = 'npm_package_version';

export function getVersion(aPkg: any): string {
  // detect version
  const envVersion = env[KEY_NPM_VERSION];
  // fallback
  return isNotEmpty(envVersion) ? envVersion : aPkg.version;
}
