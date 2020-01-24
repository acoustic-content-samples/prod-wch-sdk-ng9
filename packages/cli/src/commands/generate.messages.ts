import {
  createChalkLoggerService,
  createReadDirectory,
  logFileDescriptor,
  writeFiles
} from '@acoustic-content-sdk/tooling';
import { generateMessages } from '@acoustic-content-sdk/tooling-messages';
import { NOOP_LOGGER_SERVICE, rxPipe } from '@acoustic-content-sdk/utils';
import { Command } from 'commander';
import { cwd } from 'process';

export const GENERATE_MESSAGES_COMMAND = 'generate-messages';

/**
 * Returns a command that generates a typescript message file from NLS JSON input sources.
 *
 * @param program - the driver
 * @return the command
 */
export function generateMessagesCommand(program: Command): Command {
  // register our commands
  const messageCommand = program
    .command(GENERATE_MESSAGES_COMMAND)
    .description('Generate translated messages.')
    .option('--src <directory>', 'Source directory')
    .option('--dir <directory>', 'Target directory')
    .option('--default <default>', 'Default locale')
    .action(() => {
      // service
      const logSvc = program.verbose
        ? createChalkLoggerService()
        : NOOP_LOGGER_SERVICE;
      // logger
      const logger = logSvc.get(messageCommand.name());
      // write callback
      const srcDir = messageCommand.src || cwd();
      const dstDir = messageCommand.dir || cwd();
      const defaultLocale = messageCommand.default;
      // log this
      logger.info('srcDir', srcDir);
      logger.info('dstDir', dstDir);
      logger.info('defaultLocale', defaultLocale);
      // read callback
      const command = generateMessages({ dir: '/', default: defaultLocale });
      // execute the command
      const cmp$ = rxPipe(
        command(createReadDirectory(srcDir), logSvc),
        writeFiles(dstDir),
        logFileDescriptor()
      );
      // subscribe
      return cmp$.toPromise();
    });

  return messageCommand;
}
