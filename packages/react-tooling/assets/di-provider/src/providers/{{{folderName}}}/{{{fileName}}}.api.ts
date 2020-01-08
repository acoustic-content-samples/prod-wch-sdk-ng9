import {
  createReactContext
} from '@acoustic-content-sdk/react-api';

export interface {{{providerName}}} {
  // properties come here
}

/**
 * Dependency injection context for the `{{{providerName}}}`.
 */
export const CONTEXT_{{{constantName}}} = createReactContext<
  {{{providerName}}}
>('CONTEXT_{{{constantName}}}');
