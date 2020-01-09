import { RenderingContextV2 } from '@acoustic-content-sdk/api';
import {
  KEY_LAYOUT_MODE,
  KEY_RENDERING_CONTEXT
} from '@acoustic-content-sdk/utils';
import { ComponentClass, FunctionComponent } from 'react';

/**
 * Properties of a rendering component
 */
export interface ReactComponentProps {
  /**
   * Rendering context that contains the required information about the data item to be rendered
   */
  [KEY_RENDERING_CONTEXT]: RenderingContextV2;
  /**
   * Layout mode used to render the component
   */
  [KEY_LAYOUT_MODE]?: string;
}

/**
 * Definition of a generic react component
 */
export type ReactComponent<P = ReactComponentProps, DS = any> =
  | FunctionComponent<P>
  | ComponentClass<P, DS>;

/**
 * Captures all information required to instantiate a component based on its type
 */
export type ComponentTypeRef<P = ReactComponentProps> = ReactComponent<P>;
