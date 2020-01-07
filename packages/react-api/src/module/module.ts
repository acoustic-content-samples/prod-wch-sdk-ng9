import { ReactNode } from 'react';

import { ReactComponent } from '../type/type.ref';

export interface ReactModuleProps {
  children?: ReactNode;
}

export type ReactModule = ReactComponent<ReactModuleProps>;
