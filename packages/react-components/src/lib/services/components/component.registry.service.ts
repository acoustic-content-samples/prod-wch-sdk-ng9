import { LoggerService } from '@acoustic-content-sdk/api';
import { AbstractComponentsService } from '@acoustic-content-sdk/component-utils';
import {
  ComponentRegistry,
  ComponentTypeRef,
  ComponentTypeRefResolver,
  ReactComponentProps
} from '@acoustic-content-sdk/react-api';
import {
  boxLoggerService,
  isNotNil,
  isString,
  isStringArray
} from '@acoustic-content-sdk/utils';

import { DefaultComponent } from '../../components/default/default.component';
import { getRegisteredComponent } from '../../directives/registrations';
import { isEqualComponentTypeRef } from '../../utils/js.utils';

const LOGGER = 'ReactComponentRegistryService';

export class ReactComponentRegistryService
  extends AbstractComponentsService<ComponentTypeRef>
  implements ComponentTypeRefResolver, ComponentRegistry {
  /**
   * The generic override
   */
  registerType: (
    aController: string | string[] | ComponentTypeRef,
    aType?: ComponentTypeRef,
    aLayoutModes?: string | string[]
  ) => void;
  /**
   * Initializes our constructor. We make sure to keep all private instance variables as part of the
   * closure and override the methods on the instance level. Since this is a singleton service,
   * that approach does not cause a performance problem.
   */
  constructor(
    defaultComponent: ComponentTypeRef<ReactComponentProps> = DefaultComponent,
    aLogSvc?: LoggerService
  ) {
    super(defaultComponent, isEqualComponentTypeRef, aLogSvc);
    // resolve the logger
    const logSvc = boxLoggerService(aLogSvc);
    const logger = logSvc.get(LOGGER);
    // the old function
    const oldRegisterType = this.registerType.bind(this);
    // new override

    function registerType(
      aController: string | string[] | ComponentTypeRef,
      aType?: ComponentTypeRef,
      aLayoutModes?: string | string[]
    ) {
      // test the type of function
      if (isString(aController) || isStringArray(aController)) {
        // dispatch
        if (isNotNil(aType)) {
          oldRegisterType(aController, aType, aLayoutModes);
        }
      } else if (isNotNil(aController)) {
        // try to get the metadata
        const metadata = getRegisteredComponent(aController);
        if (isNotNil(metadata)) {
          // decompose
          const {
            directive: { layoutMode, selector },
            type
          } = metadata;
          // dispatch
          oldRegisterType(selector, type, layoutMode);
        } else {
          // warn
          logger.warn(
            'Annotate the component with @LayoutDirective',
            aController
          );
        }
      } else {
        // invalid registration
        logger.warn('Invalid registration', aController, aType, aLayoutModes);
      }
    }

    // re-wire
    this.registerType = registerType;
  }
}
