import { WchLoggerService } from '@acoustic-content-sdk/ng';
import { WCH_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import { AcNgAppBaseModule } from '@acoustic-content-sdk/ng-app-base';
import { AcNgLoggingModule } from '@acoustic-content-sdk/ng-logger';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { BasicBuildingBlocksModule } from '@sites-next-content/basic-building-blocks';

import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageLayoutModule } from './layouts/page/page.layout.module';
import { MODULES } from './modules';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { useHash: false }),
    AcNgLoggingModule.forRoot({
      onlyModules: ['createRendererV2|SitesRowsLayoutComponent']
    }),
    AcNgAppBaseModule,
    PageLayoutModule,
    BasicBuildingBlocksModule,
    ...MODULES
  ],
  providers: [
    {
      provide: WCH_TOKEN_LOGGER_SERVICE,
      useClass: WchLoggerService
    }
  ]
})
export class AppModule {}
