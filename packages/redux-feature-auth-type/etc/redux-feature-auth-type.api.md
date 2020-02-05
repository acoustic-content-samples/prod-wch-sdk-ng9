## API Report File for "@acoustic-content-sdk/redux-feature-auth-type"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { AccessorType } from '@acoustic-content-sdk/edit-api';
import { AuthoringType } from '@acoustic-content-sdk/api';
import { ELEMENT_TYPE } from '@acoustic-content-sdk/api';
import { Logger } from '@acoustic-content-sdk/api';
import { Observable } from 'rxjs';
import { OperatorFunction } from 'rxjs';
import { PayloadAction } from '@acoustic-content-sdk/redux-store';
import { Reducer } from 'redux';
import { RenderingContext } from '@acoustic-content-sdk/api';
import { SchedulerLike } from 'rxjs';
import { UnaryFunction } from 'rxjs';

// @public (undocumented)
export const ACTION_ADD_AUTH_CONTENT_TYPE = "ACTION_ADD_AUTH_CONTENT_TYPE";

// @public (undocumented)
export const ACTION_ADD_AUTH_CONTENT_TYPE_IF_NONEXISTENT = "ACTION_ADD_AUTH_CONTENT_TYPE_IF_NONEXISTENT";

// @public (undocumented)
export const ACTION_GUARANTEE_AUTH_CONTENT_TYPE = "ACTION_GUARANTEE_AUTH_CONTENT_TYPE";

// @public (undocumented)
export const ACTION_LOAD_AUTH_CONTENT_TYPE = "ACTION_LOAD_AUTH_CONTENT_TYPE";

// @public
export const ACTION_SET_AUTH_CONTENT_TYPE = "ACTION_SET_AUTH_CONTENT_TYPE";

// @public (undocumented)
export type AddAuthoringContentTypeAction = PayloadAction<AuthoringType>;

// @public (undocumented)
export const addAuthoringContentTypeAction: UnaryFunction<AuthoringType, AddAuthoringContentTypeAction>;

// @public (undocumented)
export type AddAuthoringContentTypeIfNonExistentAction = AddAuthoringContentTypeAction;

// @public
export const addAuthoringContentTypeIfNonExistentAction: UnaryFunction<AuthoringType, AddAuthoringContentTypeIfNonExistentAction>;

// @public (undocumented)
export const AUTH_TYPE_FEATURE = "authType";

// @public
export const authoringTypeFeature: import("@acoustic-content-sdk/redux-store").ReduxFeatureModule<Record<string, import("@acoustic-content-sdk/api").AuthoringType>, AuthTypeFeatureState, import("redux").AnyAction, import("redux").AnyAction, any>;

// @public
export const authoringTypeReducer: Reducer<AuthoringTypeState, AddAuthoringContentTypeAction | SetAuthoringContentTypeAction>;

// @public (undocumented)
export type AuthoringTypeState = Record<string, AuthoringType>;

// @public (undocumented)
export const authTypeFeatureReducer: {
    [AUTH_TYPE_FEATURE]: import("redux").Reducer<Record<string, import("@acoustic-content-sdk/api").AuthoringType>, import("./auth.type.actions").AddAuthoringContentTypeAction | import("./auth.type.actions").SetAuthoringContentTypeAction>;
};

// @public (undocumented)
export interface AuthTypeFeatureState {
    // (undocumented)
    [AUTH_TYPE_FEATURE]: AuthoringTypeState;
}

// @public (undocumented)
export type GuaranteeAuthoringContentTypeAction = PayloadAction<string>;

// @public
export const guaranteeAuthoringContentTypeAction: UnaryFunction<string, GuaranteeAuthoringContentTypeAction>;

// @public (undocumented)
export type LoadAuthoringContentTypeAction = PayloadAction<string>;

// @public (undocumented)
export const loadAuthoringContentTypeAction: UnaryFunction<string, LoadAuthoringContentTypeAction>;

// @public
export function rxElementType(aAuthoringTypes$: Observable<AuthoringTypeState>, aLogger: Logger, aScheduler?: SchedulerLike): UnaryFunction<AccessorType, OperatorFunction<RenderingContext, ELEMENT_TYPE>>;

// @public (undocumented)
export const selectAuthType: UnaryFunction<string, UnaryFunction<AuthoringTypeState, AuthoringType>>;

// @public
export const selectAuthTypeFeature: import("rxjs").UnaryFunction<Record<string, any>, Record<string, import("@acoustic-content-sdk/api").AuthoringType>>;

// @public (undocumented)
export type SetAuthoringContentTypeAction = PayloadAction<AuthoringType>;

// @public (undocumented)
export const setAuthoringContentTypeAction: UnaryFunction<AuthoringType, SetAuthoringContentTypeAction>;

// @public
export const VERSION: {
    version: {
        major: string;
        minor: string;
        patch: string;
    };
    build: Date;
};


```