# HubInfoService

The hub info service provides information about the entry URLs to WCH. It exposes the following information:

* `apiUrl`: URL to access the API layer, e.g. 'https://my.digitalexperience.ibm.com/api/345563cf-a83c-40e5-a065-1d6ff36b05c1'
* `resourceUrl`: URL to access the delivery layer, e.g. 'https://my.digitalexperience.ibm.com/345563cf-a83c-40e5-a065-1d6ff36b05c1'
* `cycleHandlingStrategy?`: Specifies how the SDK deals with cyclic data structures, one of `BREAK` or `RESOLVE`.
* `fetchLevels?`: Number of levels to fetch per request to the rendering context. If missing all levels will be fetched.
* `httpOptions?`: Configuration of the HTTP strategy for the live site. Of type `HttpResourceOptions`.
* `httpPreviewOptions?`: Configuration of the HTTP strategy for the preview site. Of type `HttpResourceOptions`.

Note that the URLs may end with a slash, however this is not required.

## HttpResourceOptions

* `pollTime?`: The system will periodically poll for updates. This setting configures the polling interval in [ms]. Consider to configure a different value for the live site and the preview site.
* `pollTimeVariation?`: In order to avoid fetching many request at the same time, this settings allows to introduce a time window from which the polling interval will be selected randomly. Sensible values are between 0 and 1, relative to the `pollTime`. Default is `0.15`.
* `useLocalStorage?`: If enabled the system will try to load data from local storage before making an HTTP call. Defaults to `true`.
* `useBootstrap?`: If enabled the system will try to load inline data before making an HTTP call. Defaults to `true`. Use the [Bootstrapservice][./../bootstrap] to add this data.
* `useStaticResources?`: If enabled the system will try to load prerendered data from the delivery site before making an API call. This can lead to 404 responses that are logged in some browsers, however this is not an error. Defaults to `true`.
* `useApi?`: If enabled the system will load site data and content items from the WCH REST APIs. When disabled it will only use one of the methods mentioned above. Defaults to `true`. Setting it to `false` is not recommended for production scenarios, but rather for testing, e.g. performance testing.
* `useJsonP?`: If enabled the system uses [JSONP](https://en.wikipedia.org/wiki/JSONP) to load data. From a caching perspective this is more efficient than an XHR, because XHR requests are subject to [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) and as a consequence generate an origin specific cache entry. Defaults to `true`.

## Usage

```typescript
    WchNgModule.forRoot({ apiUrl: new URL(apiUrl), resourceUrl: new URL(resourceUrl) })
```

alternative

```typescript
    import { environment } from '../environments/environment';

    WchNgModule.forRoot(environment)
```

Assuming that the required settings are part of the `environment` settings and the build uses the [Angular CLI environment](https://github.com/angular/angular-cli/wiki/stories-application-environments) concepts.

We recommend to define the `apiUrl` and the `resourceUrl` only for development mode, assuming that the application in production mode will be served from WCH. In that case, the system will detect the `apiUrl` and the `resourceUrl` automatically. In case the production mode application will be served from a different server than WCH, make sure to add an explicit configuration of the URLs.

## Tipps

When maintaining a [wchtools](https://www.npmjs.com/package/wchtools-cli) data folder with your application, this folder already has a `.wchtoolsoptions.json` file that contains the API URL. We recommend to read this file and initialize the environment variables from that source, to avoid duplication.

Declare the `.wchtoolsoptions.json` files as a modulein the `typings.d.ts` file, e.g. like this:

```typescript
declare module "*/.wchtoolsoptions.json" {
  const value: any;
  export default value;
}
```

In your `environment.ts` read the module, e.g. like this:

```typescript
import * as OPTIONS from './../../data/.wchtoolsoptions.json';

export const environment = {
  production: false,
  apiUrl: OPTIONS['x-ibm-dx-tenant-base-url'],
  httpOptions: { pollTime: 10 * 20 * 1000 }, httpPreviewOptions: { pollTime: 10 * 1000 }
};
```

Note that it is sufficient to specify the `apiUrl` property, the matching `resourceUrl` property will be derived from it, automatically.

## Note

* The naming of the fields was chosen such that it is consistent to the naming of the corresponding fields in the rendering context.
* The type of the fields is compatible to a [URL](https://developer.mozilla.org/en/docs/Web/API/URL) object.
