import { DeliverySiteResolver } from '@acoustic-content-sdk/component-api';

import { createReactContext } from '../utils/context';

/**
 * Injection token for the navigation service
 */
export const ACOUSTIC_CONTEXT_DELIVERY_SITE_RESOLVER = createReactContext<
  DeliverySiteResolver
>('ACOUSTIC_CONTEXT_DELIVERY_SITE_RESOLVER');
