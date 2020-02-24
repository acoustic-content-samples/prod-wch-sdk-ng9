import { AbstractComponentsRegistry } from '@acoustic-content-sdk/component-api';
import { InjectionToken, Type } from '@angular/core';

import { ComponentTypeRef } from './../type/type.ref';

/**
 * Service to register components and get information about
 * registered components.
 */
export interface ComponentRegistry
  extends AbstractComponentsRegistry<ComponentTypeRef<any>> {
  /**
   * Registers the type given a full spec
   */
  registerType(
    aController: string | string[],
    aType: ComponentTypeRef<any>,
    aLayoutModes?: string | string[]
  ): void;
  /**
   * Registers the type and assumes that a decorator has specified the controller
   */
  registerType(aType: ComponentTypeRef<any>): void;
  /**
   * Registers the type and assumes that a decorator has specified the controller
   */
  registerType(aType: Type<any>): void;
}

/**
 * Injection token for the component registry
 */
export const ACOUSTIC_TOKEN_COMPONENT_REGISTRY = new InjectionToken<
  ComponentRegistry
>('ACOUSTIC_TOKEN_COMPONENT_REGISTRY');
