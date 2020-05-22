import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { wchGetBaseURL } from '@acoustic-content-sdk/utils';

import { {{{ACOUSTIC_APP_MODULE}}} as WchAppModule } from '{{{ACOUSTIC_APP_MODULE_PATH}}}';
import { {{{ORIGINAL_APP_MODULE}}} as OriginalAppModule } from '{{{ORIGINAL_APP_MODULE_PATH}}}';
/**
 * gets the base URL pathname for the site
 *
 * @returns the base URL pathname
 */
function getAppBase() {
  return wchGetBaseURL(document).pathname;
}

/**
 * This {@link https://angular.io/guide/architecture-modules|ngModule} imports the SDK features
 * that are common for both live and preview mode. This is also a good place to
 * configure logging.
 */
@NgModule({
  imports: [
    WchAppModule,
    OriginalAppModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: getAppBase() }
  ]
})
export class AppModule { }
