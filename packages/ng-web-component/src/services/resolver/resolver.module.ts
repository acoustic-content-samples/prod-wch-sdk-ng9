import { WchSdkVersion } from '@acoustic-content-sdk/api';
import { ACOUSTIC_TOKEN_COMPONENT_TYPE_REF_RESOLVERS } from '@acoustic-content-sdk/ng-api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VERSION } from './../../version';
import { WebComponentResolver } from './component.resolver';

/**
 * Module that exposes a resolver for handlebars components
 */
@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: ACOUSTIC_TOKEN_COMPONENT_TYPE_REF_RESOLVERS,
      useClass: WebComponentResolver,
      multi: true
    }
  ]
})
export class AcNgWebResolverViewModule {
  /**
   * Exposes the version information of this module
   */
  VERSION: WchSdkVersion = VERSION;
}
