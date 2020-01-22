import {
  createChalkLoggerService,
  createReadDirectory,
  createReadTextFile,
  generateDataOverlay,
  logFileDescriptor,
  writeFiles
} from '@acoustic-content-sdk/tooling';
import { NOOP_LOGGER_SERVICE, rxPipe } from '@acoustic-content-sdk/utils';
import { Command } from 'commander';
import { parse } from 'path';
import { cwd } from 'process';
import { getFullPath } from './utils';

export const GENERATE_DATA_OVERLAY_COMMAND = 'generate-data-overlay';

export function generateDataOverlayCommand(program: Command): Command {
  // register our commands
  const cmd = program
    .command(`${GENERATE_DATA_OVERLAY_COMMAND}`)
    .description(
      'Generates an overlay of wchtools data folders for referenced modules.'
    )
    .option(
      '--dir <dir>',
      'Location of the target directory. Defaults to "temp".'
    )
    .option(
      '--src <dir>',
      'Location of the directory that contains the package.json to analyze. Defaults to the current working directory.'
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
      // target dir
      const dstDir = getFullPath(currentDir, cmd.dir || 'temp');
      // source dir
      const srcDir = getFullPath(currentDir, cmd.src || '');
      // log this
      logger.info('srcDir', srcDir, 'dstDir', dstDir);
      // root
      const { root: srcRoot } = parse(srcDir);
      const { root: dstRoot } = parse(dstDir);
      // execute the command
      const command = generateDataOverlay({
        src: srcDir
      });
      // execute the command
      const files$ = rxPipe(
        command(
          createReadTextFile(srcRoot),
          createReadDirectory(dstRoot),
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
