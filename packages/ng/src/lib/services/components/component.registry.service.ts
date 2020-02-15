import {
  createVersionString,
  Layout,
  LoggerService
} from '@acoustic-content-sdk/api';
import {
  ComponentRegistry,
  ComponentTypeRef,
  WCH_TOKEN_LOGGER_SERVICE
} from '@acoustic-content-sdk/ng-api';
import {
  bindMember,
  isFunction,
  isPlainObject,
  isString,
  isStringArray,
  NOOP_LOGGER_SERVICE
} from '@acoustic-content-sdk/utils';
import { Inject, Injectable, Optional, Type } from '@angular/core';
import { Observable } from 'rxjs';

import { cmpGetSelectors } from '../../utils/component.utils';
import { MODULE, VERSION } from './../../../version';
import { ComponentsService } from './components.service';

const LOGGER = 'ComponentRegistryService';

/**
 * Implementation of the `ComponentRegistry` by just delegating to a different service
 */
@Injectable()
export class ComponentRegistryService implements ComponentRegistry {
  /**
   * The generic override
   */
  registerType: (
    aController: string | string[] | ComponentTypeRef<any> | Type<any>,
    aType?: ComponentTypeRef<any>,
    aLayoutModes?: string | string[]
  ) => void;

  getTypeByLayout: (
    aLayout: Layout,
    aLayoutMode?: string
  ) => Observable<ComponentTypeRef<any>>;
  getTypeBySelector: (
    aSelector: string,
    aLayoutMode?: string
  ) => Observable<ComponentTypeRef<any>>;

  constructor(
    aComponentsService: ComponentsService,
    @Optional()
    @Inject(WCH_TOKEN_LOGGER_SERVICE)
    aLogSvc: LoggerService
  ) {
    // logger
    const logSvc = aLogSvc || NOOP_LOGGER_SERVICE;
    const logger = logSvc.get(LOGGER);
    // delegate function
    const delegateRegisterType: (
      aController: string | string[],
      aType: ComponentTypeRef<any>,
      aLayoutModes?: string | string[]
    ) => void = bindMember(aComponentsService, 'registerType');
    // current function
    const registerType = (
      aController: string | string[] | ComponentTypeRef<any> | Type<any>,
      aType?: ComponentTypeRef<any>,
      aLayoutModes?: string | string[]
    ): void => {
      // decode the component
      if (isString(aController) || isStringArray(aController)) {
        // dispatch
        delegateRegisterType(aController, aType, aLayoutModes);
      } else if (isFunction(aController)) {
        // get the selectors
        const selectors = cmpGetSelectors(aController);
        // dispatch
        delegateRegisterType(selectors, { type: aController });
      } else if (isPlainObject(aController)) {
        // get the selectors
        const selectors = cmpGetSelectors(aController);
        // dispatch
        delegateRegisterType(selectors, aController);
      } else {
        // warn
        logger.warn('Unable to get the selectors for', aController);
      }
    };

    // delegate functions
    this.registerType = registerType;
    this.getTypeByLayout = bindMember(aComponentsService, 'getTypeByLayout');
    this.getTypeByLayout = bindMember(aComponentsService, 'getTypeBySelector');
    // log the startup
    logger.info(MODULE, createVersionString(VERSION));
  }
}
