import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppEditModule } from './app.edit.module';



@NgModule({
  imports: [
    AppEditModule
  ],
  bootstrap: [AppComponent]
})
export class AppBootstrapModule {
  constructor() {
    console.log('Edit mode');
  }
}
