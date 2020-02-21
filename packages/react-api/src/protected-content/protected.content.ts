import { ProtectedContent } from '@acoustic-content-sdk/component-api';
import { createReactContext } from '../utils/context';

/**
 * Injection token for the protected content status
 */
export const ACOUSTIC_CONTEXT_PROTECTED_CONTENT = createReactContext<
  ProtectedContent
>('ACOUSTIC_CONTEXT_PROTECTED_CONTENT');
