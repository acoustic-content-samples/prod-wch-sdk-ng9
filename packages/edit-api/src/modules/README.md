# Modules

The `inline-edit-provider` can use the global `require` function to access functionality (modules) provided by the edit host. The result of the `require` call is a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that resolves to an API object. This section lists the available modules.

## WCH_LOGGER_MODULE

The `wch-logger` module provides access the to [logging APIs](https://www.npmjs.com/package/acoustic-content-sdk-api). Edit providers are encouraged to use this API instead of the `console` to issue logging statements (see [LoggerService](https://www.npmjs.com/package/acoustic-content-sdk-api)).

## WCH_INFO_MODULE

The `wch-info` module exposes information about the entry point URLs and whether or not the system is in preview mode or in live mode (see [UrlConfig](https://www.npmjs.com/package/acoustic-content-sdk-api)).

## WCH_CONFIG_MODULE

The `wch-config` module exposes information about configured URLs for the current tenant, e.g. the URL to the authoring host.

## WCH_ACTIVE_PAGE_MODULE

The `wch-active-page` module exposes the [ActivePage](https://www.npmjs.com/package/acoustic-content-sdk-api) interface.
