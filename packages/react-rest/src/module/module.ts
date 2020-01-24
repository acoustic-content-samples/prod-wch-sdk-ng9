/* Copyright IBM Corp. 2017 */
import { WCH_PROVIDER_REST_DELIVERY_CONTENT_RESOLVER } from '../content/delivery.content.resolver.module';
import { WCH_PROVIDER_REST_DELIVERY_LAYOUT_MAPPING_RESOLVER } from '../layout-mapping/delivery.layout.mapping.resolver.module';
import { WCH_PROVIDER_REST_DELIVERY_LAYOUT_RESOLVER } from '../layout/delivery.layout.resolver.module';
import { WCH_PROVIDER_REST_DELIVERY_PAGE_RESOLVER } from '../page/delivery.page.resolver.module';
import { WCH_PROVIDER_REST_DELIVERY_TYPE_RESOLVER } from '../type/delivery.type.resolver.module';

export const WCH_PROVIDERS_REST = [
  WCH_PROVIDER_REST_DELIVERY_CONTENT_RESOLVER,
  WCH_PROVIDER_REST_DELIVERY_LAYOUT_RESOLVER,
  WCH_PROVIDER_REST_DELIVERY_LAYOUT_MAPPING_RESOLVER,
  WCH_PROVIDER_REST_DELIVERY_TYPE_RESOLVER,
  WCH_PROVIDER_REST_DELIVERY_PAGE_RESOLVER
];
