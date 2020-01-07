import {
  ReactComponent,
  createReactContext
} from '@acoustic-content-sdk/react-api';

export interface {{{componentName}}}Props {
  // properties come here
}

/**
 * Dependency injection context for the `{{{componentName}}}`.
 */
export const CONTEXT_{{{constantName}}} = createReactContext<
  ReactComponent<{{{componentName}}}Props>
>('CONTEXT_{{{constantName}}}');
