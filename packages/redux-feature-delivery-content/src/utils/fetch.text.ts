const SLASH = "/";

/*
 * Makes sure our path ends with a proper trailing slash
 */
export function removeStartingSlash(aUrl: string): string {
  return aUrl.indexOf(SLASH) === 0 ? aUrl.substr(1) : aUrl;
}
