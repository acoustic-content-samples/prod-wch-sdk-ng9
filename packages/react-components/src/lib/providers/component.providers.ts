import { ReactProvider } from '@acoustic-content-sdk/react-api';
import { ACOUSTIC_PROVIDER_CONTENT_COMPONENT } from '../components/content/content.component';
import { ACOUSTIC_PROVIDER_PAGE_COMPONENT } from '../components/page/page.component';
import { ACOUSTIC_PROVIDER_COMPONENT_RESOLVER } from '../services/components/wch.component.resolver.module';
import { ACOUSTIC_PROVIDER_COMPONENT_REGISTRY } from '../services/components/wch.components.service.module';
import { ACOUSTIC_PROVIDER_LAYOUT_RESOLVER } from '../services/layout/wch.layout.resolver.module';
import { ACOUSTIC_PROVIDER_LOGGER_SERVICE } from '../services/logger/wch.logger.service.module';
import { ACOUSTIC_PROVIDER_LAYOUT_MAPPING_RESOLVER } from '../services/mappings/wch.mappings.module';
import { ACOUSTIC_PROVIDER_PAGE_SERVICE } from '../services/page/wch.page.service.module';
import { ACOUSTIC_PROVIDER_PROTECTED_CONTENT } from '../services/protected-content/wch.protected.content.module';
import { ACOUSTIC_PROVIDER_RENDERING_CONTEXT_RESOLVER } from '../services/rendering/wch.rendering.context.resolver.module';
import { ACOUSTIC_PROVIDER_DELIVERY_SEARCH_RESOLVER } from '../services/search/wch.search.resolver.module';
import { ACOUSTIC_PROVIDER_EDIT_HOST_WINDOW } from '../services/window/edit.host.window.module';

/**
 * Exports the providers of this module
 */
export const ACOUSTIC_PROVIDERS_COMPONENTS: Array<ReactProvider<any>> = [
  ACOUSTIC_PROVIDER_COMPONENT_RESOLVER,
  ACOUSTIC_PROVIDER_COMPONENT_REGISTRY,
  ACOUSTIC_PROVIDER_LOGGER_SERVICE,
  ACOUSTIC_PROVIDER_PAGE_SERVICE,
  ACOUSTIC_PROVIDER_RENDERING_CONTEXT_RESOLVER,
  ACOUSTIC_PROVIDER_LAYOUT_RESOLVER,
  ACOUSTIC_PROVIDER_DELIVERY_SEARCH_RESOLVER,
  ACOUSTIC_PROVIDER_EDIT_HOST_WINDOW,
  ACOUSTIC_PROVIDER_LAYOUT_MAPPING_RESOLVER,
  ACOUSTIC_PROVIDER_CONTENT_COMPONENT,
  ACOUSTIC_PROVIDER_PAGE_COMPONENT,
  ACOUSTIC_PROVIDER_PROTECTED_CONTENT
];
