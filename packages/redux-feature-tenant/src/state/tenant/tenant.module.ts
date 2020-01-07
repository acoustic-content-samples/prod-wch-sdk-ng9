import { createReduxFeatureModule } from '@acoustic-content-sdk/redux-store';

import { loadingFeature } from '@acoustic-content-sdk/redux-feature-load';
import { loggedInFeature } from '@acoustic-content-sdk/redux-feature-login';
import { tenantEpic } from './tenant.epics';
import { TenantFeatureState } from './tenant.feature';
import { TENANT_FEATURE } from './tenant.id';
import { tenantReducer, TenantState } from './tenant.state';

/**
 * Exposes the feature module selector
 */
export const tenantFeature = createReduxFeatureModule<
  TenantState,
  TenantFeatureState
>(TENANT_FEATURE, tenantReducer, tenantEpic, [loadingFeature, loggedInFeature]);
