import { RenderingContextV2 } from '@acoustic-content-sdk/api';
import {
  KEY_LAYOUT_MODE,
  KEY_RENDERING_CONTEXT
} from '@acoustic-content-sdk/utils';
import { ComponentClass, FunctionComponent } from 'react';

export interface ReactComponentProps {
  [KEY_RENDERING_CONTEXT]: RenderingContextV2;
  [KEY_LAYOUT_MODE]?: string;
}

export type ReactComponent<P = ReactComponentProps, DS = any> =
  | FunctionComponent<P>
  | ComponentClass<P, DS>;

/**
 * Captures all information required to instantiate a component based on its type
 */
export type ComponentTypeRef<P = ReactComponentProps> = ReactComponent<P>;
