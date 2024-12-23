## API Report File for "@acoustic-content-sdk/react-api"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { AbstractComponentResolver } from '@acoustic-content-sdk/component-api';
import { AbstractComponentsRegistry } from '@acoustic-content-sdk/component-api';
import { AbstractComponentTypeRefResolver } from '@acoustic-content-sdk/component-api';
import { AuthStatus } from '@acoustic-content-sdk/api';
import { ComponentClass } from 'react';
import { Context } from 'react';
import { DeliveryContentResolver } from '@acoustic-content-sdk/component-api';
import { DeliveryLayoutMappingResolver } from '@acoustic-content-sdk/component-api';
import { DeliveryLayoutResolver } from '@acoustic-content-sdk/component-api';
import { DeliveryPageResolver } from '@acoustic-content-sdk/component-api';
import { DeliverySearchResolver } from '@acoustic-content-sdk/component-api';
import { DeliverySiteResolver } from '@acoustic-content-sdk/component-api';
import { DeliveryTypeResolver } from '@acoustic-content-sdk/component-api';
import { DynamicLoggerFactory } from '@acoustic-content-sdk/api';
import { FunctionComponent } from 'react';
import { HandlebarsResolver } from '@acoustic-content-sdk/component-api';
import { HubInfoUrlProvider } from '@acoustic-content-sdk/api';
import { KEY_ID } from '@acoustic-content-sdk/api';
import { KEY_LAYOUT_MODE } from '@acoustic-content-sdk/utils';
import { KEY_RENDERING_CONTEXT } from '@acoustic-content-sdk/utils';
import { Layout } from '@acoustic-content-sdk/api';
import { LayoutMappingResolver } from '@acoustic-content-sdk/component-api';
import { LayoutResolver } from '@acoustic-content-sdk/component-api';
import { LoggerFactory } from '@acoustic-content-sdk/api';
import { LoggerService } from '@acoustic-content-sdk/api';
import { Observable } from 'rxjs';
import { ObservableInput } from 'rxjs';
import { ProtectedContent } from '@acoustic-content-sdk/component-api';
import { ReactNode } from 'react';
import { ReconciledDeliverySearchResolver } from '@acoustic-content-sdk/component-api';
import { RenderingContextInput } from '@acoustic-content-sdk/component-api';
import { RenderingContextProviderV2 } from '@acoustic-content-sdk/api';
import { RenderingContextResolver } from '@acoustic-content-sdk/component-api';
import { RenderingContextV2 } from '@acoustic-content-sdk/api';
import { RouteComponentProps } from 'react-router';
import { SeedResolver } from '@acoustic-content-sdk/component-api';
import { UrlConfig } from '@acoustic-content-sdk/api';
import { WchPageService } from '@acoustic-content-sdk/component-api';
import { WindowType } from '@acoustic-content-sdk/component-api';

// @public
export const ACOUSTIC_CONTEXT_API_URL: Required<import("react").Context<HubInfoUrlProvider>>;

// @public
export const ACOUSTIC_CONTEXT_AUTH_STATUS: Required<import("react").Context<AuthStatus>>;

// @public
export const ACOUSTIC_CONTEXT_BASE_URL: Required<import("react").Context<HubInfoUrlProvider>>;

// @public (undocumented)
export const ACOUSTIC_CONTEXT_COMPONENT_REGISTRY: Required<import("react").Context<ComponentRegistry>>;

// @public (undocumented)
export const ACOUSTIC_CONTEXT_COMPONENT_RESOLVER: Required<import("react").Context<ComponentResolver>>;

// @public
export const ACOUSTIC_CONTEXT_COMPONENT_TYPE_REF_RESOLVERS: Required<import("react").Context<ComponentTypeRefResolver[]>>;

// @public
export const ACOUSTIC_CONTEXT_CONTENT_COMPONENT: Required<import("react").Context<import("../../type/type.ref").ReactComponent<ContentComponentProps, any>>>;

// @public
export const ACOUSTIC_CONTEXT_DEFAULT_COMPONENT: Required<import("react").Context<import("../../type/type.ref").ReactComponent<ReactComponentProps, any>>>;

// @public
export const ACOUSTIC_CONTEXT_DELIVERY_CONTENT_RESOLVER: Required<import("react").Context<DeliveryContentResolver>>;

// @public
export const ACOUSTIC_CONTEXT_DELIVERY_CONTENT_SEED: Required<import("react").Context<string>>;

// @public
export const ACOUSTIC_CONTEXT_DELIVERY_LAYOUT_MAPPING_RESOLVER: Required<import("react").Context<DeliveryLayoutMappingResolver>>;

// @public
export const ACOUSTIC_CONTEXT_DELIVERY_LAYOUT_MAPPING_SEED: Required<import("react").Context<string>>;

// @public
export const ACOUSTIC_CONTEXT_DELIVERY_LAYOUT_RESOLVER: Required<import("react").Context<DeliveryLayoutResolver>>;

// @public
export const ACOUSTIC_CONTEXT_DELIVERY_LAYOUT_SEED: Required<import("react").Context<string>>;

// @public
export const ACOUSTIC_CONTEXT_DELIVERY_PAGE_RESOLVER: Required<import("react").Context<DeliveryPageResolver>>;

// @public
export const ACOUSTIC_CONTEXT_DELIVERY_PAGE_SEED: Required<import("react").Context<string>>;

// @public
export const ACOUSTIC_CONTEXT_DELIVERY_SEARCH_RESOLVER: Required<import("react").Context<DeliverySearchResolver>>;

// @public
export const ACOUSTIC_CONTEXT_DELIVERY_SITE_RESOLVER: Required<import("react").Context<DeliverySiteResolver>>;

// @public
export const ACOUSTIC_CONTEXT_DELIVERY_TYPE_RESOLVER: Required<import("react").Context<DeliveryTypeResolver>>;

// @public
export const ACOUSTIC_CONTEXT_DELIVERY_TYPE_SEED: Required<import("react").Context<string>>;

// @public (undocumented)
export const ACOUSTIC_CONTEXT_DYNAMIC_LOGGER_FACTORY: Required<import("react").Context<DynamicLoggerFactory>>;

// @public
export const ACOUSTIC_CONTEXT_HANDLEBARS_RESOLVER: Required<import("react").Context<HandlebarsResolver>>;

// @public
export const ACOUSTIC_CONTEXT_LAYOUT_MAPPING_RESOLVER: Required<import("react").Context<LayoutMappingResolver>>;

// @public
export const ACOUSTIC_CONTEXT_LAYOUT_RESOLVER: Required<import("react").Context<LayoutResolver>>;

// @public (undocumented)
export const ACOUSTIC_CONTEXT_LOGGER_FACTORY: Required<import("react").Context<LoggerFactory>>;

// @public (undocumented)
export const ACOUSTIC_CONTEXT_LOGGER_SERVICE: Required<import("react").Context<LoggerService>>;

// @public
export const ACOUSTIC_CONTEXT_PAGE_COMPONENT: Required<import("react").Context<import("../../type/type.ref").ReactComponent<RouteComponentProps<{}, import("react-router").StaticContext, {}>, any>>>;

// @public
export const ACOUSTIC_CONTEXT_PAGE_SERVICE: Required<import("react").Context<ReactWchPageService>>;

// @public
export const ACOUSTIC_CONTEXT_PROTECTED_CONTENT: Required<import("react").Context<ProtectedContent>>;

// @public
export const ACOUSTIC_CONTEXT_RECONCILED_DELIVERY_SEARCH_RESOLVER: Required<import("react").Context<ReconciledDeliverySearchResolver>>;

// @public
export const ACOUSTIC_CONTEXT_RENDERING_CONTEXT_PROVIDER: Required<import("react").Context<RenderingContextProviderV2>>;

// @public
export const ACOUSTIC_CONTEXT_RENDERING_CONTEXT_RESOLVER: Required<import("react").Context<RenderingContextResolver>>;

// @public
export const ACOUSTIC_CONTEXT_RESOURCE_URL: Required<import("react").Context<HubInfoUrlProvider>>;

// @public
export const ACOUSTIC_CONTEXT_SEED_RESOLVER: Required<import("react").Context<SeedResolver>>;

// @public
export const ACOUSTIC_CONTEXT_URL_CONFIG: Required<import("react").Context<Observable<UrlConfig>>>;

// @public
export const ACOUSTIC_CONTEXT_WINDOW: Required<import("react").Context<WindowType>>;

// @public (undocumented)
export const ACOUSTIC_RC_INTERCEPTOR_TOKEN = "8453750A-4519-4184-840B-D490E909D23E";

// @public
export function assertProvider<T>(aValue: T, aContext: Context<T>, aParentContext?: Context<any>): NonNullable<T>;

// @public (undocumented)
export interface ComponentRegistry extends AbstractComponentsRegistry<ComponentTypeRef> {
    registerType(aController: string | string[], aType: ComponentTypeRef, aLayoutModes?: string | string[]): void;
    registerType(aType: ComponentTypeRef): void;
}

// @public (undocumented)
export interface ComponentResolver extends AbstractComponentResolver<ComponentTypeRef> {
    // (undocumented)
    resolveComponent(aRenderingContext: RenderingContextV2, aLayoutMode?: string): Observable<ComponentTypeRef>;
}

// @public
export type ComponentTypeRef<P = ReactComponentProps> = ReactComponent<P>;

// @public
export interface ComponentTypeRefResolver extends AbstractComponentTypeRefResolver<ComponentTypeRef> {
    getTypeByLayout: (aLayout: Layout, aLayoutMode?: string) => Observable<ComponentTypeRef>;
}

// @public (undocumented)
export interface ContentComponentProps {
    ctx?: RenderingContextInput;
    [KEY_ID]?: string;
    [KEY_LAYOUT_MODE]?: string;
}

// @public
export const createDynamicReactProvider: DynamicReactProviderFactory;

// @public
export const createInjectableReactProvider: InjectableReactProviderFactory;

// @public
export const createModuleFromProvider: (aProviders: ReactProvider<any>[]) => import("../public_api").ReactComponent<ReactModuleProps, any>;

// @public
export function createReactContext<T>(aName: string, aDefault?: T): Required<Context<T>>;

// @public
export function createReactProvider<T>(module: ReactModuleType, provides: Context<T>, dependencies?: Context<any>[], optionalDependencies?: Context<any>[]): ReactProvider<T>;

// @public (undocumented)
export interface DynamicReactProviderFactory {
    // (undocumented)
    <T>(fct: (req?: never, opt?: never) => ObservableInput<T>, ctx: Context<T>): ReactProvider<T>;
    // (undocumented)
    <R1, T>(fct: (req: [R1], opt?: never) => ObservableInput<T>, ctx: Context<T>, req: [Context<R1>]): ReactProvider<T>;
    // (undocumented)
    <R1, R2, T>(fct: (req: [R1, R2], opt?: never) => ObservableInput<T>, ctx: Context<T>, req: [Context<R1>, Context<R2>]): ReactProvider<T>;
    // (undocumented)
    <R1, R2, R3, T>(fct: (req: [R1, R2, R3], opt?: never) => ObservableInput<T>, ctx: Context<T>, req: [Context<R1>, Context<R2>, Context<R3>]): ReactProvider<T>;
    // (undocumented)
    <R1, R2, R3, R4, T>(fct: (req: [R1, R2, R3, R4], opt?: never) => ObservableInput<T>, ctx: Context<T>, req: [Context<R1>, Context<R2>, Context<R3>, Context<R4>]): ReactProvider<T>;
    // (undocumented)
    <O1, T>(fct: (req: never, opt: [O1?]) => ObservableInput<T>, ctx: Context<T>, req: never, opt: [Context<O1>]): ReactProvider<T>;
    // (undocumented)
    <O1, O2, T>(fct: (req: never, opt: [O1?, O2?]) => ObservableInput<T>, ctx: Context<T>, req: never, opt: [Context<O1>, Context<O2>]): ReactProvider<T>;
    // (undocumented)
    <O1, O2, O3, T>(fct: (req: never, opt: [O1?, O2?, O3?]) => ObservableInput<T>, ctx: Context<T>, req: never, opt: [Context<O1>, Context<O2>, Context<O3>]): ReactProvider<T>;
    // (undocumented)
    <O1, T>(fct: (req: [], opt: [O1?]) => ObservableInput<T>, ctx: Context<T>, req: [], opt: [Context<O1>]): ReactProvider<T>;
    // (undocumented)
    <O1, O2, T>(fct: (req: [], opt: [O1?, O2?]) => ObservableInput<T>, ctx: Context<T>, req: [], opt: [Context<O1>, Context<O2>]): ReactProvider<T>;
    // (undocumented)
    <O1, O2, O3, T>(fct: (req: [], opt: [O1?, O2?, O3?]) => ObservableInput<T>, ctx: Context<T>, req: [], opt: [Context<O1>, Context<O2>, Context<O3>]): ReactProvider<T>;
    // (undocumented)
    <R1, O1, T>(fct: (req: [R1], opt: [O1?]) => ObservableInput<T>, ctx: Context<T>, req: [Context<R1>], opt: [Context<O1>]): ReactProvider<T>;
    // (undocumented)
    <R1, O1, O2, T>(fct: (req: [R1], opt: [O1?, O2?]) => ObservableInput<T>, ctx: Context<T>, req: [Context<R1>], opt: [Context<O1>, Context<O2>]): ReactProvider<T>;
    // (undocumented)
    <R1, R2, O1, T>(fct: (req: [R1, R2], opt: [O1?]) => ObservableInput<T>, ctx: Context<T>, req: [Context<R1>, Context<R2>], opt: [Context<O1>]): ReactProvider<T>;
    // (undocumented)
    <R1, R2, O1, O2, T>(fct: (req: [R1, R2], opt: [O1?, O2?]) => ObservableInput<T>, ctx: Context<T>, req: [Context<R1>, Context<R2>], opt: [Context<O1>, Context<O2>]): ReactProvider<T>;
    // (undocumented)
    <R1, R2, R3, O1, T>(fct: (req: [R1, R2, R3], opt: [O1?]) => ObservableInput<T>, ctx: Context<T>, req: [Context<R1>, Context<R2>, Context<R3>], opt: [Context<O1>]): ReactProvider<T>;
    // (undocumented)
    <R1, R2, R3, O1, O2, T>(fct: (req: [R1, R2, R3], opt: [O1?, O2?]) => ObservableInput<T>, ctx: Context<T>, req: [Context<R1>, Context<R2>, Context<R3>], opt: [Context<O1>, Context<O2>]): ReactProvider<T>;
    // (undocumented)
    <R1, R2, R3, R4, O1, T>(fct: (req: [R1, R2, R3, R4], opt: [O1?]) => ObservableInput<T>, ctx: Context<T>, req: [Context<R1>, Context<R2>, Context<R3>, Context<R4>], opt: [Context<O1>]): ReactProvider<T>;
    // (undocumented)
    <R1, R2, R3, R4, R5, O1, T>(fct: (req: [R1, R2, R3, R4, R5], opt: [O1?]) => ObservableInput<T>, ctx: Context<T>, req: [Context<R1>, Context<R2>, Context<R3>, Context<R4>, Context<R5>], opt: [Context<O1>]): ReactProvider<T>;
    // (undocumented)
    <R1, R2, R3, R4, R5, R6, O1, T>(fct: (req: [R1, R2, R3, R4, R5, R6], opt: [O1?]) => ObservableInput<T>, ctx: Context<T>, req: [Context<R1>, Context<R2>, Context<R3>, Context<R4>, Context<R5>, Context<R6>], opt: [Context<O1>]): ReactProvider<T>;
    // (undocumented)
    <R1, R2, R3, R4, R5, R6, R7, O1, T>(fct: (req: [R1, R2, R3, R4, R5, R6, R7], opt: [O1?]) => ObservableInput<T>, ctx: Context<T>, req: [Context<R1>, Context<R2>, Context<R3>, Context<R4>, Context<R5>, Context<R6>, Context<R7>], opt: [Context<O1>]): ReactProvider<T>;
}

// @public (undocumented)
export interface InjectableReactProviderFactory {
    // (undocumented)
    <T>(fct: (req?: never, opt?: never) => T, ctx: Context<T>): ReactProvider<T>;
    // (undocumented)
    <R1, T>(fct: (req: [R1], opt?: never) => T, ctx: Context<T>, req: [Context<R1>]): ReactProvider<T>;
    // (undocumented)
    <R1, R2, T>(fct: (req: [R1, R2], opt?: never) => T, ctx: Context<T>, req: [Context<R1>, Context<R2>]): ReactProvider<T>;
    // (undocumented)
    <R1, R2, R3, T>(fct: (req: [R1, R2, R3], opt?: never) => T, ctx: Context<T>, req: [Context<R1>, Context<R2>, Context<R3>]): ReactProvider<T>;
    // (undocumented)
    <R1, R2, R3, R4, T>(fct: (req: [R1, R2, R3, R4], opt?: never) => T, ctx: Context<T>, req: [Context<R1>, Context<R2>, Context<R3>, Context<R4>]): ReactProvider<T>;
    // (undocumented)
    <O1, T>(fct: (req: never, opt: [O1?]) => T, ctx: Context<T>, req: never, opt: [Context<O1>]): ReactProvider<T>;
    // (undocumented)
    <O1, O2, T>(fct: (req: never, opt: [O1?, O2?]) => T, ctx: Context<T>, req: never, opt: [Context<O1>, Context<O2>]): ReactProvider<T>;
    // (undocumented)
    <O1, O2, O3, T>(fct: (req: never, opt: [O1?, O2?, O3?]) => T, ctx: Context<T>, req: never, opt: [Context<O1>, Context<O2>, Context<O3>]): ReactProvider<T>;
    // (undocumented)
    <O1, T>(fct: (req: [], opt: [O1?]) => T, ctx: Context<T>, req: [], opt: [Context<O1>]): ReactProvider<T>;
    // (undocumented)
    <O1, O2, T>(fct: (req: [], opt: [O1?, O2?]) => T, ctx: Context<T>, req: [], opt: [Context<O1>, Context<O2>]): ReactProvider<T>;
    // (undocumented)
    <O1, O2, O3, T>(fct: (req: [], opt: [O1?, O2?, O3?]) => T, ctx: Context<T>, req: [], opt: [Context<O1>, Context<O2>, Context<O3>]): ReactProvider<T>;
    // (undocumented)
    <R1, O1, T>(fct: (req: [R1], opt: [O1?]) => T, ctx: Context<T>, req: [Context<R1>], opt: [Context<O1>]): ReactProvider<T>;
    // (undocumented)
    <R1, O1, O2, T>(fct: (req: [R1], opt: [O1?, O2?]) => T, ctx: Context<T>, req: [Context<R1>], opt: [Context<O1>, Context<O2>]): ReactProvider<T>;
    // (undocumented)
    <R1, R2, O1, T>(fct: (req: [R1, R2], opt: [O1?]) => T, ctx: Context<T>, req: [Context<R1>, Context<R2>], opt: [Context<O1>]): ReactProvider<T>;
    // (undocumented)
    <R1, R2, O1, O2, T>(fct: (req: [R1, R2], opt: [O1?, O2?]) => T, ctx: Context<T>, req: [Context<R1>, Context<R2>], opt: [Context<O1>, Context<O2>]): ReactProvider<T>;
    // (undocumented)
    <R1, R2, R3, O1, T>(fct: (req: [R1, R2, R3], opt: [O1?]) => T, ctx: Context<T>, req: [Context<R1>, Context<R2>, Context<R3>], opt: [Context<O1>]): ReactProvider<T>;
    // (undocumented)
    <R1, R2, R3, O1, O2, T>(fct: (req: [R1, R2, R3], opt: [O1?, O2?]) => T, ctx: Context<T>, req: [Context<R1>, Context<R2>, Context<R3>], opt: [Context<O1>, Context<O2>]): ReactProvider<T>;
    // (undocumented)
    <R1, R2, R3, R4, O1, T>(fct: (req: [R1, R2, R3, R4], opt: [O1?]) => T, ctx: Context<T>, req: [Context<R1>, Context<R2>, Context<R3>, Context<R4>], opt: [Context<O1>]): ReactProvider<T>;
    // (undocumented)
    <R1, R2, R3, R4, R5, O1, T>(fct: (req: [R1, R2, R3, R4, R5], opt: [O1?]) => T, ctx: Context<T>, req: [Context<R1>, Context<R2>, Context<R3>, Context<R4>, Context<R5>], opt: [Context<O1>]): ReactProvider<T>;
    // (undocumented)
    <R1, R2, R3, R4, R5, R6, O1, T>(fct: (req: [R1, R2, R3, R4, R5, R6], opt: [O1?]) => T, ctx: Context<T>, req: [Context<R1>, Context<R2>, Context<R3>, Context<R4>, Context<R5>, Context<R6>], opt: [Context<O1>]): ReactProvider<T>;
}

// @public
export type ReactComponent<P = ReactComponentProps, DS = any> = FunctionComponent<P> | ComponentClass<P, DS>;

// @public
export interface ReactComponentProps {
    [KEY_LAYOUT_MODE]?: string;
    [KEY_RENDERING_CONTEXT]: RenderingContextV2;
}

// @public
export type ReactModule = ReactComponent<ReactModuleProps>;

// @public
export interface ReactModuleProps {
    // (undocumented)
    children?: ReactNode;
}

// @public
export type ReactModuleType = ReactModule;

// @public
export interface ReactProvider<T> {
    dependencies?: Context<any>[];
    module: ReactModuleType;
    optionalDependencies?: Context<any>[];
    provides: Context<T>;
}

// @public
export interface ReactWchPageService extends WchPageService {
    getRenderingContextByActivatedRoute(aRoute: RouteComponentProps): Observable<RenderingContextV2 | null | undefined>;
}

// @public
export const selectDisplayName: (aCtx: Context<any>) => string;

// @public
export const VERSION: {
    version: {
        major: string;
        minor: string;
        patch: string;
    };
    build: Date;
};

// @public @deprecated (undocumented)
export const WCH_CONTEXT_API_URL: Required<import("react").Context<import("@acoustic-content-sdk/api").HubInfoUrlProvider>>;

// @public @deprecated (undocumented)
export const WCH_CONTEXT_AUTH_STATUS: Required<import("react").Context<import("@acoustic-content-sdk/api").AuthStatus>>;

// @public @deprecated (undocumented)
export const WCH_CONTEXT_BASE_URL: Required<import("react").Context<import("@acoustic-content-sdk/api").HubInfoUrlProvider>>;

// @public @deprecated (undocumented)
export const WCH_CONTEXT_COMPONENT_REGISTRY: Required<import("react").Context<import("./component/component.registry").ComponentRegistry>>;

// @public @deprecated (undocumented)
export const WCH_CONTEXT_COMPONENT_RESOLVER: Required<import("react").Context<import("./component/component.resolver").ComponentResolver>>;

// @public @deprecated (undocumented)
export const WCH_CONTEXT_COMPONENT_TYPE_REF_RESOLVERS: Required<import("react").Context<import("./type/type.ref.resolver").ComponentTypeRefResolver[]>>;

// @public @deprecated (undocumented)
export const WCH_CONTEXT_CONTENT_COMPONENT: Required<import("react").Context<import("./public_api").ReactComponent<import("./component/content/content.component").ContentComponentProps, any>>>;

// @public @deprecated (undocumented)
export const WCH_CONTEXT_DEFAULT_COMPONENT: Required<import("react").Context<import("./public_api").ReactComponent<import("./public_api").ReactComponentProps, any>>>;

// @public @deprecated (undocumented)
export const WCH_CONTEXT_DELIVERY_CONTENT_RESOLVER: Required<import("react").Context<import("@acoustic-content-sdk/component-api").DeliveryContentResolver>>;

// @public @deprecated (undocumented)
export const WCH_CONTEXT_DELIVERY_CONTENT_SEED: Required<import("react").Context<string>>;

// @public @deprecated (undocumented)
export const WCH_CONTEXT_DELIVERY_LAYOUT_MAPPING_RESOLVER: Required<import("react").Context<import("@acoustic-content-sdk/component-api").DeliveryLayoutMappingResolver>>;

// @public @deprecated (undocumented)
export const WCH_CONTEXT_DELIVERY_LAYOUT_MAPPING_SEED: Required<import("react").Context<string>>;

// @public @deprecated (undocumented)
export const WCH_CONTEXT_DELIVERY_LAYOUT_RESOLVER: Required<import("react").Context<import("@acoustic-content-sdk/component-api").DeliveryLayoutResolver>>;

// @public @deprecated (undocumented)
export const WCH_CONTEXT_DELIVERY_LAYOUT_SEED: Required<import("react").Context<string>>;

// @public @deprecated (undocumented)
export const WCH_CONTEXT_DELIVERY_PAGE_RESOLVER: Required<import("react").Context<import("@acoustic-content-sdk/component-api").DeliveryPageResolver>>;

// @public @deprecated (undocumented)
export const WCH_CONTEXT_DELIVERY_PAGE_SEED: Required<import("react").Context<string>>;

// @public @deprecated (undocumented)
export const WCH_CONTEXT_DELIVERY_SEARCH_RESOLVER: Required<import("react").Context<import("@acoustic-content-sdk/component-api").DeliverySearchResolver>>;

// @public @deprecated (undocumented)
export const WCH_CONTEXT_DELIVERY_SITE_RESOLVER: Required<import("react").Context<import("@acoustic-content-sdk/component-api").DeliverySiteResolver>>;

// @public @deprecated (undocumented)
export const WCH_CONTEXT_DELIVERY_TYPE_RESOLVER: Required<import("react").Context<import("@acoustic-content-sdk/component-api").DeliveryTypeResolver>>;

// @public @deprecated (undocumented)
export const WCH_CONTEXT_DELIVERY_TYPE_SEED: Required<import("react").Context<string>>;

// @public @deprecated (undocumented)
export const WCH_CONTEXT_DYNAMIC_LOGGER_FACTORY: Required<import("react").Context<import("@acoustic-content-sdk/api").DynamicLoggerFactory>>;

// @public @deprecated (undocumented)
export const WCH_CONTEXT_HANDLEBARS_RESOLVER: Required<import("react").Context<import("@acoustic-content-sdk/component-api").HandlebarsResolver>>;

// @public @deprecated (undocumented)
export const WCH_CONTEXT_LAYOUT_MAPPING_RESOLVER: Required<import("react").Context<import("@acoustic-content-sdk/component-api").LayoutMappingResolver>>;

// @public @deprecated (undocumented)
export const WCH_CONTEXT_LAYOUT_RESOLVER: Required<import("react").Context<import("@acoustic-content-sdk/component-api").LayoutResolver>>;

// @public @deprecated (undocumented)
export const WCH_CONTEXT_LOGGER_FACTORY: Required<import("react").Context<import("@acoustic-content-sdk/api").LoggerFactory>>;

// @public @deprecated (undocumented)
export const WCH_CONTEXT_LOGGER_SERVICE: Required<import("react").Context<import("@acoustic-content-sdk/api").LoggerService>>;

// @public @deprecated (undocumented)
export const WCH_CONTEXT_PAGE_COMPONENT: Required<import("react").Context<import("./public_api").ReactComponent<import("react-router").RouteComponentProps<{}, import("react-router").StaticContext, {}>, any>>>;

// @public @deprecated (undocumented)
export const WCH_CONTEXT_PAGE_SERVICE: Required<import("react").Context<import("./services/page/wch.page.service").ReactWchPageService>>;

// @public @deprecated (undocumented)
export const WCH_CONTEXT_PROTECTED_CONTENT: Required<import("react").Context<import("@acoustic-content-sdk/component-api").ProtectedContent>>;

// @public @deprecated (undocumented)
export const WCH_CONTEXT_RECONCILED_DELIVERY_SEARCH_RESOLVER: Required<import("react").Context<import("@acoustic-content-sdk/component-api").ReconciledDeliverySearchResolver>>;

// @public @deprecated (undocumented)
export const WCH_CONTEXT_RENDERING_CONTEXT_PROVIDER: Required<import("react").Context<import("@acoustic-content-sdk/api").RenderingContextProviderV2>>;

// @public @deprecated (undocumented)
export const WCH_CONTEXT_RENDERING_CONTEXT_RESOLVER: Required<import("react").Context<import("@acoustic-content-sdk/component-api").RenderingContextResolver>>;

// @public @deprecated (undocumented)
export const WCH_CONTEXT_RESOURCE_URL: Required<import("react").Context<import("@acoustic-content-sdk/api").HubInfoUrlProvider>>;

// @public @deprecated (undocumented)
export const WCH_CONTEXT_SEED_RESOLVER: Required<import("react").Context<import("@acoustic-content-sdk/component-api").SeedResolver>>;

// @public @deprecated (undocumented)
export const WCH_CONTEXT_URL_CONFIG: Required<import("react").Context<import("rxjs").Observable<import("@acoustic-content-sdk/api").UrlConfig>>>;

// @public @deprecated (undocumented)
export const WCH_CONTEXT_WINDOW: Required<import("react").Context<import("@acoustic-content-sdk/component-api").WindowType>>;


```
