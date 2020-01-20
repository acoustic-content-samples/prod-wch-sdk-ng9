import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppPreviewModule } from './app.preview.module';



@NgModule({
  imports: [
    AppPreviewModule
  ],
  bootstrap: [AppComponent]
})
export class AppBootstrapModule {
  constructor() {
    console.log('Edit mode');
  }
}
