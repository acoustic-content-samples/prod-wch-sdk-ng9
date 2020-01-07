import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  WCH_TOKEN_API_URL,
  WCH_TOKEN_LOGGER_SERVICE,
  WCH_TOKEN_URL_CONFIG
} from '@acoustic-content-sdk/ng-api';
import { WchNgLoggingModule } from '@acoustic-content-sdk/ng-logger';
import { WchNgRestModule } from '@acoustic-content-sdk/ng-rest';

import { WchNgComponentsModule } from '../lib/modules/components.module';
import { WchNgRouterModule } from '../lib/modules/router.module';
import { WchInfoService } from '../lib/services/info/wch.info.service';
import { WchLoggerService } from '../lib/services/logger/wch.logger.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageLayoutModule } from './layouts/page.layout.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WchNgLoggingModule.forRoot(),
    WchNgRestModule,
    WchNgRouterModule,
    WchNgComponentsModule,
    PageLayoutModule
  ],
  providers: [
    {
      provide: WCH_TOKEN_LOGGER_SERVICE,
      useClass: WchLoggerService
    },
    {
      provide: WCH_TOKEN_URL_CONFIG,
      useClass: WchInfoService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
