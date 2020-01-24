import { Logger } from '@acoustic-content-sdk/api';

import { noop } from './../misc';

/* Copyright IBM Corp. 2018 */
/**
 * Logger that really does not log anything
 */
export const NOOP_LOGGER: Logger = {
  info: noop,
  warn: noop,
  error: noop
};
