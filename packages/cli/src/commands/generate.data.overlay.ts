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
import { parse, relative } from 'path';
import { cwd } from 'process';
import { ignoreElements } from 'rxjs/operators';

import { getFullPath } from './utils';

export const GENERATE_DATA_OVERLAY_COMMAND = 'generate-data-overlay';

/**
 * Generates a data overlay of the wchtools folders referenced by a node module and all
 * of its dependencies. The resulting folder can then be used with {@link https://www.npmjs.com/package/wchtools-cli|wchtools}.
 *
 * @param program - the commander instance to attach the command to
 * @returns the commander instance
 */
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
      const fullDstDir = getFullPath(currentDir, cmd.dir || 'temp');
      // source dir
      const fullSrcDir = getFullPath(currentDir, cmd.src || '');
      // root
      const { root: srcRoot } = parse(fullSrcDir);
      const { root: dstRoot } = parse(fullDstDir);
      // decode relative paths
      const dstDir = relative(dstRoot, fullDstDir);
      const srcDir = relative(srcRoot, fullSrcDir);
      // log this
      logger.info('srcDir', srcDir);
      logger.info('dstDir', dstDir);
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
        writeFiles(fullDstDir),
        logFileDescriptor(),
        ignoreElements()
      );
      // subscribe
      return files$.toPromise();
    });

  // ok
  return cmd;
}
