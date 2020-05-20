import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

import { {{ { ACOUSTIC_APP_MODULE } }} as WchAppModule } from '{{{ACOUSTIC_APP_MODULE_PATH}}}';
import { {{ { ORIGINAL_APP_MODULE } }} as OriginalAppModule } from '{{{ORIGINAL_APP_MODULE_PATH}}}';

/**
 * dynamically generates the base URL
 *
 * @returns the base URL
 */
function getAppBase() {
  const dxSites = 'dxsites';
  const siteIdRegexStr = '[\\w\\d_\\-%]';
  const tenantIdRegexStr = '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}';
  const baseUrlRegex = new RegExp(`^(?:\\/api)?(?:\\/(${tenantIdRegexStr}))?(?:(?:\\/${dxSites}\\/)(${siteIdRegexStr}+))?(?:\\/)?(?:.*)$`);
  const [total, tenantId, siteId] = baseUrlRegex.exec(document.location.pathname);
  const resourceUrl = tenantId ? `/${tenantId}/` : '/';

  const baseUrl = siteId ? resourceUrl + 'dxsites/' + siteId + '/' : resourceUrl;

  return baseUrl;
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
