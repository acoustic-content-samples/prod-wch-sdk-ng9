import { createVersionString } from '@acoustic-content-sdk/api';
import { createChalkLoggerService } from '@acoustic-content-sdk/tooling';
import { Command } from 'commander';

import { MODULE, VERSION } from '../version';

export function versionCommand(program: Command): Command {
  // default
  const cmd = program
    .command('version', { isDefault: true })
    .description('Show version info.')
    .action(() => {
      // logger
      const logSvc = createChalkLoggerService();
      const logger = logSvc.get(cmd.name());
      // version
      logger.info(MODULE, createVersionString(VERSION));
    });
  // ok
  return cmd;
}
