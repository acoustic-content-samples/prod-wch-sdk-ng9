/* Copyright IBM Corp. 2017 */
import { WCH_TOKEN_AUTH_STATUS } from '@acoustic-content-sdk/ng-api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthStatusService } from './auth.status.service';

/**
 * /**
 * {@link https://angular.io/guide/ngmodules|Angular Module} that exposes an implementation of `WCH_TOKEN_AUTH_STATUS`.
 */
@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: WCH_TOKEN_AUTH_STATUS,
      useClass: AuthStatusService
    }
  ]
})
export class WchNgRestAuthStatusModule {}
