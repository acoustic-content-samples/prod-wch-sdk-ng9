import { FC } from 'react';
import * as React from 'react';

import {
  ReactLoggerConfig,
  ACOUSTIC_CONTEXT_REACT_LOGGER_CONFIG
} from './wch.logger.config';

/**
 * Module that exposes the `ACOUSTIC_CONTEXT_REACT_LOGGER_CONFIG` token.
 */
export const WchReactLoggerConfigModule: FC<ReactLoggerConfig> = ({
  onlyModules,
  onlyLevel,
  children
}) => (
  <ACOUSTIC_CONTEXT_REACT_LOGGER_CONFIG.Provider value={{ onlyModules, onlyLevel }}>
    {children}
  </ACOUSTIC_CONTEXT_REACT_LOGGER_CONFIG.Provider>
);
