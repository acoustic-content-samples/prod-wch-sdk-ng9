import { pluckProperty } from '@acoustic-content-sdk/utils';
import { UnaryFunction } from 'rxjs';

import { SiteItem, SiteState } from './site.state';

export const selectDefaultSite: UnaryFunction<
  SiteState,
  SiteItem
> = pluckProperty('defaultId');
