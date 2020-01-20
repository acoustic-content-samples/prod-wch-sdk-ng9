import { WchNgAppEditModule } from '@acoustic-content-sdk/ng-app-edit';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';



@NgModule({
  imports: [
    AppModule,
    WchNgAppEditModule
  ]
})
export class AppEditModule {}
