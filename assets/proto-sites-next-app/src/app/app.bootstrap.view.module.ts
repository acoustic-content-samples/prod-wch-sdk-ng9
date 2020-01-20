import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppViewModule } from './app.view.module';



@NgModule({
  imports: [
    AppViewModule
  ],
  bootstrap: [AppComponent]
})
export class AppBootstrapModule {

  constructor() {
    console.log('View mode');
  }
}
