import { WchSdkVersion } from '@acoustic-content-sdk/api';
import { ACOUSTIC_TOKEN_SDK } from '@acoustic-content-sdk/ng-api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VERSION } from './../../version';
import { SdkService } from '../services/sdk/sdk.service';

@NgModule({
    imports: [CommonModule],
    providers: [
        {
            provide: ACOUSTIC_TOKEN_SDK,
            useClass: SdkService
        }
    ]
})
export class AcNgSdkModule {
    /**
     * Exposes the version information of this module
     */
    VERSION: WchSdkVersion = VERSION;
}
