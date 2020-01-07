import { forEach } from '@acoustic-content-sdk/utils';
import { createWriteStream } from 'fs';

const logFile = createWriteStream('log.txt');

export function debugLog(...aData: any[]) {
  logFile.write(new Date().toISOString());
  forEach(aData, (data) => logFile.write(`${JSON.stringify(data, null, 2)}\n`));
  logFile.write('\n');
}
