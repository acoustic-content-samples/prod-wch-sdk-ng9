import {
  Logger,
  LoggerFactory,
  LoggerService
} from '@acoustic-content-sdk/api';
import { arrayPush, createLoggerService } from '@acoustic-content-sdk/utils';

const now = () => Date.now();

export interface LoggingEntry {
  time: number;
  type: string;
  name: string;
  msg: string;
  data: any[];
}

declare type PerfEntries = LoggingEntry[];

interface LoggingConfig {
  startTime: number;
  regExp: RegExp;
  entries: PerfEntries;
}

function pushEntry(
  name: string,
  aConfig: LoggingConfig,
  type: string,
  msg: string,
  data: any[]
) {
  if (aConfig.regExp.test(name)) {
    arrayPush(
      { time: now() - aConfig.startTime, type, name, msg, data },
      aConfig.entries
    );
  }
}

function createPerfLogger(aName: string, aConfig: LoggingConfig): Logger {
  function error(msg: string, ...data: any[]) {
    pushEntry(aName, aConfig, 'error', msg, data);
  }

  function info(msg: string, ...data: any[]) {
    pushEntry(aName, aConfig, 'info', msg, data);
  }

  function warn(msg: string, ...data: any[]) {
    pushEntry(aName, aConfig, 'warn', msg, data);
  }

  return { error, info, warn };
}

function createPerfLoggerFactory(aConfig: LoggingConfig): LoggerFactory {
  function create(name: string): Logger {
    return createPerfLogger(name, aConfig);
  }

  return { create };
}

export interface PerfLoggerService extends LoggerService {
  enable(aRegExp: RegExp);

  entries(): LoggingEntry[];

  clear();
}

const DEFAULT_REGEXP = /$^/;

export function createPerfLoggerService(): PerfLoggerService {
  // config
  const config: LoggingConfig = {
    startTime: now(),
    regExp: DEFAULT_REGEXP,
    entries: []
  };

  // the actual service
  const logSvc = createLoggerService(createPerfLoggerFactory(config));

  const get = (name: string) => logSvc.get(name);

  const enable = (aRegExp: RegExp) => (config.regExp = aRegExp);

  const entries = () => config.entries;

  const clear = () => (config.entries = []);

  return { get, enable, entries, clear };
}
