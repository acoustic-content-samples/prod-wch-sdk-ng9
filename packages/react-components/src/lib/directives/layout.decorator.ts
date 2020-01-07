import {
  createLayoutComponentDecorator,
  createLayoutMappingDecorator
} from '@acoustic-content-sdk/component-utils';
import { ComponentTypeRef } from '@acoustic-content-sdk/react-api';

import { LayoutComponentDirective } from './layout.directive';
import { registerComponent, registerLayoutMapping } from './registrations';

/**
 * The layout component directive
 */
export const LayoutComponent = createLayoutComponentDecorator<
  ComponentTypeRef,
  LayoutComponentDirective
>(registerComponent, registerLayoutMapping);

/**
 * The layout mapping directive
 */
export const LayoutMapping = createLayoutMappingDecorator<ComponentTypeRef>(
  registerLayoutMapping
);
