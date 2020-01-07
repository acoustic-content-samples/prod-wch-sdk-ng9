import { createVersionString } from '@acoustic-content-sdk/api';
import { Command } from 'commander';
import { argv } from 'process';

import { VERSION } from '../version';
import { generateComponentCommand } from './commands/generate.component';
import { generateStateCommand } from './commands/generate.state';
import { versionCommand } from './commands/version';

const NAME = 'acoustic-content-sdk-react-cli';

export function runProgram(aArgs: string[] = argv) {
  // construct the wrapper
  const program = new Command(NAME)
    .version(createVersionString(VERSION))
    .option('-v, --verbose', 'print additional logs');

  // register our commands
  versionCommand(program);
  generateComponentCommand(program);
  generateStateCommand(program);

  program.parse(aArgs);
}
