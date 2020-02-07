import { ReconciledDeliverySearchResolver } from '@acoustic-content-sdk/component-api';
import { createReactContext } from '../utils/context';

/**
 * Injection token for the ReconciledDeliverySearchResolver
 */
export const WCH_CONTEXT_RECONCILED_DELIVERY_SEARCH_RESOLVER = createReactContext<
  ReconciledDeliverySearchResolver
>('WCH_CONTEXT_RECONCILED_DELIVERY_SEARCH_RESOLVER');
