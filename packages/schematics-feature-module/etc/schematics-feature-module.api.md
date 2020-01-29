## API Report File for "@acoustic-content-sdk/schematics-feature-module"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { Rule } from '@angular-devkit/schematics';

// @public
export function addFeatureModuleSchematic(options: GenerateFeatureModuleSchema): Rule;

// @public
export function addFeatureModuleToApplication(options: AddFeatureModuleToApplicationSchema): Rule;

// @public
export interface AddFeatureModuleToApplicationSchema {
    importPath?: string;
    module: string;
    project?: string;
}

// @public (undocumented)
export interface GenerateFeatureModuleSchema {
    module: string;
    project?: string;
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