## Utility functions to work with WCH

### Compute the API URL

The WCH API URL differs between the live and the preview system. If you decide to configure you application with an explicit API URL, e.g. for applications that are hosted outside of WCH, then you need to feed in the correct version of the URL depending on the runtime system.

The `wchGetHubInfoUrlProvider` method provides a default implementation for this task. It takes the live version of the API URL and a callback predicate as an input. The callback decides based on the current base URL of the application if the application is in live or preview state. The helper function will then derive the correct API URL.

Example:

```typescript
import { HubInfoUrlProvider } from '@acoustic-content-sdk/api';
import { wchGetHubInfoUrlProvider } from '@acoustic-content-sdk/utils';

export function apiUrl(): HubInfoUrlProvider {
  return wchGetHubInfoUrlProvider(
    'https://content-us-1.content-cms.com/api/6f0ce0ff-8a25-4fac-b66a-5d42516247eb',
    baseURL => /preview/.test(baseURL.href)
  );
}

export const environment = {
  apiUrl
};
```

**Note** It is important that `apiUrl` is an exported function using the `function` statement. Arrow functions do NOT work for the [AOT compiler](https://angular.io/guide/aot-compiler#metadata-restrictions).
