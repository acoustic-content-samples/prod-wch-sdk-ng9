import { Logger } from '@acoustic-content-sdk/api';
import { UnaryFunction } from 'rxjs';

import { bindMember } from './../js/js.utils';
import { noop } from './../misc';

// method shortcuts
const _console = console;

// our default depending on the environment
export const createConsoleLogger: UnaryFunction<string, Logger> = (aName) => ({
  info: bindMember(_console, 'info', aName),
  warn: bindMember(_console, 'warn', aName),
  error: bindMember(_console, 'error', aName)
});

export const createEmptyLogger: UnaryFunction<string, Logger> = (aName) => ({
  info: noop,
  warn: noop,
  error: bindMember(_console, 'error', aName)
});
