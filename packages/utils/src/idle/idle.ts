import { FUNCTION_TYPE } from './../js/js.utils';

/** Copyright IBM Corp. 2017 */
let _setCallback: (aFct: Function) => number;
let _cancelCallback: (aHandle: number) => void;

declare var requestIdleCallback: (aCallback: Function) => number;
declare var cancelIdleCallback: (aHandle: number) => void;

/**
 * Make sure not to bail out with a reference error
 */
if ((typeof requestIdleCallback === FUNCTION_TYPE) && (typeof cancelIdleCallback === FUNCTION_TYPE)) {
    // extract the functions
    const _requestIdleCallback = requestIdleCallback;
    const _cancelIdleCallback = cancelIdleCallback;
    // set
    _setCallback = (aFct: Function) => _requestIdleCallback(aFct);
    _cancelCallback = (aHandle: number) => _cancelIdleCallback(aHandle);
} else {
    // fallback to timeout
    _setCallback = (aFct: Function) => setTimeout(aFct, 10);
    _cancelCallback = (aHandle: number) => clearTimeout(aHandle);
}

export {
    _setCallback as executeLater,
    _cancelCallback as cancelExecuteLater,
};
