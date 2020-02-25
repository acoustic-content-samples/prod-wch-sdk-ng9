import {
  arrayPush,
  cmpStrings,
  filterArray,
  forEach,
  isNil,
  isNotEmpty,
  isNotNil,
  mapArray,
  reduceArray
} from '@acoustic-content-sdk/utils';
import { Context, createElement, FC, ReactElement } from 'react';

import { selectDisplayName } from '../utils/context';
import { ReactModule, ReactModuleProps } from './module';

/**
 * Type definition for the react component for a module
 */
export type ReactModuleType = ReactModule;

/**
 * Declares a react provider. The provider declares the provided
 * context and its dependencies.
 *
 * Refer to https://reactjs.org/docs/context.html
 */
export interface ReactProvider<T> {
  /**
   * React component that implements the provider. The component
   * consumes the dependencies and the optional dependencies
   * and provides the specified context.
   */
  module: ReactModuleType;
  /**
   * Provided context
   */
  provides: Context<T>;
  /**
   * Required contexts, will be consumed when the module gets instantiated
   */
  dependencies?: Context<any>[];
  /**
   * optional contexts
   */
  optionalDependencies?: Context<any>[];
}

/**
 * Constructs an instance of a provider
 *
 * @param module - the module
 * @param provides - the context the module provides
 * @param dependencies - dependencies
 * @param optionalDependencies - optional dependencies
 *
 * @returns the provider instance
 */
export function createReactProvider<T>(
  module: ReactModuleType,
  provides: Context<T>,
  dependencies?: Context<any>[],
  optionalDependencies?: Context<any>[]
): ReactProvider<T> {
  return { module, provides, dependencies, optionalDependencies };
}

declare type Edges<K, V> = (aValue: V) => K[];
declare type Value<K, V> = (aKey: K) => V;

function internalTopoSort<K, V>(
  aDst: V[],
  aKey: K,
  aNodes: Value<K, V>,
  aEdges: Edges<K, V>,
  aCycle: Set<K>
) {
  // tests for cycles
  if (!aCycle.has(aKey)) {
    // register
    aCycle.add(aKey);
    // get the outbound edges
    const value = aNodes(aKey);
    if (isNotNil(value)) {
      // get the edges
      const edges = aEdges(value);
      if (isNotEmpty(edges)) {
        // iterate
        topoSort(aDst, edges, aNodes, aEdges, aCycle);
      }
      // register this node
      arrayPush(value, aDst);
    }
  }
}

function topoSort<K, V>(
  aDst: V[],
  aKeys: K[],
  aNodes: Value<K, V>,
  aEdges: Edges<K, V>,
  aCycle: Set<K>
) {
  // iterate over the keys
  forEach(aKeys, (aKey) =>
    internalTopoSort(aDst, aKey, aNodes, aEdges, aCycle)
  );
}

const createModule = (
  aChildren: ReactElement,
  aProvider: ReactProvider<any>
): ReactElement => createElement(aProvider.module, null, aChildren);

/**
 * Constructs a module from a topological list of providers
 *
 * @param aProviders - the topological list
 * @returns the component
 */
function createProviderModule(
  aProviders: ReactProvider<any>[]
): FC<ReactModuleProps> {
  // do not mutate
  const providers = [...aProviders];
  const top = providers.shift();
  // construct the component tree
  return ({ children }) =>
    reduceArray(
      providers,
      createModule,
      createElement(top.module, null, children)
    );
}

/**
 * Compare the contexts by display name
 *
 * @param aLeft  - left context
 * @param aRight - right context
 * @returns the comparison result
 */
const compareByContext = (aLeft: Context<any>, aRight: Context<any>): number =>
  cmpStrings(selectDisplayName(aLeft), selectDisplayName(aRight));

/**
 * Compare the providers by display name
 *
 * @param aLeft  - left provider
 * @param aRight - right provider
 * @returns the comparison result
 */
const compareByProvider = (
  aLeft: ReactProvider<any>,
  aRight: ReactProvider<any>
): number => compareByContext(aLeft.provides, aRight.provides);

/**
 * Sort the providers by display name of the contexts they provide, so we
 * produce a reproducible topological sort
 *
 * @param aProviders - the providers
 * @returns the sorted list
 */
const createLexicalSort = (
  aProviders: Iterable<ReactProvider<any>>
): ReactProvider<any>[] => [...aProviders].sort(compareByProvider);

/**
 * Returns the outbound dependencies of a provider. The result
 * is sorted, so we have a reproducible graph
 *
 * @param aProvider - the provider
 * @returns the dependencies
 */
function getEdges({
  dependencies = [],
  optionalDependencies = []
}: ReactProvider<any>): Context<any>[] {
  // merge
  return [...dependencies, ...optionalDependencies].sort(compareByContext);
}

/**
 * Creates a topological sort of the providers
 *
 * @param aProviders - the providers
 * @returns the sorted list
 */
function createTopologicalOrder(
  aProviders: ArrayLike<ReactProvider<any>>
): ReactProvider<any>[] {
  // organize the providers as a map
  const registry = reduceArray<
    ReactProvider<any>,
    Map<Context<any>, ReactProvider<any>>
  >(
    aProviders,
    (aDst, aProvider) => aDst.set(aProvider.provides, aProvider),
    new Map()
  );
  // get all entry nodes
  const nodes = mapArray(aProviders, (aProvider) => aProvider.provides);
  // callback to get the provider from a key
  const getProvider = (aCtx: Context<any>) => registry.get(aCtx);
  // result
  const result: ReactProvider<any>[] = [];
  topoSort(result, nodes, getProvider, getEdges, new Set());
  // ok
  return result.reverse();
}

const reduceContext = (aRes: boolean, aCtx: Context<any>): boolean =>
  aRes && isNotNil(aCtx);

/**
 * Checks if the dependency array is value
 *
 * @param aDeps - the array
 * @returns true if the array is null or valid
 */
const isValidDependencies = (aDeps?: Context<any>[]) =>
  reduceArray(aDeps, reduceContext, true);

/**
 * Tests if a provider is value
 *
 * @param aProvider - the provider to test
 * @returns true if the provider is valid, else false
 */
const isValidProvider = (aProvider: ReactProvider<any>): boolean => {
  // check the provider itself
  if (isNil(aProvider)) {
    // tslint:disable-next-line: no-console
    console.warn('Provider is nil.');
    return false;
  }
  // decompose
  const { module, provides, dependencies, optionalDependencies } = aProvider;
  if (isNil(module)) {
    // tslint:disable-next-line: no-console
    console.warn('Module is nil.', aProvider);
    return false;
  }
  if (isNil(provides)) {
    // tslint:disable-next-line: no-console
    console.warn('Provided context is nil.', aProvider);
    return false;
  }
  if (!isValidDependencies(dependencies)) {
    // tslint:disable-next-line: no-console
    console.warn(
      'Dependencies array is invalid.',
      selectDisplayName(provides),
      dependencies
    );
    return false;
  }
  if (!isValidDependencies(optionalDependencies)) {
    // tslint:disable-next-line: no-console
    console.warn(
      'Optional dependencies array is invalid.',
      selectDisplayName(provides),
      optionalDependencies
    );
    return false;
  }
  // ok
  return true;
};

/**
 * Validate that the providers are valid
 *
 * @param aProviders - the react providers
 *
 * @returns the valid providers
 */
const validProviders = (aProviders: ReactProvider<any>[]) =>
  filterArray(aProviders, isValidProvider);

/**
 * Constructs a module component that includes the referenced
 * providers in topological order
 *
 * @param aProviders - the set of providers
 * @returns the component
 */
export const createModuleFromProvider = (
  aProviders: ReactProvider<any>[]
): ReactModule =>
  createProviderModule(
    createTopologicalOrder(
      createLexicalSort(new Set(validProviders(aProviders)))
    )
  );
