import { NgModule } from '@angular/core';

import { {{{ACOUSTIC_APP_MODULE}}} as WchAppModule } from '{{{ACOUSTIC_APP_MODULE_PATH}}}';
import { WchNgLoggingModule } from '@acoustic-content-sdk/ng-logger';
import { {{{ORIGINAL_APP_MODULE}}} as OriginalAppModule } from '{{{ORIGINAL_APP_MODULE_PATH}}}';

/**
 * This {@link https://angular.io/guide/architecture-modules|ngModule} imports the SDK features
 * that are common for both live and preview mode. This is also a good place to
 * configure logging.
 */
@NgModule({
  imports: [
    WchAppModule,
    OriginalAppModule,
    WchNgLoggingModule.forRoot({
      // TODO optionally add logging config here
    }),
  ]
})
export class AppModule {}
