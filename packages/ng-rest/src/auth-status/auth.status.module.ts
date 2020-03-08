/* Copyright IBM Corp. 2017 */
import { ACOUSTIC_TOKEN_AUTH_STATUS } from '@acoustic-content-sdk/ng-api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthStatusService } from './auth.status.service';

/**
 * /**
 * {@link https://angular.io/guide/ngmodules|Angular Module} that exposes an implementation of `ACOUSTIC_TOKEN_AUTH_STATUS`.
 */
@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: ACOUSTIC_TOKEN_AUTH_STATUS,
      useClass: AuthStatusService
    }
  ]
})
export class AcNgRestAuthStatusModule {}
