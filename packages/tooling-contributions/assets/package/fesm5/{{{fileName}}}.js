/**
 * Expose the important resources as a mapping from typeID to content item ID
 */
var ACOUSTIC_CONTENT = {{{JSONstringify ACOUSTIC_CONTENT}}};

/** Version and build number of the package */
var VERSION = {
  version: { major: {{{JSONstringify MAJOR_VERSION}}}, minor: {{{JSONstringify MINOR_VERSION}}}, patch: {{{JSONstringify PATCH_LEVEL}}} },
  build: new Date({{{JSONstringify BUILD_DATE}}})
};
/** Module name */
var MODULE = {{{JSONstringify MODULE_NAME}}};

/**
* Generated bundle index. Do not edit.
*/

export { ACOUSTIC_CONTENT, MODULE, VERSION };
