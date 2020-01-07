import { pluckProperty } from '@acoustic-content-sdk/utils';
import { UnaryFunction } from 'rxjs';

import { {{{baseState}}}, {{{baseItem}}} } from './{{{stateFileName}}}';

export const {{{selectItem}}}: (id: string, value?: {{{baseItem}}}) => UnaryFunction<{{{baseState}}}, {{{baseItem}}}> = pluckProperty;
