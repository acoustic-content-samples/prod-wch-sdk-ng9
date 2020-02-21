import { NgModule } from '@angular/core';

import { {{{ACOUSTIC_APP_MODULE}}} as WchAppModule } from '{{{ACOUSTIC_APP_MODULE_PATH}}}';
import { {{{ORIGINAL_COMPONENT}}} as OriginalComponent } from '{{{ORIGINAL_COMPONENT_PATH}}}';

import { AppModule as AppBaseModule } from '{{{KEY_ACOUSTIC_APP_BASE_PATH}}}';

/**
 * This {@link https://angular.io/guide/architecture-modules|ngModule} imports the mode specific SDK features.
 */
@NgModule({
  imports: [WchAppModule, AppBaseModule],
  bootstrap: [OriginalComponent]
})
export class AppModule {}
