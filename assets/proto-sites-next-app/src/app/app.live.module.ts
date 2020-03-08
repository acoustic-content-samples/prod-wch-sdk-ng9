import { AcNgAppLiveModule } from '@acoustic-content-sdk/ng-app-live';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { AcNgRestApiUrlModule } from '@acoustic-content-sdk/ng-rest';

@NgModule({
  imports: [
    AppModule,
    AcNgAppLiveModule,
    // configure the API URL
    AcNgRestApiUrlModule.forRoot(
      'https://my4.digitalexperience.ibm.com/api/ab3cbc2c-b5e8-4b15-b68b-64fa31070f8b/'
    )
  ],
  bootstrap: [AppComponent]
})
export class AppLiveModule {}
