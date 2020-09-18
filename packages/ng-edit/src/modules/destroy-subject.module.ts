import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ACOUSTIC_TOKEN_DESTROY_SUBJECT } from '@acoustic-content-sdk/ng-api';
import { Subject } from 'rxjs';
import { ACOUSTIC_TOKEN_WINDOW } from '@acoustic-content-sdk/ng-api';

const subject = new Subject();

export function getDestroySubject(aWindow) {
    if (!aWindow['destroySubject']) {
        aWindow['destroySubject'] = subject;
    }
    return subject
}

/**
 * Provides token `ACOUSTIC_TOKEN_DESTROY_SUBJECT`
 */
@NgModule({
    imports: [CommonModule],
    providers: [
        {
            provide: ACOUSTIC_TOKEN_DESTROY_SUBJECT,
            useFactory: getDestroySubject,
            deps: [
                ACOUSTIC_TOKEN_WINDOW,
            ]
        }
    ],
})
export class AcNgDestroySubjectModule { }
