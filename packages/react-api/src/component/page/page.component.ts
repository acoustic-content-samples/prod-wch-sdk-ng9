import { RouteComponentProps } from 'react-router';

import { ComponentTypeRef } from '../../type/type.ref';
import { createReactContext } from '../../utils/context';

/**
 * Injection token for the page component
 */
export const WCH_CONTEXT_PAGE_COMPONENT = createReactContext<
  ComponentTypeRef<RouteComponentProps>
>('WCH_CONTEXT_PAGE_COMPONENT');
