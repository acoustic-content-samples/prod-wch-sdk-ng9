import { LoggerService } from '@acoustic-content-sdk/api';
import {
  ComponentTypeRef,
  createInjectableReactProvider,
  ReactComponentProps,
  ACOUSTIC_CONTEXT_COMPONENT_REGISTRY,
  ACOUSTIC_CONTEXT_DEFAULT_COMPONENT,
  ACOUSTIC_CONTEXT_LOGGER_SERVICE
} from '@acoustic-content-sdk/react-api';

import { ReactComponentRegistryService } from './component.registry.service';

const createComponentRegistry = (
  aReg: never,
  [aDefaultComponent, aLogSvc]: [
    ComponentTypeRef<ReactComponentProps>?,
    LoggerService?
  ]
) => new ReactComponentRegistryService(aDefaultComponent, aLogSvc);

/**
 * Declares the provider
 */
export const ACOUSTIC_PROVIDER_COMPONENT_REGISTRY = createInjectableReactProvider(
  createComponentRegistry,
  ACOUSTIC_CONTEXT_COMPONENT_REGISTRY,
  undefined,
  [ACOUSTIC_CONTEXT_DEFAULT_COMPONENT, ACOUSTIC_CONTEXT_LOGGER_SERVICE]
);
