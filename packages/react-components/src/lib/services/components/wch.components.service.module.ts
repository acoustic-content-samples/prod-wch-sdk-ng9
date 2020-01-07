import { LoggerService } from '@acoustic-content-sdk/api';
import {
  ComponentTypeRef,
  createInjectableReactProvider,
  ReactComponentProps,
  WCH_CONTEXT_COMPONENT_REGISTRY,
  WCH_CONTEXT_DEFAULT_COMPONENT,
  WCH_CONTEXT_LOGGER_SERVICE
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
export const WCH_PROVIDER_COMPONENT_REGISTRY = createInjectableReactProvider(
  createComponentRegistry,
  WCH_CONTEXT_COMPONENT_REGISTRY,
  undefined,
  [WCH_CONTEXT_DEFAULT_COMPONENT, WCH_CONTEXT_LOGGER_SERVICE]
);
