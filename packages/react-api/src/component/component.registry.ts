import { AbstractComponentsRegistry } from '@acoustic-content-sdk/component-api';

import { createReactContext } from '../utils/context';
import { ComponentTypeRef } from './../type/type.ref';

export interface ComponentRegistry
  extends AbstractComponentsRegistry<ComponentTypeRef> {
  /**
   * Registers the type given a full spec
   */
  registerType(
    aController: string | string[],
    aType: ComponentTypeRef,
    aLayoutModes?: string | string[]
  ): void;
  /**
   * Registers the type and assumes that a decorator has specified the controller
   */
  registerType(aType: ComponentTypeRef): void;
}

export const ACOUSTIC_CONTEXT_COMPONENT_REGISTRY = createReactContext<
  ComponentRegistry
>('ACOUSTIC_CONTEXT_COMPONENT_REGISTRY');
