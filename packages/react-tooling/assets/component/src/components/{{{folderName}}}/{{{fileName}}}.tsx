import { LoggerService } from '@acoustic-content-sdk/api';
import { rxComponent, StateFunction } from '@acoustic-content-sdk/react-utils';
import {
  NOOP_LOGGER_SERVICE,
  rxNext,
  rxPipe,
  rxSelectProperty
} from '@acoustic-content-sdk/utils';
import { MonoTypeOperatorFunction } from 'rxjs';
import { map, switchMap, startWith } from 'rxjs/operators';
{{#if useCarbon}}
import { settings } from 'carbon-components';
{{/if}}
{{#if useStore}}
import { ReduxRootStore, rxStore, rxSelect } from '@acoustic-content-sdk/redux-store';
{{/if}}

import { FC } from 'react';
import * as React from 'react';

export interface {{{componentName}}}Properties {
  {{#if useStore}}
  // redux store
  store: ReduxRootStore;
  {{/if}}
    // some logging
  logSvc?: LoggerService;
}

export interface {{{componentName}}}State {
}

const LOGGER = '{{{componentName}}}';
{{#if useCarbon}}

/**
 * Use this value instead of hardcoding `bx` in your styles
 */
const PREFIX: string = settings.prefix;
{{/if}}

/**
 * The view component
 */
const ViewComponent: FC<{{{componentName}}}State> = (props) => <div>{{{componentName}}} works!</div>;

/** The controller  */
const controller: StateFunction<{{{componentName}}}Properties, {{{componentName}}}State> = (props$) => {
  {{#if useStore}}
  // access the store
  const store$ = rxPipe(
    props$,
    rxSelectProperty('store'),
    switchMap(rxStore)
  );
  {{/if}}
    // derive the state from the props
  return rxPipe(props$,
    map(props => ({})),
    startWith({})
  );
}

export const {{{componentName}}}  = rxComponent(controller, ViewComponent);
