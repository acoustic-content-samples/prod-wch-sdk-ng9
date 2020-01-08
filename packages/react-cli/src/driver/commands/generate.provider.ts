import { generateProvider } from '@acoustic-content-sdk/react-tooling';
import {
  createChalkLoggerService,
  logFileDescriptor,
  writeFiles
} from '@acoustic-content-sdk/tooling';
import { NOOP_LOGGER_SERVICE, rxPipe } from '@acoustic-content-sdk/utils';
import { Command } from 'commander';
import { cwd } from 'process';

export function generateProviderCommand(program: Command): Command {
  // register our commands
  const providerCommand = program
    .command('provider <name>')
    .alias('p')
    .description('Generate a react provider for DI.')
    .option('-d, --dir <directory>', 'Target directory')
    .option('--store', 'Include support for a redux store')
    .option(
      '--suffix',
      'Use this suffix for the provider name, default is "Service".'
    )
    .action((name) => {
      // service
      const logSvc = program.verbose
        ? createChalkLoggerService()
        : NOOP_LOGGER_SERVICE;
      // logger
      const logger = logSvc.get(providerCommand.name());
      // write callback
      const dstDir = providerCommand.dir || cwd();
      // some flags
      const store = !!providerCommand.store;
      const suffix = providerCommand.suffix;
      // log this
      logger.info('dstDir', dstDir);
      // execute the command
      const cmp$ = rxPipe(
        generateProvider({ name, suffix, store }),
        writeFiles(dstDir),
        logFileDescriptor()
      );
      // subscribe
      return cmp$.toPromise();
    });

  return providerCommand;
}
