import {
  createVersionString,
  LoggerService,
  RenderingContextV2,
  UrlConfig
} from '@acoustic-content-sdk/api';
import { DeliveryPageResolver } from '@acoustic-content-sdk/component-api';
import { AbstractWchPageService } from '@acoustic-content-sdk/component-utils';
import { ReactWchPageService } from '@acoustic-content-sdk/react-api';
import { boxLoggerService } from '@acoustic-content-sdk/utils';
import { RouteComponentProps } from 'react-router';
import { Observable } from 'rxjs';

import { MODULE, VERSION } from '../../../version';
import { pathGetPathFromProps } from '../../utils/site.utils';

const LOGGER = 'ReactPageService';

export class ReactPageService extends AbstractWchPageService
  implements ReactWchPageService {
  /**
   * Resolves the route based on the component path
   */
  getRenderingContextByActivatedRoute: (
    aRoute: RouteComponentProps
  ) => Observable<RenderingContextV2 | null | undefined>;

  constructor(
    aDeliveryPageResolver: DeliveryPageResolver,
    aUrlConfig$: Observable<UrlConfig>,
    aLogSvc?: LoggerService
  ) {
    // default
    super(aDeliveryPageResolver, aUrlConfig$, aLogSvc);
    // logger
    const logSvc = boxLoggerService(aLogSvc);
    // logger
    const logger = logSvc.get(LOGGER);
    // delegate
    const getRenderingContextByPath = (aPath: string) =>
      this.getRenderingContextByPath(aPath);
    // resolves based on the router
    const getRenderingContextByActivatedRoute = (
      aRoute: RouteComponentProps
    ): Observable<RenderingContextV2 | null | undefined> =>
      getRenderingContextByPath(pathGetPathFromProps(aRoute));
    // attach
    this.getRenderingContextByActivatedRoute = getRenderingContextByActivatedRoute;

    // log this service
    logger.info(MODULE, createVersionString(VERSION));
  }
}
