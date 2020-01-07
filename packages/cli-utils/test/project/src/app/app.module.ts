import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WchNgModule } from '@acoustic-content-sdk/ng';
import { environment } from '../environments/environment';
import { WchNgEditModule } from '@acoustic-content-sdk/ng-edit';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WchNgModule.forRoot(environment),
    WchNgEditModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
