import { WchSdkVersion } from '../interfaces/sdk/version/version';

/**
 * Constructs a version object from a version string and a build date
 *
 * @param aVersionString - the version string such as in package json
 * @param aBuildDate - the build date in ISO format
 *
 * @returns the SDK version object
 * @deprecated
 */
export function createVersion(
  aVersionString: string,
  aBuildDate: string
): WchSdkVersion {
  // parse the version string
  const res = aVersionString.split('.');
  if (res && res.length > 2) {
    // decompose
    const [major, minor, patch] = res;
    const version = { major, minor, patch };
    // build date
    const build = new Date(aBuildDate);
    // returns the object
    return { version, build };
  }
  // fallback
  return createVersion('x.y.z', aBuildDate);
}

/**
 * Converts the version object into a version string
 *
 * @param aVersion  - the version object
 * @returns the version string
 */
export function createVersionString(aVersion: WchSdkVersion): string {
  // extract the fields
  const { version, build } = aVersion;
  const { major, minor, patch } = version;
  // expose as a version string
  return `v${major}.${minor}.${patch} - ${build.toUTCString()}`;
}
