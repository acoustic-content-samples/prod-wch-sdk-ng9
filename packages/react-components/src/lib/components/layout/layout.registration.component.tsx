import {
  ComponentRegistry,
  ACOUSTIC_CONTEXT_COMPONENT_REGISTRY
} from '@acoustic-content-sdk/react-api';
import { Consumer } from '@acoustic-content-sdk/utils';
import { FC } from 'react';
import * as React from 'react';

export interface LayoutRegistrationProps {
  register: Consumer<ComponentRegistry>;
}

/**
 * Component that registers layouts
 *
 * @param register - callback function that will be called with the component registry
 */
export const LayoutRegistration: FC<LayoutRegistrationProps> = ({
  register,
  children
}) => (
  <ACOUSTIC_CONTEXT_COMPONENT_REGISTRY.Consumer>
    {(aReg) => {
      // register
      register(aReg);
      // include the children
      return <>{children}</>;
    }}
  </ACOUSTIC_CONTEXT_COMPONENT_REGISTRY.Consumer>
);
