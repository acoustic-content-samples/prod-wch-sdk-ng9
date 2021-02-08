import {ReactReduxContext, ReactReduxContextValue} from 'react-redux';
import {Context} from "react";

/**
 * Injection token for the {@link https://react-redux.js.org/|react redux} store
 */
export const ACOUSTIC_CONTEXT_REACT_REDUX: Context<ReactReduxContextValue> = ReactReduxContext;
