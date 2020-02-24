import { HandlebarsResolver } from '@acoustic-content-sdk/component-api';

import { createReactContext } from '../utils/context';

/**
 * Injection token for the HandlebarsResolver
 */
export const ACOUSTIC_CONTEXT_HANDLEBARS_RESOLVER = createReactContext<
  HandlebarsResolver
>('ACOUSTIC_CONTEXT_HANDLEBARS_RESOLVER');
