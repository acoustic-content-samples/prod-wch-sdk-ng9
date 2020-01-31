## API Report File for "@acoustic-content-sdk/redux-feature-login"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { Action } from 'redux';
import { Generator } from '@acoustic-content-sdk/utils';
import { OperatorFunction } from 'rxjs';
import { PayloadAction } from '@acoustic-content-sdk/redux-store';
import { UnaryFunction } from 'rxjs';

// @public (undocumented)
export const ACTION_CHECKED_LOGGED_IN = "ACTION_CHECKED_LOGGED_IN";

// @public (undocumented)
export const ACTION_FEDERATED_LOGIN = "ACTION_FEDERATED_LOGIN";

// @public (undocumented)
export const ACTION_LOGGED_IN = "ACTION_LOGGED_IN";

// @public (undocumented)
export const ACTION_LOGGED_OUT = "ACTION_LOGGED_OUT";

// @public (undocumented)
export const ACTION_PASSWORD_LOGIN = "ACTION_PASSWORD_LOGIN";

// @public (undocumented)
export type CheckLoggedInAction = Action;

// @public
export const checkLoggedInAction: Generator<CheckLoggedInAction>;

// @public (undocumented)
export type FederatedLoginAction = Action;

// @public
export const federatedLoginAction: Generator<FederatedLoginAction>;

// @public (undocumented)
export type LoggedInAction = Action;

// @public
export const loggedInAction: Generator<LoggedInAction>;

// @public
export const loggedInFeature: import("@acoustic-content-sdk/redux-store").ReduxFeatureModule<boolean, LoggedInFeatureState, import("redux").AnyAction, import("redux").AnyAction, any>;

// @public (undocumented)
export const loggedInFeatureReducer: {
    [LOGIN_FEATURE]: import("redux").Reducer<boolean, import("redux").AnyAction>;
};

// @public (undocumented)
export interface LoggedInFeatureState {
    // Warning: (ae-forgotten-export) The symbol "LoggedInState" needs to be exported by the entry point public_api.d.ts
    //
    // (undocumented)
    [LOGIN_FEATURE]: LoggedInState;
}

// @public (undocumented)
export type LoggedOutAction = Action;

// @public
export const loggedOutAction: Generator<LoggedOutAction>;

// @public
export interface LoginCredentials {
    password: string;
    username: string;
}

// @public
export const nextLogin: OperatorFunction<NextLoginReduxState, boolean>;

// @public (undocumented)
export interface NextLoginReduxState extends LoggedInFeatureState {
}

// @public (undocumented)
export type PasswordLoginAction = PayloadAction<LoginCredentials>;

// @public
export const passwordLoginAction: UnaryFunction<LoginCredentials, PasswordLoginAction>;

// @public
export const selectLoggedInFeature: import("rxjs").UnaryFunction<Record<string, any>, boolean>;

// @public
export const VERSION: {
    version: {
        major: string;
        minor: string;
        patch: string;
    };
    build: Date;
};


// Warnings were encountered during analysis:
//
// dist/state/login/login.feature.d.ts:11:5 - (ae-forgotten-export) The symbol "LOGIN_FEATURE" needs to be exported by the entry point public_api.d.ts

```