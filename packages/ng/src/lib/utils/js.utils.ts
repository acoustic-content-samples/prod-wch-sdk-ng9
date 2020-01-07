import { ComponentTypeRef } from '@acoustic-content-sdk/ng-api';
import { isEqual, isNotNil } from '@acoustic-content-sdk/utils';
import { MonoTypeOperatorFunction } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

export const { defineProperties } = Object;

export const isEqualComponentTypeRef = (
  aLeft: ComponentTypeRef<any>,
  aRight: ComponentTypeRef<any>
): boolean =>
  isEqual(aLeft, aRight) ||
  (isNotNil(aLeft) &&
    isNotNil(aRight) &&
    isEqual(aLeft.type, aRight.type) &&
    isEqual(aLeft.resolver, aRight.resolver));

export const opDistinctComponentTypeRef: MonoTypeOperatorFunction<ComponentTypeRef<
  any
>> = distinctUntilChanged(isEqualComponentTypeRef);
