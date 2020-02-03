import {
  createChalkLoggerService,
  createReadTextFile,
  logFileDescriptor,
  writeFiles
} from '@acoustic-content-sdk/tooling';
import { generateFeatureModule } from '@acoustic-content-sdk/tooling-feature-module';
import { NOOP_LOGGER_SERVICE, rxPipe } from '@acoustic-content-sdk/utils';
import { Command } from 'commander';
import { cwd } from 'process';
import { ignoreElements } from 'rxjs/operators';

import { getFullPath } from './utils';

export const GENERATE_FEATURE_MODULE_COMMAND = 'generate-feature-module';

/**
 *
 *
 * @param program - the commander instance to attach the command to
 * @returns the commander instance
 */
export function generateFeatureModuleCommand(program: Command): Command {
  // register our commands
  const cmd = program
    .command(`${GENERATE_FEATURE_MODULE_COMMAND}`)
    .description('Adds support for the ng-add schematic to feature modules.')
    .option(
      '--src <dir>',
      'Location of the directory that contains the package.json to analyze. Defaults to the current working directory.'
    )
    .requiredOption(
      '--module <modules>',
      'NgModule to export from the feature module. May be a comma separated list.'
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
      // module
      const module = cmd.module;
      // source dir
      const srcDir = getFullPath(currentDir, cmd.src || '');
      // log this
      logger.info('module', module);
      logger.info('srcDir', srcDir);
      // execute the command
      const command = generateFeatureModule({
        module
      });
      // execute the command
      const files$ = rxPipe(
        command(createReadTextFile(srcDir), logSvc),
        writeFiles(srcDir),
        logFileDescriptor(),
        ignoreElements()
      );
      // subscribe
      return files$.toPromise();
    });

  // ok
  return cmd;
}
