import {
  createChalkLoggerService,
  createReadDirectory,
  createReadTextFile,
  logFileDescriptor,
  writeFiles
} from '@acoustic-content-sdk/tooling';
import { generateTypes } from '@acoustic-content-sdk/tooling-types';
import { NOOP_LOGGER_SERVICE, rxPipe } from '@acoustic-content-sdk/utils';
import { Command } from 'commander';
import { join, normalize } from 'path';
import { cwd } from 'process';

import { splitParams } from './utils';

export const GENERATE_TYPES_COMMAND = 'generate-types';

/**
 * Generates typings and helper methods based on a set of content type definitions.
 *
 * @param program
 */
export function generateTypesCommand(program: Command): Command {
  // register our commands
  const cmd = program
    .command(GENERATE_TYPES_COMMAND)
    .description(
      'Generates typings and helper methods based on a set of content type definitions.'
    )
    .option('--data <data>', 'Location of the data directory.')
    .option(
      '--dir <dir>',
      'Location of the target directory. Defaults to the "src" directory.'
    )
    .option(
      '--include <include>',
      'Regular expression of the types to include.'
    )
    .option(
      '--exclude <exclude>',
      'Regular expression of the types to exclude.'
    )
    .action(() => {
      // service
      const logSvc = program.verbose
        ? createChalkLoggerService()
        : NOOP_LOGGER_SERVICE;
      // logger
      const logger = logSvc.get(cmd.name());
      // write callback
      const currentDir = cwd();
      const dataDir = normalize(cmd.data || join(currentDir, 'data'));
      // target dire
      const dstDir = normalize(cmd.dir || join(currentDir, 'src'));
      // log this
      logger.info('dataDir', dataDir);
      logger.info('dstDir', dstDir);
      // execute the command
      const command = generateTypes({
        data: '/',
        include: splitParams(cmd.include),
        exclude: splitParams(cmd.exclude)
      });
      // execute the command
      const files$ = rxPipe(
        command(
          createReadDirectory(dataDir),
          createReadTextFile(dataDir),
          logSvc
        ),
        writeFiles(dstDir),
        logFileDescriptor()
      );
      // subscribe
      return files$.toPromise();
    });

  // ok
  return cmd;
}
