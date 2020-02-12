import { NgModule } from '@angular/core';

import { {{{WCH_APP_MODULE}}} as WchAppModule } from '{{{WCH_APP_MODULE_PATH}}}';
import { {{{ORIGINAL_COMPONENT}}} as OriginalComponent } from '{{{ORIGINAL_COMPONENT_PATH}}}';
import { {{{ORIGINAL_APP_MODULE}}} as OriginalAppModule } from '{{{ORIGINAL_APP_MODULE_PATH}}}';

@NgModule({
  imports: [WchAppModule, OriginalAppModule],
  bootstrap: [OriginalComponent]
})
export class AppBootstrapModule {}
