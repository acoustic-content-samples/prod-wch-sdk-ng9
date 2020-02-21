/* Copyright IBM Corp. 2017 */
import { ACOUSTIC_PROVIDER_REST_AUTH_STATUS } from '../auth-status/auth.status.module';
import { ACOUSTIC_PROVIDER_REST_DELIVERY_CONTENT_RESOLVER } from '../content/delivery.content.resolver.module';
import { ACOUSTIC_PROVIDER_REST_DELIVERY_LAYOUT_MAPPING_RESOLVER } from '../layout-mapping/delivery.layout.mapping.resolver.module';
import { ACOUSTIC_PROVIDER_REST_DELIVERY_LAYOUT_RESOLVER } from '../layout/delivery.layout.resolver.module';
import { ACOUSTIC_PROVIDER_REST_DELIVERY_PAGE_RESOLVER } from '../page/delivery.page.resolver.module';
import { ACOUSTIC_PROVIDER_REST_DELIVERY_TYPE_RESOLVER } from '../type/delivery.type.resolver.module';

/**
 * List of provider implementations that implement common services via REST
 */
export const ACOUSTIC_PROVIDERS_REST = [
  ACOUSTIC_PROVIDER_REST_DELIVERY_CONTENT_RESOLVER,
  ACOUSTIC_PROVIDER_REST_DELIVERY_LAYOUT_RESOLVER,
  ACOUSTIC_PROVIDER_REST_DELIVERY_LAYOUT_MAPPING_RESOLVER,
  ACOUSTIC_PROVIDER_REST_DELIVERY_TYPE_RESOLVER,
  ACOUSTIC_PROVIDER_REST_DELIVERY_PAGE_RESOLVER,
  ACOUSTIC_PROVIDER_REST_AUTH_STATUS
];
