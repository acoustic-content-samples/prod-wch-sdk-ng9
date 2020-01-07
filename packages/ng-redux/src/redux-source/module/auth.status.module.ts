/* Copyright IBM Corp. 2017 */
import { WCH_TOKEN_AUTH_STATUS } from '@acoustic-content-sdk/ng-api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthStatusService } from '../auth-status/auth.status.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: WCH_TOKEN_AUTH_STATUS,
      useClass: AuthStatusService
    }
  ]
})
export class WchNgReduxAuthStatusModule {}
