(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
    ? define({{{JSONstringify MODULE_NAME}}}, ['exports'], factory)
    : ((global = global || self),
      factory(
{{#if MODULE_SCOPE}}
        ((global[{{{JSONstringify MODULE_SCOPE}}}] = global[{{{JSONstringify MODULE_SCOPE}}}] || {}), (global[{{{JSONstringify MODULE_SCOPE}}}][{{{JSONstringify MODULE_LOCAL}}}] = {}))
{{else}}
        (global[{{{JSONstringify MODULE_LOCAL}}}] = {})
      ));
{{/if}}
})(this, function(exports) {
  'use strict';

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

  exports.ACOUSTIC_CONTENT = ACOUSTIC_CONTENT;
  exports.MODULE = MODULE;
  exports.VERSION = VERSION;

  Object.defineProperty(exports, '__esModule', { value: true });
});
