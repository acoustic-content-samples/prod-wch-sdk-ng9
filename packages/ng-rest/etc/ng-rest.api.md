## API Report File for "@acoustic-content-sdk/ng-rest"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { HubInfoUrlProvider } from '@acoustic-content-sdk/api';
import { ModuleWithProviders } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlConfig } from '@acoustic-content-sdk/api';
import { WchSdkVersion } from '@acoustic-content-sdk/api';

// @public
export class AcNgRestApiUrlModule {
    static forRoot(aApiUrl?: HubInfoUrlProvider): ModuleWithProviders;
}

// @public
export class AcNgRestAuthStatusModule {
}

// @public
export class AcNgRestContentModule {
}

// @public
export class AcNgRestFetchTextModule {
}

// @public
export class AcNgRestLayoutMappingModule {
}

// @public
export class AcNgRestLayoutModule {
}

// @public
export class AcNgRestModule {
    VERSION: WchSdkVersion;
}

// @public
export class AcNgRestPageModule {
}

// @public
export class AcNgRestSiteModule {
}

// @public
export class AcNgRestTypeModule {
}

// @public
export class AcNgRestUrlConfigModule {
}

// @public (undocumented)
export function proxyCreateUrlConfig(aBaseUrl?: HubInfoUrlProvider, aApiUrl?: HubInfoUrlProvider, aResourceUrl?: HubInfoUrlProvider, aDocument?: any): Observable<UrlConfig>;

// @public
export const VERSION: {
    version: {
        major: string;
        minor: string;
        patch: string;
    };
    build: Date;
};


```
