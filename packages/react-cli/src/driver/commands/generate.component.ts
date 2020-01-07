import {
  createChalkLoggerService,
  logFileDescriptor,
  writeFiles
} from '@acoustic-content-sdk/tooling';
import { NOOP_LOGGER_SERVICE, rxPipe } from '@acoustic-content-sdk/utils';
import { generateComponent } from '@acoustic-content-sdk/react-tooling';
import { Command } from 'commander';
import { cwd } from 'process';

export function generateComponentCommand(program: Command): Command {
  // register our commands
  const componentCommand = program
    .command('component <name>')
    .alias('c')
    .description('Generate a react component.')
    .option('-d, --dir <directory>', 'Target directory')
    .option('--carbon', 'Include support for Carbon components')
    .option('--store', 'Include support for a redux store')
    .option('--di', 'Include support for dependency injection')
    .action((name) => {
      // service
      const logSvc = program.verbose
        ? createChalkLoggerService()
        : NOOP_LOGGER_SERVICE;
      // logger
      const logger = logSvc.get(componentCommand.name());
      // write callback
      const dstDir = componentCommand.dir || cwd();
      // some flags
      const carbon = !!componentCommand.carbon;
      const store = !!componentCommand.store;
      const di = !!componentCommand.di;
      // log this
      logger.info('dstDir', dstDir);
      // execute the command
      const cmp$ = rxPipe(
        generateComponent({ name, carbon, store, di }),
        writeFiles(dstDir),
        logFileDescriptor()
      );
      // subscribe
      return cmp$.toPromise();
    });

  return componentCommand;
}
