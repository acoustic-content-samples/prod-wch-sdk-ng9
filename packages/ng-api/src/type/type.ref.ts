import { ComponentFactoryResolver, Type } from '@angular/core';

/**
 * Captures all information required to instantiate a component based on its type
 */
export interface ComponentTypeRef<T> {
  /**
   * The actual angular type for the component
   */
  type: Type<T>;
  /**
   * Optionally a component factory resolver
   */
  resolver?: ComponentFactoryResolver;
}
