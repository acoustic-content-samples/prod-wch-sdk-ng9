import {
  rxApplyTemplates,
  rxReadTemplates
} from '@acoustic-content-sdk/hbs-tooling';
import {
  camelCase,
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

export function generateState(
  aStateName: string
): Observable<FileDescriptor<string>> {
  // assets
  const assets$ = rxPipe(
    rxFindAssetDir(),
    map((dir) => join(dir, 'state'))
  );
  // read the templates
  const templates$ = rxPipe(
    assets$,
    switchMap((dir) => rxReadTemplates(dir))
  );
  // construct the context
  const baseName = `${aStateName} State`;
  const idValue = camelCase(aStateName);
  const idConstant = constantCase(`${aStateName} Feature`);
  const idFileName = dotCase(`${aStateName} id`);
  const featureState = classCase(`${aStateName} feature state`);
  const featureReducer = camelCase(`${aStateName} feature reducer`);
  const baseState = classCase(`${aStateName} state`);
  const baseFeature = camelCase(`${aStateName} feature`);
  const baseReducer = camelCase(`${aStateName} reducer`);
  const featureFileName = dotCase(`${aStateName} feature`);
  const baseItem = classCase(`${aStateName} item`);
  const selectFeature = camelCase(`select ${aStateName} feature`);
  const selectItem = camelCase(`select ${aStateName} item`);
  const folderName = kebabCase(baseName);
  const moduleFileName = dotCase(`${aStateName} module`);
  const stateFileName = dotCase(`${aStateName} state`);
  const reducerFileName = dotCase(`${aStateName} reducer`);
  const selectorsFileName = dotCase(`${aStateName} selectors`);
  const epicFileName = dotCase(`${aStateName} epic`);
  const baseEpic = camelCase(`${aStateName} epic`);
  const actionsFileName = dotCase(`${aStateName} actions`);
  const addAction = classCase(`action add ${aStateName} item`);
  const addActionConstant = constantCase(addAction);
  const addActionCreator = camelCase(addAction);
  const setAction = classCase(`action set ${aStateName} item`);
  const setActionConstant = constantCase(setAction);
  const setActionCreator = camelCase(setAction);
  // context
  const ctx$ = of({
    featureFileName,
    setActionCreator,
    setAction,
    setActionConstant,
    addActionCreator,
    addAction,
    addActionConstant,
    actionsFileName,
    baseEpic,
    epicFileName,
    baseFeature,
    moduleFileName,
    baseItem,
    idConstant,
    folderName,
    idValue,
    idFileName,
    featureState,
    baseState,
    selectFeature,
    stateFileName,
    reducerFileName,
    baseReducer,
    featureReducer,
    selectorsFileName,
    selectItem
  });
  // combine
  return rxApplyTemplates(ctx$, templates$);
}
