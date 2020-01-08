import {
  rxApplyTemplates,
  rxReadTemplates
} from '@acoustic-content-sdk/hbs-tooling';
import {
  classCase,
  constantCase,
  dotCase,
  FileDescriptor,
  kebabCase
} from '@acoustic-content-sdk/tooling';
import { rxPipe } from '@acoustic-content-sdk/utils';
import { join } from 'path';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { rxFindAssetDir } from '../../utils/assets';
import { GenerateProviderSchema } from './schema';

const PROVIDER_ASSET_NAME = 'di-provider';

const DEFAULT_SUFFIX = 'Service';

export function generateProvider(
  aOptions: GenerateProviderSchema
): Observable<FileDescriptor<string>> {
  // options
  const { name, store, suffix = DEFAULT_SUFFIX } = aOptions;
  // extract the base name
  const assetBase = PROVIDER_ASSET_NAME;
  // assets
  const assets$ = rxPipe(
    rxFindAssetDir(),
    map((dir) => join(dir, assetBase))
  );
  // read the templates
  const templates$ = rxPipe(
    assets$,
    switchMap((dir) => rxReadTemplates(dir))
  );
  // construct the context
  const baseName = `${name} ${suffix}`;
  const constantName = constantCase(baseName);
  const providerName = classCase(baseName);
  const folderName = kebabCase(name);
  const fileName = dotCase(baseName);
  const useStore = !!store;
  // context
  const ctx$ = of({
    useStore,
    providerName,
    folderName,
    fileName,
    constantName
  });
  // combine
  return rxApplyTemplates(ctx$, templates$);
}
