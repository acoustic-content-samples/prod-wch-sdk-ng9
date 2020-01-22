import { LoggerService } from '@acoustic-content-sdk/api';
import {
  NOOP_LOGGER_SERVICE,
  rxNext,
  rxPipe,
  unary
} from '@acoustic-content-sdk/utils';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';

import {
  rxDataDirectory,
  rxGetDependencies
} from '../../dependencies/dependencies';
import { ReadDirectory } from '../../dir/dir';
import { FileDescriptor, ReadTextFile } from '../../file/file';
import { DataOverlaySchema } from './schema';

const LOGGER = 'GenerateDataOverlay';

/**
 * Generates a stream of files for all wchtools data folders references by the addressed module.
 *
 * @remarks
 *
 * The filenames are relative to the referenced data directories, so they can ba aggregated easily
 *
 * @param aOptions - options
 * @returns a function that generates the overlay
 */
export function generateDataOverlay(aOptions: DataOverlaySchema) {
  // decode the parameters
  const { src } = aOptions;

  return (
    aReadText: ReadTextFile,
    aReadDir: ReadDirectory,
    aLogSvc?: LoggerService
  ): Observable<FileDescriptor<Buffer>> => {
    // logger
    const logSvc = aLogSvc || NOOP_LOGGER_SERVICE;
    const logger = logSvc.get(LOGGER);
    // next logger
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);
    // log the file name
    const logNext = () =>
      tap<FileDescriptor<any>>(([name]) => logger.info(name));
    return rxPipe(
      // decode the dependencies
      rxGetDependencies(aReadText, src),
      // extract the data directories from the dependencies
      rxDataDirectory(aReadText),
      log('dataDir'),
      // iterate over the files in the directory
      mergeMap(unary(aReadDir)),
      logNext()
    );
  };
}
