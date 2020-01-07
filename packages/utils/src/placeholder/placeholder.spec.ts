import {
  AuthoringPlaceholder,
  AuthoringType,
  ELEMENT_TYPE_TEXT,
  RenderingContext
} from '@acoustic-content-sdk/api';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import { UNDEFINED } from '../js/js.core';
import { cloneDeep, deepEquals } from '../js/js.utils';
import { isNotNil } from '../predicates/predicates';
import {
  PlaceholderResolver,
  wchInsertPlaceholders,
  wchPlaceholderFromAccessor,
  wchResolveType,
  wchTypeFromAccessor
} from './placeholder';

describe('placeholder', () => {
  // empty rendering context
  const EMPTY_RC: RenderingContext = require('./empty.rc.json');

  const TYPE_ID_1 = 'id1';
  const TYPE_ID_2 = 'id2';

  // placeholder for type 1
  const type1: RenderingContext = {
    ...EMPTY_RC,
    typeId: TYPE_ID_1,
    elements: {
      key1: {
        elementType: ELEMENT_TYPE_TEXT,
        value: 'placeholder 1'
      },
      key2: {
        elementType: ELEMENT_TYPE_TEXT,
        values: ['placeholder 2']
      }
    }
  };

  const TYPES: Record<string, RenderingContext> = {
    [TYPE_ID_1]: type1
  };

  const RC_RESOLVER: PlaceholderResolver = (ids) =>
    of(ids.map((id) => TYPES[id]).filter(isNotNil));

  const typeInfo: AuthoringType = require('./auth.type.json');

  it('should return a non existing placeholder', () => {
    const ph = wchPlaceholderFromAccessor('elements.text.value', typeInfo);

    expect(ph).toEqual({ show: true, text: 'This is some placeholder text' });
  });

  it('should return undefined for a non existing placeholder', () => {
    const ph = wchPlaceholderFromAccessor(
      'elements.noplaceholder.value',
      typeInfo
    );

    expect(ph).toBe(UNDEFINED);
  });

  it('should access a heading placeholder from a simple accessor', () => {
    // load the type
    const type: AuthoringType = wchResolveType(
      require('./design.article.type.resolved.json')
    );
    // resolve
    const acc = 'elements.heading.value';
    const plc = wchPlaceholderFromAccessor(acc, type);
    // validate
    expect(plc).toBeDefined();
    expect(plc).toHaveProperty('text', 'Headline text goes here');
  });

  it('should access a leadImageCaption placeholder from a group accessor', () => {
    // load the type
    const type: AuthoringType = wchResolveType(
      require('./design.article.type.resolved.json')
    );
    // resolve
    const acc = 'elements.mainImage.value.leadImageCaption.value';
    const plc = wchPlaceholderFromAccessor(acc, type);
    // validate
    expect(plc).toBeDefined();
    expect(plc).toHaveProperty('text', 'Image caption goes here.');
  });

  it('should access a leadImageCredit placeholder from a group accessor', () => {
    // load the type
    const type: AuthoringType = wchResolveType(
      require('./design.article.type.resolved.json')
    );
    // resolve
    const acc = 'elements.mainImage.value.leadImageCredit.value';
    const plc = wchPlaceholderFromAccessor(acc, type);
    // validate
    expect(plc).toBeDefined();
    expect(plc).toHaveProperty('text', 'Photographer Name');
  });

  it('should resolve the design article auth type', () => {
    // load the type
    const type: AuthoringType = require('./design.article.type.resolved.json');
    // resolve
    const resolved = wchResolveType(type);
    // sanity checks
    expect(resolved).toBeDefined();
    expect(resolved).not.toBe(type);
  });

  it('should extend existing text context', () => {
    const resolver = RC_RESOLVER;
    const srcRc = { ...EMPTY_RC, typeId: TYPE_ID_1 };

    srcRc.elements = {
      key1: {
        elementType: ELEMENT_TYPE_TEXT,
        value: 'existing value'
      },
      key2: {
        elementType: ELEMENT_TYPE_TEXT,
        values: ['v1', 'v2']
      }
    };

    const rcClone = cloneDeep(srcRc);

    expect(deepEquals(rcClone, srcRc)).toBeTruthy();

    const onResult = wchInsertPlaceholders(srcRc, resolver);

    return onResult
      .pipe(
        map((rc) => {
          // check that the original has not changed
          expect(deepEquals(rcClone, srcRc)).toBeTruthy();
          // test the augmented context
          expect(rc).toHaveProperty('elements.key1.value', 'existing value');
          expect(rc).not.toHaveProperty('elements.key1.$$PLACEHOLDER', true);
          expect(rc).toHaveProperty('elements.key2.values', [
            'placeholder 2',
            'v1',
            'placeholder 2',
            'v2',
            'placeholder 2'
          ]);
          expect(rc).toHaveProperty('elements.key2.$$PLACEHOLDER', [
            -1,
            0,
            -1,
            1,
            -1
          ]);
        })
      )
      .toPromise();
  });

  it('should get the element type', () => {
    const accessor = 'elements.text.value';

    const type: string = wchTypeFromAccessor(accessor, typeInfo);

    expect(type).toBe('text');
  });

  it('should fail for top level elements', () => {
    const accessor = 'name';

    const plc: AuthoringPlaceholder = wchPlaceholderFromAccessor(
      accessor,
      typeInfo
    );

    expect(plc).not.toBeDefined();
  });

  it('should decode a fail gracefully for non existing accessor', () => {
    const accessor = 'elements.text1.value';

    const plc: AuthoringPlaceholder = wchPlaceholderFromAccessor(
      accessor,
      typeInfo
    );

    expect(plc).not.toBeDefined();
  });

  it('should decode a placeholder from accessor', () => {
    const accessor = 'elements.text.value';

    const plc: AuthoringPlaceholder = wchPlaceholderFromAccessor(
      accessor,
      typeInfo
    );

    expect(plc).toBeDefined();
  });

  it('should extend empty text context', () => {
    const resolver = RC_RESOLVER;
    const srcRc = { ...EMPTY_RC, typeId: TYPE_ID_1 };

    const rcClone = cloneDeep(srcRc);

    expect(deepEquals(rcClone, srcRc)).toBeTruthy();

    const onResult = wchInsertPlaceholders(srcRc, resolver);

    return onResult
      .pipe(
        map((rc) => {
          // check that the original has not changed
          expect(deepEquals(rcClone, srcRc)).toBeTruthy();
          // test the augmented context
          expect(rc).toHaveProperty('elements.key1.value', 'placeholder 1');
          expect(rc).toHaveProperty('elements.key1.$$PLACEHOLDER', true);
          expect(rc).toHaveProperty('elements.key2.values', ['placeholder 2']);
          expect(rc).toHaveProperty('elements.key2.$$PLACEHOLDER', [-1]);
        })
      )
      .toPromise();
  });
});
