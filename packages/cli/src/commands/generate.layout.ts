import {
  createChalkLoggerService,
  createReadDirectory,
  generateLayout,
  logFileDescriptor,
  writeFiles
} from '@acoustic-content-sdk/tooling';
import { NOOP_LOGGER_SERVICE, rxPipe } from '@acoustic-content-sdk/utils';
import { Command } from 'commander';
import { join, normalize } from 'path';
import { cwd } from 'process';
import { ignoreElements } from 'rxjs/operators';

import { splitParams } from './utils';

export const GENERATE_LAYOUT_COMMAND = 'generate-layout';

export function generateLayoutCommand(program: Command): Command {
  // register our commands
  const cmd = program
    .command(`${GENERATE_LAYOUT_COMMAND} [name]`)
    .description('Generates a layout for a particular content type.')
    .option('--data <data>', 'Location of the data directory.')
    .requiredOption('--type <type>', 'Name or ID of the type.')
    .option(
      '--dir <dir>',
      'Location of the target directory. Defaults to the data directory.'
    )
    .option(
      '--templateType <templateType>',
      'Type of the rendering template to use, can be "angular" or "handlebars".'
    )
    .option('--tags <tags>', 'Tags to add to the new layouts.')
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
      const command = generateLayout({
        data: '/',
        type: cmd.type,
        name: aLayoutName,
        tags: splitParams(cmd.tags),
        templateType: cmd.templateType
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
