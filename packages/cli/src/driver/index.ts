import { createVersionString } from '@acoustic-content-sdk/api';
import { Command } from 'commander';
import { argv } from 'process';

import { canonicalizeAssetsCommand } from '../commands/canonicalize.assets';
import { generateDataOverlayCommand } from '../commands/generate.data.overlay';
import { generateKeysCommand } from '../commands/generate.keys';
import { generateLayoutCommand } from '../commands/generate.layout';
import { generateLayoutsCommand } from '../commands/generate.layouts';
import { generateMessagesCommand } from '../commands/generate.messages';
import { versionCommand } from '../commands/version';
import { VERSION } from '../version';

const NAME = 'acoustic-content-sdk-cli';

export function runProgram(aArgs: string[] = argv) {
  // construct the wrapper
  const program = new Command(NAME)
    .version(createVersionString(VERSION))
    .option('-v, --verbose', 'print additional logs');

  versionCommand(program);
  generateLayoutsCommand(program);
  generateLayoutCommand(program);
  generateKeysCommand(program);
  generateDataOverlayCommand(program);
  generateMessagesCommand(program);
  canonicalizeAssetsCommand(program);

  return program.parse(aArgs);
}
