import { ReactProvider } from '@acoustic-content-sdk/react-api';
import { WCH_PROVIDER_CONTENT_COMPONENT } from '../components/content/content.component';
import { WCH_PROVIDER_PAGE_COMPONENT } from '../components/page/page.component';
import { WCH_PROVIDER_COMPONENT_RESOLVER } from '../services/components/wch.component.resolver.module';
import { WCH_PROVIDER_COMPONENT_REGISTRY } from '../services/components/wch.components.service.module';
import { WCH_PROVIDER_LAYOUT_RESOLVER } from '../services/layout/wch.layout.resolver.module';
import { WCH_PROVIDER_LOGGER_SERVICE } from '../services/logger/wch.logger.service.module';
import { WCH_PROVIDER_LAYOUT_MAPPING_RESOLVER } from '../services/mappings/wch.mappings.module';
import { WCH_PROVIDER_PAGE_SERVICE } from '../services/page/wch.page.service.module';
import { WCH_PROVIDER_PROTECTED_CONTENT } from '../services/protected-content/wch.protected.content.module';
import { WCH_PROVIDER_RENDERING_CONTEXT_RESOLVER } from '../services/rendering/wch.rendering.context.resolver.module';
import { WCH_PROVIDER_DELIVERY_SEARCH_RESOLVER } from '../services/search/wch.search.resolver.module';
import { WCH_PROVIDER_EDIT_HOST_WINDOW } from '../services/window/edit.host.window.module';

/**
 * Exports the providers of this module
 */
export const WCH_PROVIDERS_COMPONENTS: Array<ReactProvider<any>> = [
  WCH_PROVIDER_COMPONENT_RESOLVER,
  WCH_PROVIDER_COMPONENT_REGISTRY,
  WCH_PROVIDER_LOGGER_SERVICE,
  WCH_PROVIDER_PAGE_SERVICE,
  WCH_PROVIDER_RENDERING_CONTEXT_RESOLVER,
  WCH_PROVIDER_LAYOUT_RESOLVER,
  WCH_PROVIDER_DELIVERY_SEARCH_RESOLVER,
  WCH_PROVIDER_EDIT_HOST_WINDOW,
  WCH_PROVIDER_LAYOUT_MAPPING_RESOLVER,
  WCH_PROVIDER_CONTENT_COMPONENT,
  WCH_PROVIDER_PAGE_COMPONENT,
  WCH_PROVIDER_PROTECTED_CONTENT
];
