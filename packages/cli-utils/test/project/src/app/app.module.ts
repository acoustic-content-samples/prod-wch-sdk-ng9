import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AcNgModule } from '@acoustic-content-sdk/ng';
import { environment } from '../environments/environment';
import { AcNgEditModule } from '@acoustic-content-sdk/ng-edit';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AcNgModule.forRoot(environment),
    AcNgEditModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
