import { ComponentTypeRef, ReactComponentProps } from '../../type/type.ref';
import { createReactContext } from '../../utils/context';

/**
 * Injection token for the default component
 */
export const ACOUSTIC_CONTEXT_DEFAULT_COMPONENT = createReactContext<
  ComponentTypeRef<ReactComponentProps>
>('ACOUSTIC_CONTEXT_DEFAULT_COMPONENT');
