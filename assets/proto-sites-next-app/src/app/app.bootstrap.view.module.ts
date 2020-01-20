import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppLiveModule } from './app.live.module';



@NgModule({
  imports: [
    AppLiveModule
  ],
  bootstrap: [AppComponent]
})
export class AppBootstrapModule {

  constructor() {
    console.log('View mode');
  }
}
