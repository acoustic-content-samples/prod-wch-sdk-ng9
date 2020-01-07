import {
  createInjectableReactProvider,
  WCH_CONTEXT_LAYOUT_MAPPING_RESOLVER
} from '@acoustic-content-sdk/react-api';

import { LayoutMappingResolverService } from './mappings.service';

const createLayoutMappingResolver = () => new LayoutMappingResolverService();

/**
 * Declares the provider
 */
export const WCH_PROVIDER_LAYOUT_MAPPING_RESOLVER = createInjectableReactProvider(
  createLayoutMappingResolver,
  WCH_CONTEXT_LAYOUT_MAPPING_RESOLVER
);
