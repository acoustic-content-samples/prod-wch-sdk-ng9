import { createWriteStream } from 'fs';
import { forEach, jsonStringify } from '@acoustic-content-sdk/utils';

const logFile = createWriteStream('log.txt');

export function debugLog(...aData: any[]) {
  logFile.write(new Date().toISOString());
  forEach(aData, (data) => logFile.write(`${JSON.stringify(data, null, 2)}\n`));
  logFile.write('\n');
}
