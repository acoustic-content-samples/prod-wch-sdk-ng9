import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UNDEFINED_TYPE } from '@acoustic-content-sdk/utils';

@Injectable()
export class SdkService implements OnDestroy {

    ngOnDestroy: () => void;

    private _sdk: any;

    constructor(router: Router) {
        // check if we have a window
        const bWindow = (typeof window !== UNDEFINED_TYPE);
        // make this available on the window
        if (bWindow) {
            // register the SDK on the global window scope
            window['AcousticContentSDK'] = {
                router: {
                    navigateByPath: (aPath: string) => router.navigateByUrl(aPath)
                }
            };
        } else {
            // log warning
            // logger.warn(, 'SDK is not available on the global scope, since there is no window object.');
        }

        this.ngOnDestroy = () => {
            // remove sdk
            if (bWindow) {
                delete window['AcousticContentSDK'];
            }
            delete this._sdk;
        };
    }

    /*
     * Getter for the SDK
     */
    get sdk() {
        return this._sdk;
    }
}
