## API Report File for "@acoustic-content-sdk/tooling-feature-module"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { FileDescriptor } from '@acoustic-content-sdk/tooling';
import { LoggerService } from '@acoustic-content-sdk/api';
import { Observable } from 'rxjs';
import { ReadTextFile } from '@acoustic-content-sdk/tooling';

// @public
export function generateFeatureModule(options: GenerateFeatureModuleSchema): (aReadText: ReadTextFile, aLogSvc?: LoggerService) => Observable<FileDescriptor<string>>;

// @public (undocumented)
export interface GenerateFeatureModuleSchema {
    module: string;
}

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
