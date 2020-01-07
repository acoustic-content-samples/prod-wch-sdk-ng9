import { LoggerService } from '@acoustic-content-sdk/api';
import {
  LayoutMappingResolver,
  LayoutResolver
} from '@acoustic-content-sdk/component-api';
import {
  ComponentRegistry,
  ComponentTypeRefResolver,
  createInjectableReactProvider,
  WCH_CONTEXT_COMPONENT_REGISTRY,
  WCH_CONTEXT_COMPONENT_RESOLVER,
  WCH_CONTEXT_COMPONENT_TYPE_REF_RESOLVERS,
  WCH_CONTEXT_LAYOUT_MAPPING_RESOLVER,
  WCH_CONTEXT_LAYOUT_RESOLVER,
  WCH_CONTEXT_LOGGER_SERVICE
} from '@acoustic-content-sdk/react-api';

import { ReactComponentResolverService } from './component.resolver.service';

const createComponentResolver = (
  [cmpReg, layoutResolver, layoutMappingResolver]: [
    ComponentRegistry,
    LayoutResolver,
    LayoutMappingResolver
  ],
  [cmpTypeResolvers, logSvc]: [ComponentTypeRefResolver[]?, LoggerService?]
) =>
  new ReactComponentResolverService(
    cmpReg,
    layoutResolver,
    layoutMappingResolver,
    cmpTypeResolvers,
    logSvc
  );

/**
 * Declares the provider
 */
export const WCH_PROVIDER_COMPONENT_RESOLVER = createInjectableReactProvider(
  createComponentResolver,
  WCH_CONTEXT_COMPONENT_RESOLVER,
  [
    WCH_CONTEXT_COMPONENT_REGISTRY,
    WCH_CONTEXT_LAYOUT_RESOLVER,
    WCH_CONTEXT_LAYOUT_MAPPING_RESOLVER
  ],
  [WCH_CONTEXT_COMPONENT_TYPE_REF_RESOLVERS, WCH_CONTEXT_LOGGER_SERVICE]
);
