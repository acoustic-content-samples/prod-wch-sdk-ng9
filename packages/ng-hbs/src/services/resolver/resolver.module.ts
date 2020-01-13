import { WCH_TOKEN_COMPONENT_TYPE_REF_RESOLVERS } from '@acoustic-content-sdk/ng-api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HandlebarsComponentResolver } from './component.resolver';

/**
 * Module that exposes a resolver for handlebars components
 */
@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: WCH_TOKEN_COMPONENT_TYPE_REF_RESOLVERS,
      useClass: HandlebarsComponentResolver,
      multi: true
    }
  ]
})
export class WchNgHbsResolverViewModule {}
