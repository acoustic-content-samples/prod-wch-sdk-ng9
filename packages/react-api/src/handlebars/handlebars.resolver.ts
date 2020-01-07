import { HandlebarsResolver } from '@acoustic-content-sdk/component-api';

import { createReactContext } from '../utils/context';

/**
 * Injection token for the page service
 */
export const WCH_CONTEXT_HANDLEBARS_RESOLVER = createReactContext<
  HandlebarsResolver
>('WCH_CONTEXT_HANDLEBARS_RESOLVER');
