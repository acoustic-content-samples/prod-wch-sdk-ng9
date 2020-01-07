import { generateState } from '@acoustic-content-sdk/react-tooling';
import {
  createChalkLoggerService,
  logFileDescriptor,
  writeFiles
} from '@acoustic-content-sdk/tooling';
import { NOOP_LOGGER_SERVICE, rxPipe } from '@acoustic-content-sdk/utils';
import { Command } from 'commander';
import { cwd } from 'process';

export function generateStateCommand(program: Command): Command {
  // register our commands
  const stateCommand = program
    .command('state <name>')
    .alias('c')
    .description('Generate a state feature.')
    .option('-d, --dir <directory>', 'Target directory')
    .action((name) => {
      // service
      const logSvc = program.verbose
        ? createChalkLoggerService()
        : NOOP_LOGGER_SERVICE;
      // logger
      const logger = logSvc.get(stateCommand.name());
      // write callback
      const dstDir = stateCommand.dir || cwd();
      // log this
      logger.info('dstDir', dstDir);
      // execute the command
      const cmp$ = rxPipe(
        generateState(name),
        writeFiles(dstDir),
        logFileDescriptor()
      );
      // subscribe
      return cmp$.toPromise();
    });

  return stateCommand;
}
