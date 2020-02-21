import { LoggerService } from '@acoustic-content-sdk/api';
import {
  LayoutMappingResolver,
  LayoutResolver
} from '@acoustic-content-sdk/component-api';
import {
  ComponentRegistry,
  ComponentTypeRefResolver,
  createInjectableReactProvider,
  ACOUSTIC_CONTEXT_COMPONENT_REGISTRY,
  ACOUSTIC_CONTEXT_COMPONENT_RESOLVER,
  ACOUSTIC_CONTEXT_COMPONENT_TYPE_REF_RESOLVERS,
  ACOUSTIC_CONTEXT_LAYOUT_MAPPING_RESOLVER,
  ACOUSTIC_CONTEXT_LAYOUT_RESOLVER,
  ACOUSTIC_CONTEXT_LOGGER_SERVICE
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
export const ACOUSTIC_PROVIDER_COMPONENT_RESOLVER = createInjectableReactProvider(
  createComponentResolver,
  ACOUSTIC_CONTEXT_COMPONENT_RESOLVER,
  [
    ACOUSTIC_CONTEXT_COMPONENT_REGISTRY,
    ACOUSTIC_CONTEXT_LAYOUT_RESOLVER,
    ACOUSTIC_CONTEXT_LAYOUT_MAPPING_RESOLVER
  ],
  [ACOUSTIC_CONTEXT_COMPONENT_TYPE_REF_RESOLVERS, ACOUSTIC_CONTEXT_LOGGER_SERVICE]
);
