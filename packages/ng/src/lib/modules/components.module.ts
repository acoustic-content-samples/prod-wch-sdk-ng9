import {
  WCH_TOKEN_RENDERING_CONTEXT_RESOLVER,
  WCH_TOKEN_SEED_RESOLVER
} from '@acoustic-content-sdk/ng-api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ContentComponent } from '../components/content/content.component';
import { RenderingContextResolverService } from '../services/rendering/rendering.context.resolver.service';
import { WchSeedResolver } from '../services/seed/wch.seed.resolver';
import { DefaultComponent } from './../components/default/default.component';
import { ContentRefDirective } from './../directives/contentref.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [DefaultComponent, ContentComponent, ContentRefDirective],
  exports: [ContentComponent],
  entryComponents: [DefaultComponent, ContentComponent],
  providers: [
    {
      provide: WCH_TOKEN_RENDERING_CONTEXT_RESOLVER,
      useClass: RenderingContextResolverService
    },
    {
      provide: WCH_TOKEN_SEED_RESOLVER,
      useClass: WchSeedResolver
    }
  ]
})
export class WchNgComponentsModule {}
