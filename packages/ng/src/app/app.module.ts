import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  ACOUSTIC_TOKEN_API_URL,
  ACOUSTIC_TOKEN_LOGGER_SERVICE,
  ACOUSTIC_TOKEN_URL_CONFIG
} from '@acoustic-content-sdk/ng-api';
import { AcNgLoggingModule } from '@acoustic-content-sdk/ng-logger';
import { AcNgRestModule } from '@acoustic-content-sdk/ng-rest';

import { AcNgComponentsModule } from '../lib/modules/components.module';
import { AcNgRouterModule } from '../lib/modules/router.module';
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
    AcNgLoggingModule.forRoot(),
    AcNgRestModule,
    AcNgRouterModule,
    AcNgComponentsModule,
    PageLayoutModule
  ],
  providers: [
    {
      provide: ACOUSTIC_TOKEN_LOGGER_SERVICE,
      useClass: WchLoggerService
    },
    {
      provide: ACOUSTIC_TOKEN_URL_CONFIG,
      useClass: WchInfoService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
