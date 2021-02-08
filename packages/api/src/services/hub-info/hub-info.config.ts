import { ObservableInput } from 'rxjs';

export interface HttpResourceOptions {
  readonly pollTimeVariation?: number;
  readonly pollTime?: number;
  readonly retries?: number;
  /**
   * Optionally enable pre-loading from local storage, default is true
   */
  readonly useLocalStorage?: boolean;
  /**
   * Optionally enable pre-loading from bootstrap, default is true
   */
  readonly useBootstrap?: boolean;
  /**
   * Optionally enable use of static resources, default is true
   */
  readonly useStaticResources?: boolean;
  /**
   * Optionally use REST to load resources, default is true
   */
  readonly useApi?: boolean;
  /**
   * Configure if we should use XHR or JSONp
   */
  readonly useJsonP?: boolean;
  /**
   * Configure if we should use polling at all, default is true
   */
  readonly usePolling?: boolean;
}

/* Copyright Acoustic 2021 */

/**
 * Defines the provider of a URL, either as a URL, a string or a callback that generates either
 */
export type StaticHubInfoUrlProvider =
  | null
  | undefined
  | URL
  | string
  | (() => StaticHubInfoUrlProvider);

export type HubInfoUrlProvider =
  | null
  | undefined
  | StaticHubInfoUrlProvider
  | ObservableInput<StaticHubInfoUrlProvider>;

/**
 * Cycle handling strategy
 */
export enum CYCLE_HANDLING {
  /**
   * Stop rendering contexts at detected cycles
   */
  BREAK,
  /**
   * Resolve cycles by building cyclic in-memory structures
   */
  RESOLVE
}

/**
 * Base class for services providing hub information. We need a base class to be able to
 * specify  this service as injectable
 */
export interface HubInfoConfig {
  /**
   * URL to access the API layer
   *
   * Naming of this field according to the field in the rendering context
   *
   * @example 'https://content-us-1.content-cms.com/api/345563cf-a83c-40e5-a065-1d6ff36b05c1'
   * @example 'https://content-us-1.content-cms.com/api/345563cf-a83c-40e5-a065-1d6ff36b05c1/dxsites/mysite'
   */
  readonly apiUrl?: HubInfoUrlProvider;

  /**
   * URL to access the delivery
   *
   * Naming of this field according to the field in the rendering context
   *
   * @example 'https://content-us-1.content-cms.com/345563cf-a83c-40e5-a065-1d6ff36b05c1'
   * @example 'https://content-us-1.content-cms.com/345563cf-a83c-40e5-a065-1d6ff36b05c1/dxsites/mysite'
   */
  readonly resourceUrl?: HubInfoUrlProvider;

  /**
   * URL that represents the base URL of the path based routing of the application. This prefix will be
   * preserved when generating and recognizing URLs. If this property is not configured, then it will be decoded
   * from the window location.
   *
   * @example 'https://content-us-1.content-cms.com/345563cf-a83c-40e5-a065-1d6ff36b05c1'
   * @example 'https://content-us-1.content-cms.com/345563cf-a83c-40e5-a065-1d6ff36b05c1/dxsites/mysite'
   * @example 'https://my.external.example.com/'
   */
  readonly baseUrl?: HubInfoUrlProvider;

  /**
   * Optionally specify how the SDK makes outbound requests
   */
  readonly httpOptions?: HttpResourceOptions;

  /**
   * Optionally specify how the SDK makes outbound requests for the preview case
   */
  readonly httpPreviewOptions?: HttpResourceOptions;

  /**
   * Optionally specify how the SDK is supposed to deal with
   * cyclic references in the content data structure. Per default
   * the rendering context will break cycles by representing the duplicate
   * element in a reference path by an unresolved reference. When configuring
   * the strategy to {@link CYCLE_HANDLING}.RESOLVE, the ContentrefComponent
   * will use a resolved refence when rendering the context, instead of the unresolved
   * reference. This bears the risk of an infinite loop during rendering. The
   * actual rendering context objects will still not have cycles, so a JSON serialization
   * of these objects will produce a valid result.
   *
   * Default is {@link CYCLE_HANDLING}.BREAK
   */
  readonly cycleHandlingStrategy?: CYCLE_HANDLING | string;

  /**
   * Number of levels to fetch per request to the rendering context. If missing
   * all levels will be fetched.
   */
  readonly fetchLevels?: number;
}
