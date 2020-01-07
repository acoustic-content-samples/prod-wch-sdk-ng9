import { ProtectedContent } from '@acoustic-content-sdk/component-api';
import { createReactContext } from '../utils/context';

/**
 * Injection token for the protected content status
 */
export const WCH_CONTEXT_PROTECTED_CONTENT = createReactContext<
  ProtectedContent
>('WCH_CONTEXT_PROTECTED_CONTENT');
