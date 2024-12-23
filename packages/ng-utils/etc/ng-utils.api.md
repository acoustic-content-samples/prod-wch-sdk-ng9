## API Report File for "@acoustic-content-sdk/ng-utils"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { AfterContentChecked } from '@angular/core';
import { AfterContentInit } from '@angular/core';
import { AfterViewChecked } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { DoCheck } from '@angular/core';
import { Observable } from 'rxjs';
import { OnChanges } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { RenderingContextInput } from '@acoustic-content-sdk/component-api';
import { RenderingContextProviderV2 } from '@acoustic-content-sdk/api';
import { RenderingContextV2 } from '@acoustic-content-sdk/api';
import { SimpleChanges } from '@angular/core';
import { WindowType } from '@acoustic-content-sdk/component-api';

// @public
export abstract class AbstractBaseComponent extends AbstractLifeCycleComponent implements RenderingContextProviderV2 {
    protected constructor();
    readonly layoutMode$: Observable<string>;
    layoutMode: string;
    renderingContext$: Observable<RenderingContextV2>;
}

// @public
export abstract class AbstractLifeCycleComponent implements OnInit, OnDestroy, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked {
    protected get afterContentChecked$(): Observable<void>;
    protected get afterContentInit$(): Observable<void>;
    protected get afterViewChecked$(): Observable<void>;
    protected get afterViewInit$(): Observable<void>;
    protected get doCheck$(): Observable<void>;
    ngAfterContentChecked(): void;
    ngAfterContentInit(): void;
    ngAfterViewChecked(): void;
    ngAfterViewInit(): void;
    ngDoCheck(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    ngOnInit(): void;
    protected get onChanges$(): Observable<SimpleChanges>;
    protected get onDestroy$(): Observable<void>;
    protected get onInit$(): Observable<void>;
}

// @public
export abstract class AbstractRenderingComponent extends AbstractBaseComponent implements RenderingContextProviderV2 {
    constructor();
    readonly layoutMode$: Observable<string>;
    readonly renderingContext$: Observable<RenderingContextV2>;
    trackCtx(aIndex: number, aCtx: RenderingContextInput): string | number;
}

// @public
export class AcNgBrowserWindowModule {
}

// @public
export class AcNgEditHostWindowModule {
}

// @public
export function proxyGetEditHostWindow(aCurrentWindow: WindowType): WindowType;

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
