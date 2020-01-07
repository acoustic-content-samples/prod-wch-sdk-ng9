import {
  createIdentifier,
  PayloadAction
} from '@acoustic-content-sdk/redux-store';
import { Generator } from '@acoustic-content-sdk/utils';
import { Action } from 'redux';
import { createAction } from 'redux-actions';
import { UnaryFunction } from 'rxjs';
import { SITE_FEATURE } from './site.id';
import { SiteItem } from './site.state';

/**
 * Adds a `SiteItem` to the system. This action will dispatch
 * to the `ACTION_SET_DEFAULT_SITE_ITEM` action. It is safe to register side
 * effects on `ACTION_ADD_DEFAULT_SITE_ITEM`.
 */
export const ACTION_ADD_DEFAULT_SITE = createIdentifier(
  SITE_FEATURE,
  'ACTION_ADD_DEFAULT_SITE'
);
export type ActionAddDefaultSite = PayloadAction<SiteItem>;

export const actionAddDefaultSite: UnaryFunction<
  SiteItem,
  ActionAddDefaultSite
> = createAction(ACTION_ADD_DEFAULT_SITE);

/**
 * Adds a `SiteItem` to the system. This action will trigger
 * the actual reducer. Make sure to NOT add side effects to
 * this `ACTION_SET_DEFAULT_SITE_ITEM`.
 */
export const ACTION_SET_DEFAULT_SITE = createIdentifier(
  SITE_FEATURE,
  'ACTION_SET_DEFAULT_SITE'
);
export type ActionSetDefaultSite = PayloadAction<SiteItem>;

export const actionSetDefaultSite: UnaryFunction<
  SiteItem,
  ActionSetDefaultSite
> = createAction(ACTION_SET_DEFAULT_SITE);

export const ACTION_CLEAR_DEFAULT_SITE = createIdentifier(
  SITE_FEATURE,
  'ACTION_CLEAR_DEFAULT_SITE'
);
export type ActionClearDefaultSite = Action;

export const actionClearDefaultSite: Generator<ActionClearDefaultSite> = createAction(
  ACTION_CLEAR_DEFAULT_SITE
);

export const ACTION_GUARANTEE_DEFAULT_SITE = createIdentifier(
  SITE_FEATURE,
  'ACTION_GUARANTEE_DEFAULT_SITE'
);
export type GuaranteeDefaultSiteAction = Action;

/**
 * Loads the default site if it does not exist
 *
 * @returns the action
 */
export const guaranteeDefaultSiteAction: Generator<GuaranteeDefaultSiteAction> = createAction(
  ACTION_GUARANTEE_DEFAULT_SITE
);

export const ACTION_LOAD_DEFAULT_SITE = createIdentifier(
  SITE_FEATURE,
  'ACTION_LOAD_DEFAULT_SITE'
);
export type LoadDefaultSiteAction = Action;

/**
 * Loads the default site if it does not exist
 *
 * @returns the action
 */
export const loadDefaultSiteAction: Generator<LoadDefaultSiteAction> = createAction(
  ACTION_LOAD_DEFAULT_SITE
);
