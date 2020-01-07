import { FC } from 'react';
import * as React from 'react';

import {
  ReactLoggerConfig,
  WCH_CONTEXT_REACT_LOGGER_CONFIG
} from './wch.logger.config';

/**
 * Module that exposes the `WCH_CONTEXT_REACT_LOGGER_CONFIG` token.
 */
export const WchReactLoggerConfigModule: FC<ReactLoggerConfig> = ({
  onlyModules,
  onlyLevel,
  children
}) => (
  <WCH_CONTEXT_REACT_LOGGER_CONFIG.Provider value={{ onlyModules, onlyLevel }}>
    {children}
  </WCH_CONTEXT_REACT_LOGGER_CONFIG.Provider>
);
