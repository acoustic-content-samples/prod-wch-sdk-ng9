import { ComponentTypeRef } from '@acoustic-content-sdk/react-api';
import { isEqual } from '@acoustic-content-sdk/utils';
import { MonoTypeOperatorFunction } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

export const { defineProperties } = Object;

export const isEqualComponentTypeRef: (
  aLeft: ComponentTypeRef,
  aRight: ComponentTypeRef
) => boolean = isEqual;

export const opDistinctComponentTypeRef: MonoTypeOperatorFunction<ComponentTypeRef<
  any
>> = distinctUntilChanged(isEqualComponentTypeRef);
