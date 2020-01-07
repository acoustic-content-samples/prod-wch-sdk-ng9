import { LoggerService } from '@acoustic-content-sdk/api';
import {
  LayoutMappingResolver,
  LayoutResolver
} from '@acoustic-content-sdk/component-api';
import { AbstractComponentResolverService } from '@acoustic-content-sdk/component-utils';
import {
  ComponentRegistry,
  ComponentResolver,
  ComponentTypeRef,
  ComponentTypeRefResolver
} from '@acoustic-content-sdk/react-api';

export class ReactComponentResolverService
  extends AbstractComponentResolverService<ComponentTypeRef>
  implements ComponentResolver {
  constructor(
    aComponentsService: ComponentRegistry,
    aLayoutResolverService: LayoutResolver,
    aLayoutMappingService: LayoutMappingResolver,
    aComponentTypeRefResolvers?: ComponentTypeRefResolver[],
    aLogSvc?: LoggerService
  ) {
    // default
    super(
      aComponentsService,
      aLayoutResolverService,
      aLayoutMappingService,
      aComponentTypeRefResolvers,
      aLogSvc
    );
  }
}
