import {
  WchInlineEditRegistrationResult,
  WchInlineEditServiceV2
} from '@acoustic-content-sdk/edit-api';
import { constGenerator } from '@acoustic-content-sdk/utils';
import { EMPTY, noop, Observable, of } from 'rxjs';

/**
 * Creates an empty registration result as fallback
 */
function _createEmptyRegistration(): WchInlineEditRegistrationResult {
  return {
    on: noop,
    off: noop,
    dispose: noop
  };
}

// default fallback for unknown registrations
const EMPTY_REGISTRATION = _createEmptyRegistration();

/**
 * Dummy callback
 *
 * @param aName
 */
const fromEvent: <T>() => Observable<T> = constGenerator(EMPTY);

/**
 * Registers a dummy component
 *
 * @param nativeElement - the native element
 * @param accessor - the accesor
 * @param onRenderingContext - rendering context
 */
const registerComponent = constGenerator(of(EMPTY_REGISTRATION));

// fallback implementation in case the edit services have not been deployed
export const EMPTY_WCH_INLINE_EDIT_SERVICE: WchInlineEditServiceV2 = {
  registerComponent,
  fromEvent
};
