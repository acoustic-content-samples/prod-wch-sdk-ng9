/** Copyright IBM Corp. 2018 */

// regular expression to detect uuid.v4 strings
const HEX_REGEXP_STRING = '[0-9a-fA-F]';
const HOST_REGEXP_STRING = '[^\\.\\:]';
const UUID_V4_REGEXP_STRING =
    `${HEX_REGEXP_STRING}{8}-${HEX_REGEXP_STRING}{4}-4${HEX_REGEXP_STRING}{3}-[89abAB]${HEX_REGEXP_STRING}{3}-${HEX_REGEXP_STRING}{12}`;
const TENANT_BASED_URL = `^(?:\\/api)?\\/(${UUID_V4_REGEXP_STRING})(?:\\/)?(?:.*)$`;
export const TENANT_BASED_URL_REGEXP = new RegExp(TENANT_BASED_URL);
