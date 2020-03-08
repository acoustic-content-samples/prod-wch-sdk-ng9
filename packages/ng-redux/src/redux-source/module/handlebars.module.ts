/* Copyright IBM Corp. 2017 */
import { ACOUSTIC_TOKEN_HANDLEBARS_RESOLVER } from '@acoustic-content-sdk/ng-api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HandlebarsResolverService } from '../handlebars/handlebars.resolver.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: ACOUSTIC_TOKEN_HANDLEBARS_RESOLVER,
      useClass: HandlebarsResolverService
    }
  ]
})
export class AcNgReduxHbsModule {}
