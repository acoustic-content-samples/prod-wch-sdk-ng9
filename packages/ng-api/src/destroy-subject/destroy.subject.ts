import { InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Injection token for the destroy subject
 */
export const ACOUSTIC_TOKEN_DESTROY_SUBJECT = new InjectionToken<Subject<any>>('ACOUSTIC_TOKEN_DESTROY_SUBJECT');

