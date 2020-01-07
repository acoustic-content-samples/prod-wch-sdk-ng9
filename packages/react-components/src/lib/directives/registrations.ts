import {
  AbstractRegisteredComponent,
  AbstractRegisteredLayoutMapping
} from '@acoustic-content-sdk/component-utils';
import { ComponentTypeRef } from '@acoustic-content-sdk/react-api';

import { LayoutComponentDirective } from './layout.directive';

export type RegisteredComponent = AbstractRegisteredComponent<
  ComponentTypeRef,
  LayoutComponentDirective
>;

export type RegisteredLayoutMapping = AbstractRegisteredLayoutMapping<
  ComponentTypeRef
>;

const KEY_COMPONENT = Symbol();
const KEY_LAYOUT_MAPPING = Symbol();

export const registerComponent = (
  aType: ComponentTypeRef,
  aRegistration: RegisteredComponent
) => (aType[KEY_COMPONENT] = aRegistration);

export const registerLayoutMapping = (
  aType: ComponentTypeRef,
  aRegistration: RegisteredLayoutMapping
) => (aType[KEY_LAYOUT_MAPPING] = aRegistration);

export const getRegisteredComponent = (
  aType: ComponentTypeRef
): RegisteredComponent => aType[KEY_COMPONENT];
