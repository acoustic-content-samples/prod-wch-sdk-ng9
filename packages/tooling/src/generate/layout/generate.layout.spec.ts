import { generateLayout } from './generate.layout';
import { Schema } from './schema';
import { ASSET_ROOT } from '../../test/assets';
import { rxPipe, LAYOUT_TYPE_HANDLEBARS } from '@acoustic-content-sdk/utils';
import { join } from 'path';
import { map, switchMap } from 'rxjs/operators';
import { ReadDirectory, createReadDirectory } from '../../dir/dir';
import { createChalkLoggerService } from '../../logger/chalk.logger';

describe('generate.layout', () => {
  // read directory callback
  const readDir = createReadDirectory(ASSET_ROOT);

  const logSvc = createChalkLoggerService();

  it('should create a layout', () => {
    const opts: Schema = {
      data: 'stuart',
      templateType: LAYOUT_TYPE_HANDLEBARS,
      type: 'reactAppHBS'
    };

    const cmd = generateLayout(opts);

    const layout$ = cmd(readDir, logSvc);

    return rxPipe(layout$).toPromise();
  });
});
