import { createVersionString } from '@acoustic-content-sdk/api';
import { createChalkLoggerService } from '@acoustic-content-sdk/tooling';
import { Command } from 'commander';

import { MODULE, VERSION } from '../../version';

export function versionCommand(program: Command): Command {
  // default
  const versionCommand = program
    .command('version', { isDefault: true })
    .description('Show version info.')
    .option('--info', 'Print environment debug info')
    .action(() => {
      // logger
      const logSvc = createChalkLoggerService();
      const logger = logSvc.get(versionCommand.name());
      // version
      logger.info(MODULE, createVersionString(VERSION));
    });

  return versionCommand;
}
