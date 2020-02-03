import {
  canonicalizeAssets,
  createChalkLoggerService,
  createReadDirectory,
  logFileDescriptor,
  writeFiles
} from '@acoustic-content-sdk/tooling';
import { NOOP_LOGGER_SERVICE, rxPipe } from '@acoustic-content-sdk/utils';
import { Command } from 'commander';
import { join, normalize } from 'path';
import { cwd } from 'process';
import { ignoreElements } from 'rxjs/operators';

import { splitParams } from './utils';

export const CANONICALIZE_ASSETS = 'canonicalize-assets';

export function canonicalizeAssetsCommand(program: Command): Command {
  // register our commands
  const cmd = program
    .command(CANONICALIZE_ASSETS)
    .description('Rewrites the wchtools data folder in a canonical format.')
    .option('--data <data>', 'Location of the data directory.')
    .option(
      '--dir <dir>',
      'Location of the target directory. Defaults to the data directory.'
    )
    .option(
      '--include <include>',
      'Regular expression of the types to include.'
    )
    .option(
      '--exclude <exclude>',
      'Regular expression of the types to exclude.'
    )
    .action((aLayoutName) => {
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
      const dstDir = normalize(cmd.dir || dataDir);
      // log this
      logger.info('dataDir', dataDir, 'dstDir', dstDir);
      // execute the command
      const command = canonicalizeAssets({
        data: '/',
        include: splitParams(cmd.include),
        exclude: splitParams(cmd.exclude)
      });
      // execute the command
      const files$ = rxPipe(
        command(createReadDirectory(dataDir), logSvc),
        writeFiles(dstDir),
        logFileDescriptor(),
        ignoreElements()
      );
      // subscribe
      return files$.toPromise();
    });

  // ok
  return cmd;
}
