import { WchNgAppPreviewModule } from '@acoustic-content-sdk/ng-app-preview';
import { NgModule } from '@angular/core';

import { AppModule } from './app.module';




@NgModule({
  imports: [
    AppModule,
    WchNgAppPreviewModule
  ]
})
export class AppPreviewModule {}
