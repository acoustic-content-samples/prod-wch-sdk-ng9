import { WchSdkVersion } from '@acoustic-content-sdk/api';
import {
  ACOUSTIC_TOKEN_RENDERING_CONTEXT_RESOLVER,
  ACOUSTIC_TOKEN_SEED_RESOLVER
} from '@acoustic-content-sdk/ng-api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ContentComponent } from '../components/content/content.component';
import { EditableDirective } from '../directives/editable.directive';
import { EditablePlaceholderDirective } from '../directives/editable.placeholder.directive';
import { SelectableDirective } from '../directives/selectable.directive';
import { RenderingContextResolverService } from '../services/rendering/rendering.context.resolver.service';
import { WchSeedResolver } from '../services/seed/wch.seed.resolver';
import { VERSION } from './../../version';
import { DefaultComponent } from './../components/default/default.component';
import { ContentRefDirective } from './../directives/contentref.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    DefaultComponent,
    ContentComponent,
    ContentRefDirective,
    SelectableDirective,
    EditableDirective,
    EditablePlaceholderDirective
  ],
  exports: [
    SelectableDirective,
    EditablePlaceholderDirective,
    EditableDirective,
    ContentComponent
  ],
  entryComponents: [DefaultComponent, ContentComponent],
  providers: [
    {
      provide: ACOUSTIC_TOKEN_RENDERING_CONTEXT_RESOLVER,
      useClass: RenderingContextResolverService
    },
    {
      provide: ACOUSTIC_TOKEN_SEED_RESOLVER,
      useClass: WchSeedResolver
    }
  ]
})
export class AcNgComponentsModule {
  /**
   * Exposes the version information of this module
   */
  VERSION: WchSdkVersion = VERSION;
}
