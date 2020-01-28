import { HubInfoUrlProvider } from '@acoustic-content-sdk/api';
import { WCH_TOKEN_API_URL } from '@acoustic-content-sdk/ng-api';
import { ModuleWithProviders, NgModule } from '@angular/core';

/**
 * Module that provides the `WCH_TOKEN_API_URL`. Use this to explicitly
 * override the API URL, e.g. in case the application is hosted externally or in case
 * the system is configured for local development. In the typical production case
 * when the application is hosted from Acoustic Content there is no need to configure
 * the API URL explicitly.
 */
@NgModule()
export class WchNgRestApiUrlModule {
  /**
   * Provides the API URL
   *
   * @param aApiUrl - the API URL
   *
   * @returns the preconfigured module
   */
  static forRoot(aApiUrl?: HubInfoUrlProvider): ModuleWithProviders {
    return {
      ngModule: WchNgRestApiUrlModule,
      providers: [{ provide: WCH_TOKEN_API_URL, useValue: aApiUrl }]
    };
  }
}
