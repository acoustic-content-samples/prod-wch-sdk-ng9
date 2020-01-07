import {
  rxApplyTemplates,
  rxReadTemplates
} from '@acoustic-content-sdk/hbs-tooling';
import {
  classCase,
  dotCase,
  FileDescriptor,
  kebabCase,
  constantCase
} from '@acoustic-content-sdk/tooling';
import { rxPipe } from '@acoustic-content-sdk/utils';
import { join } from 'path';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { rxFindAssetDir } from '../../utils/assets';
import { GenerateComponentSchema } from './schema';

const COMPONENT_ASSET_NAME = 'component';
const DI_COMPONENT_ASSET_NAME = 'di-component';

export function generateComponent(
  aOptions: GenerateComponentSchema
): Observable<FileDescriptor<string>> {
  // options
  const { name, carbon, store, di } = aOptions;
  // extract the base name
  const assetBase = di ? DI_COMPONENT_ASSET_NAME : COMPONENT_ASSET_NAME;
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
  const baseName = `${name} Component`;
  const constantName = constantCase(baseName);
  const componentName = classCase(baseName);
  const folderName = kebabCase(name);
  const fileName = dotCase(baseName);
  const useCarbon = !!carbon;
  const useStore = !!store;
  // context
  const ctx$ = of({
    useStore,
    useCarbon,
    componentName,
    folderName,
    fileName,
    constantName
  });
  // combine
  return rxApplyTemplates(ctx$, templates$);
}
