import { KEY_ID } from '@acoustic-content-sdk/api';
import { RenderingContextInput } from '@acoustic-content-sdk/component-api';
import { KEY_LAYOUT_MODE } from '@acoustic-content-sdk/utils';
import { ComponentTypeRef } from '../../type/type.ref';
import { createReactContext } from '../../utils/context';

export interface ContentComponentProps {
  /**
   * Rendering context used to render the component reference
   */
  ctx?: RenderingContextInput;
  /**
   * Points to a piece of external content
   */
  [KEY_ID]?: string;
  /**
   * Optional layout mode
   */
  [KEY_LAYOUT_MODE]?: string;
  /**
   *
   */
}

/**
 * Injection token for the content component
 */
export const WCH_CONTEXT_CONTENT_COMPONENT = createReactContext<
  ComponentTypeRef<ContentComponentProps>
>('WCH_CONTEXT_CONTENT_COMPONENT');
