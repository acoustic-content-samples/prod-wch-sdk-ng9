import { Logger, LoggerService } from '@acoustic-content-sdk/api';
import { bindMember, mapArray, NOOP_LOGGER_SERVICE } from '@acoustic-content-sdk/utils';
import { addLayout, configure, getLogger } from 'log4js';
import { join, normalize } from 'path';

export function createLoggerServiceMock(): LoggerService {
  return NOOP_LOGGER_SERVICE;
}

// needed because not all test cases use jsdom, instanceof Element is then failing
function isElement(data: any): data is Element {
  try {
    return data instanceof Element;
  } catch (e) {
    return false;
  }
}

function isFunction(data: any): data is Function {
  try {
    return data instanceof Function;
  } catch (e) {
    return false;
  }
}

function elementToString(data: Element) {
  return `<${data.nodeName.toLowerCase()}${(data.attributes.length > 0
    ? ' '
    : '') +
    mapArray(
      Array.from(data.attributes),
      (attribute) => `${attribute.name}="${attribute.value}"`
    ).join(' ')}>...</${data.nodeName.toLowerCase()}>`;
}

let LOG4JS_CONFIGURED = false;

function stringifyHelper(data: any): string {
  if (isElement(data)) {
    return elementToString(data);
  } else if (isFunction(data)) {
    return `function ${data.name}()`;
  } else if (typeof data === 'object') {
    // prevent type error circular structure
    const cache = [];
    return JSON.stringify(data, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (isElement(value)) {
          return elementToString(value);
        } else if (cache.indexOf(value) !== -1) {
          // Duplicate reference found
          try {
            // If this value does not reference a parent it can be deduped
            return JSON.parse(JSON.stringify(value));
          } catch (error) {
            // discard key if value cannot be deduped
            return;
          }
        }
        // Store value in our collection
        cache.push(value);
      }
      return value;
    });
  }
  return data;
}

export function createLog4jsLoggerService(): LoggerService {
  // make sure to configure log4js once
  if (!LOG4JS_CONFIGURED) {
    addLayout('json', (config) => (logEvent) => {
      // build prefix
      const prefix = `[${logEvent.startTime
        .toISOString()
        .substring(11, 23)}] [${logEvent.level}] [${logEvent.categoryName}]`;

      // build message string
      const message = `${logEvent.data[0]}`;

      // build comma-separated parameter string
      logEvent.data.splice(0, 1);
      const params =
        logEvent.data.length > 0
          ? logEvent.data
              .map((data) => stringifyHelper(data))
              .reduce((previousValue, currentValue) => {
                return `${previousValue}, ${currentValue}`;
              })
          : '';

      return `${prefix} - ${message} ${params ? '(' + params + ')' : ''}`;
    });

    // target dir
    const dstPath = normalize(join(__dirname, '..', '..', 'test'));

    const defaultLoggingConfig = {
      appenders: {
        test: {
          type: 'multiFile',
          base: dstPath,
          property: 'categoryName',
          extension: '.log',
          layout: {
            type: 'json'
          },
          maxLogSize: 20 * 1024 * 1024,
          backups: 3
        }
      },
      categories: {
        default: { appenders: ['test'], level: 'all' }
      }
    };

    const consoleLoggingConfig = {
      appenders: {
        console: {
          type: 'stdout',
          layout: {
            type: 'json'
          }
        }
      },
      categories: {
        default: { appenders: ['console'], level: 'all' }
      }
    };

    // configure our appender
    if (process.env.LOG_CONSOLE) {
      configure(consoleLoggingConfig);
    } else {
      configure(defaultLoggingConfig);
    }
    LOG4JS_CONFIGURED = true;
  }
  // wrap the logger
  function wrapLogger(aLog4JsLogger: any): Logger {
    return {
      info: bindMember(aLog4JsLogger, 'info'),
      warn: bindMember(aLog4JsLogger, 'warn'),
      error: bindMember(aLog4JsLogger, 'error')
    };
  }
  // directly return the (compatible) log4js API
  return { get: (name) => wrapLogger(getLogger(name)) };
}
