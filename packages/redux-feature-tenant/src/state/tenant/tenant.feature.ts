import { selectFeature } from '@acoustic-content-sdk/redux-store';

import { TENANT_FEATURE } from './tenant.id';
import { tenantReducer, TenantState } from './tenant.state';

/**
 */
export interface TenantFeatureState {
  [TENANT_FEATURE]: TenantState;
}

/**
 */
export const tenantFeatureReducer = {
  [TENANT_FEATURE]: tenantReducer
};

/**
 * Select the tenant feature
 */
export const selectTenantFeature = selectFeature<TenantState>(TENANT_FEATURE);
