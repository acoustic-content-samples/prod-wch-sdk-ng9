## API Report File for "@acoustic-content-sdk/ng-edit"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { AbstractInlineEditSelectionService } from '@acoustic-content-sdk/component-edit';
import { Consumer } from '@acoustic-content-sdk/utils';
import { InlineEditSelectionProvider } from '@acoustic-content-sdk/edit-api';
import { Logger } from '@acoustic-content-sdk/api';
import { LoggerService } from '@acoustic-content-sdk/api';
import { Observable } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { WchInlineEditProviderV2 } from '@acoustic-content-sdk/edit-api';
import { WchInlineEditServiceV2 } from '@acoustic-content-sdk/edit-api';
import { WindowType } from '@acoustic-content-sdk/component-api';

// @public
export function getInlineEditProvider(aHostWindow: WindowType, aLogSvc: LoggerService): Observable<WchInlineEditProviderV2>;

// @public
export function internalGetInlineEditProvider(aHostWindow: WindowType, logger: Logger): Observable<WchInlineEditProviderV2>;

// @public
export const VERSION: {
    version: {
        major: string;
        minor: string;
        patch: string;
    };
    build: Date;
};

// @public
export class WchNgEditableDirectiveModule {
}

// @public
export class WchNgEditablePlaceholderDirectiveModule {
}

// @public
export class WchNgEditComponentsModule {
    constructor(aLoggerService: LoggerService);
}

// @public
export class WchNgEditDirectivesModule {
    constructor(aLoggerService: LoggerService);
}

// @public
export class WchNgHttpInlineEditProviderModule {
}

// @public (undocumented)
export class WchNgInlineEditSelectionModule {
    // Warning: (ae-forgotten-export) The symbol "WchInlineEditSelectionService" needs to be exported by the entry point public_api.d.ts
    constructor(aSelService: WchInlineEditSelectionService);
    }

// @public
export class WchNgInlineEditServiceModule {
    constructor(aInlineEditService: WchInlineEditServiceV2, aSelectedCellConsumer?: Consumer<string>, aLoggerService?: LoggerService);
}

// @public
export class WchNgParentInlineEditProviderModule {
    constructor(aLoggerService: LoggerService);
}

// @public
export class WchNgSelectableDirectiveModule {
}


```