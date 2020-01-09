import { ReactNode } from 'react';

import { ReactComponent } from '../type/type.ref';

/**
 * Input properties for dynamically generated react modules
 */
export interface ReactModuleProps {
  children?: ReactNode;
}

/**
 * Type definition for the react component for a module
 */
export type ReactModule = ReactComponent<ReactModuleProps>;
