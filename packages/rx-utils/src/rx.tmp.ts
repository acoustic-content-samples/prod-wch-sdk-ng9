import { file } from 'tmp';
import { createFromCallback } from './rx.node';

// export the creator
export const rxTmpFile = createFromCallback<string>(file);
