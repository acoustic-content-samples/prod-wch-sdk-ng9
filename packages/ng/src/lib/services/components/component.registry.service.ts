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
import { bindMember, NOOP_LOGGER_SERVICE } from '@acoustic-content-sdk/utils';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';

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
    aController: string | string[] | ComponentTypeRef<any>,
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
    // delegate functions
    this.registerType = bindMember(aComponentsService, 'registerType');
    this.getTypeByLayout = bindMember(aComponentsService, 'getTypeByLayout');
    this.getTypeByLayout = bindMember(aComponentsService, 'getTypeBySelector');
    // log the startup
    logger.info(MODULE, createVersionString(VERSION));
  }
}
