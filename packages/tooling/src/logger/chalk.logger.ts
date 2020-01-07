import { Logger, LoggerFactory } from '@acoustic-content-sdk/api';
import { createLoggerService } from '@acoustic-content-sdk/utils';
import { red, green, magenta, gray, bold } from 'chalk';
import { MonoTypeOperatorFunction } from 'rxjs';
import { tap } from 'rxjs/operators';

import { anyToBuffer, FileDescriptor } from '../file/file';

// tslint:disable:no-console
function create(aName: string): Logger {
  // grey name
  const name = gray(aName);
  const error = (msg: string, ...data: any[]) =>
    console.log(name, bold(red(msg)), ...data);
  const info = (msg: string, ...data: any[]) =>
    console.log(name, bold(green(msg)), ...data);
  const warn = (msg: string, ...data: any[]) =>
    console.log(name, bold(magenta(msg)), ...data);
  // returns the logger
  return { error, info, warn };
}

const chalkLoggerFactory: LoggerFactory = {
  create
};

/**
 * Print the file descriptor
 *
 * @param aDesc - the descriptor
 */
function printFileLog<T>(aDesc: FileDescriptor<T>) {
  // decompose
  const [name, data] = aDesc;
  // data
  const buf = anyToBuffer(data);
  // tslint:disable-next-line:no-console
  console.info(`${green(name)} - ${buf.length} bytes`);
}

export function logFileDescriptor<T>(): MonoTypeOperatorFunction<
  FileDescriptor<T>
> {
  return tap(printFileLog);
}

/**
 * Constructs a chalk based logger
 */
export const createChalkLoggerService = () =>
  createLoggerService(chalkLoggerFactory);
