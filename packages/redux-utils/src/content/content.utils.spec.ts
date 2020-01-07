import { AuthoringContentItem, User } from '@acoustic-content-sdk/api';
import { rxReadJsonFile } from '@acoustic-content-sdk/rx-utils';
import { hashRandomIdentifier, opShareLast, rxPipe } from '@acoustic-content-sdk/utils';
import { join } from 'path';
import { combineLatest, Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';

import { createUpdater, invarianceChecker } from '../update';
import { ASSET_BASE } from '../utils/assets';
import { getDeliveryId, isDraftId } from './../draft/draft.utils';
import { getValueByAccessor, updateGenericProperties } from './content.utils';

const TEST_NAME = 'content.utils';
describe(TEST_NAME, () => {
  const ASSETS = join(ASSET_BASE, 'updater');

  const DEFAULT_ITEM$: Observable<AuthoringContentItem> = rxPipe(
    rxReadJsonFile(
      join(
        ASSETS,
        'data',
        'content',
        'b3dc7b98-bd3a-4f8b-acda-dbbd909590da_cmd.json'
      )
    ),
    opShareLast
  );

  const USER$: Observable<User> = rxPipe(
    rxReadJsonFile(
      join(ASSETS, 'user-profile', 'v1', 'users', 'currentuser.json')
    ),
    opShareLast
  );

  it('should retrieve a property in a content item', () => {
    const test$ = rxPipe(
      DEFAULT_ITEM$,
      tap((item) => {
        expect(getValueByAccessor(item, 'id')).toEqual(
          'b3dc7b98-bd3a-4f8b-acda-dbbd909590da'
        );
        expect(getValueByAccessor(item, 'keywords')).toEqual([]);
        expect(getValueByAccessor(item, 'nonexisting')).toEqual(undefined);
        expect(getValueByAccessor(item, 'elements.font.elementType')).toEqual(
          'text'
        );
      })
    );
    return test$.toPromise();
  });

  it('should update a property in a content item', () => {
    // update the item
    const newValue = hashRandomIdentifier();
    const update$ = rxPipe(
      combineLatest(DEFAULT_ITEM$, USER$),
      map(([item, user]) => {
        // create an updater
        const updater = createUpdater(item);
        updateGenericProperties(updater, user);
        updater.set('elements.text.value', newValue);
        return updater.get();
      })
    );
    // invariance check
    const inv$ = rxPipe(DEFAULT_ITEM$, map(invarianceChecker));

    // validate some rules
    const test$ = rxPipe(
      combineLatest(inv$, update$, DEFAULT_ITEM$),
      map(([inv, updated, current]) => {
        expect(updated).not.toBe(current);
        expect(isDraftId(updated.id)).toBeTruthy();
        expect(getDeliveryId(updated.id)).toEqual(getDeliveryId(current.id));
        expect(updated.elements.text.value).toEqual(newValue);
        expect(inv()).toBeTruthy();
      }),
      first()
    );

    return test$.toPromise();
  });
});
