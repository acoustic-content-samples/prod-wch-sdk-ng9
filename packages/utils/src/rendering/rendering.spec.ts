import {
  ELEMENT_TYPE_IMAGE,
  ELEMENT_TYPE_REFERENCE,
  RenderingContext,
  RenderingContextInterceptor
} from '@acoustic-content-sdk/api';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import { cloneDeep, createGetter, deepEquals } from './../js/js.utils';
import { isArrayOf, isString } from './../predicates/predicates';
import {
  wchAddTypings,
  wchDecodeAccessor,
  wchDecodeExpression,
  wchElementFromRenderingContext,
  wchPrepareRenderingContextInterceptors,
  wchSelectAccessor
} from './rendering';

describe('rendering', () => {
  // can't use a symbol since we use this aross libraries
  const KEY_EXPRESSION = '45b01348-de92-44a0-8103-7b7dc471ad8c';

  class MyItem {
    constructor() {
      const singleGetter = () => '';
      singleGetter[KEY_EXPRESSION] = () => wchDecodeExpression('text.myField');

      const multiGetter = () => '';
      multiGetter[KEY_EXPRESSION] = () => wchDecodeExpression('texts.myFields');

      Object.defineProperty(this, 'myField', createGetter(singleGetter));
      Object.defineProperty(this, 'myFields', createGetter(multiGetter));
    }
  }

  it('should resolve a deep structure', () => {
    const data: RenderingContext = require('./kai.json');

    const acc = 'elements.rows.values[1].cells.values[0].content.values[0]';

    const el = wchElementFromRenderingContext(data, acc);

    expect(el.elementType).toBe(ELEMENT_TYPE_REFERENCE);
  });

  it('should access the element by indexed accessor', () => {
    const data: RenderingContext = require('./958db30d-a0f3-4c26-808b-54d69be15db8.json');

    const acc = 'elements.children.values[0]';

    const el = wchElementFromRenderingContext(data, acc);

    expect(el).toBeDefined();

    expect(el.elementType).toBe('group');
  });

  it('should access the group element by accessor', () => {
    const data: RenderingContext = require('./958db30d-a0f3-4c26-808b-54d69be15db8.json');

    const acc = 'elements.father.value.givenname.value';

    const el = wchElementFromRenderingContext(data, acc);

    expect(el).toBeDefined();

    expect(el.elementType).toBe('text');
  });

  it('should access the element by accessor', () => {
    const data: RenderingContext = require('./01b92f72-d730-4673-ab51-85dc14d1b5c7_cmd.json');

    const acc = 'elements.leadImageCaption.value';

    const el = wchElementFromRenderingContext(data, acc);

    expect(el).toBeDefined();

    expect(el.elementType).toBe('text');
  });

  it('should handle multiple interceptors', () => {
    const data: RenderingContext = require('./rc.json');

    const orig = cloneDeep(data);

    let idx = 0;

    const ic: RenderingContextInterceptor = {
      opRenderingContext: (opRc) =>
        opRc.pipe(
          map((rc) => ({ ...rc })),
          map((rc) => {
            rc.elements = {
              ...rc.elements,
              ...{
                [`injected_${idx++}`]: {
                  elementType: 'text',
                  value: 'injected'
                }
              }
            };
            return rc;
          })
        )
    };

    const ics = wchPrepareRenderingContextInterceptors([ic, ic]);

    expect(deepEquals(orig, data)).toBeTruthy();

    // transform
    return of([data, data])
      .pipe(
        ics.opRenderingContexts,
        map((rcs) => {
          // validate that the original value has not changed
          expect(deepEquals(orig, data)).toBeTruthy();
        })
      )
      .toPromise();
  });

  it('should handle interceptors', () => {
    const data: RenderingContext = require('./rc.json');

    const orig = cloneDeep(data);

    let idx = 0;

    const ic: RenderingContextInterceptor = {
      opRenderingContext: (opRc) =>
        opRc.pipe(
          map((rc) => ({ ...rc })),
          map((rc) => {
            rc.elements = {
              ...rc.elements,
              ...{
                [`injected_${idx++}`]: {
                  elementType: 'text',
                  value: 'injected'
                }
              }
            };
            return rc;
          })
        )
    };

    const ics = wchPrepareRenderingContextInterceptors([ic, ic]);

    expect(deepEquals(orig, data)).toBeTruthy();

    // transform
    return of(data)
      .pipe(
        ics.opRenderingContext,
        map((rc) => {
          // expect injected tokens
          expect(rc.elements).toHaveProperty('injected_0');
          expect(rc.elements).toHaveProperty('injected_1');

          // validate that the original value has not changed
          expect(deepEquals(orig, data)).toBeTruthy();
        })
      )
      .toPromise();
  });

  it('should decode an accessor expression', () => {
    const item = new MyItem();

    // direct field access
    expect(wchDecodeAccessor(item, 'myField')).toEqual(
      'elements.myField.value'
    );
    expect(wchDecodeAccessor(item, 'myField.field')).toEqual(
      'elements.myField.value.field.value'
    );
    expect(wchDecodeAccessor(item, 'myField.field1.field2')).toEqual(
      'elements.myField.value.field1.value.field2.value'
    );

    // indexed field access
    expect(wchDecodeAccessor(item, 'myFields[0]')).toEqual(
      'elements.myFields.values[0]'
    );
    expect(wchDecodeAccessor(item, 'myFields[0].field1.field2[10]')).toEqual(
      'elements.myFields.values[0].field1.value.field2.values[10]'
    );
    expect(wchDecodeAccessor(item, 'myFields[0].field1.field2')).toEqual(
      'elements.myFields.values[0].field1.value.field2.value'
    );

    // no variable defined, consider this relative to the rendering context
    expect(wchDecodeAccessor(item, 'name')).toEqual('name');
    expect(wchDecodeAccessor(item, 'tags[0]')).toEqual('tags[0]');
  });

  it('should decode an expression directly into elements', () => {
    // value and values
    expect(wchDecodeExpression('elements.myField.value')).toEqual(
      'elements.myField.value'
    );
    expect(wchDecodeExpression('id')).toEqual('id');
  });

  it('should decode an expression', () => {
    // value and values
    expect(wchDecodeExpression('text.myField')).toEqual(
      'elements.myField.value'
    );
    expect(wchDecodeExpression('texts.myField')).toEqual(
      'elements.myField.values'
    );
    expect(wchDecodeExpression('number.myField')).toEqual(
      'elements.myField.value'
    );
    expect(wchDecodeExpression('numbers.myField')).toEqual(
      'elements.myField.values'
    );
    expect(wchDecodeExpression('formattedtext.myField')).toEqual(
      'elements.myField.value'
    );
    expect(wchDecodeExpression('formattedtexts.myField')).toEqual(
      'elements.myField.values'
    );
    expect(wchDecodeExpression('datetime.myField')).toEqual(
      'elements.myField.value'
    );
    expect(wchDecodeExpression('datetimes.myField')).toEqual(
      'elements.myField.values'
    );
    expect(wchDecodeExpression('toggle.myField')).toEqual(
      'elements.myField.value'
    );
    expect(wchDecodeExpression('toggles.myField')).toEqual(
      'elements.myField.values'
    );
    expect(wchDecodeExpression('optionselection.myField')).toEqual(
      'elements.myField.value'
    );
    expect(wchDecodeExpression('optionselections.myField')).toEqual(
      'elements.myField.values'
    );
    expect(wchDecodeExpression('reference.myField')).toEqual(
      'elements.myField.value'
    );
    expect(wchDecodeExpression('references.myField')).toEqual(
      'elements.myField.values'
    );

    // direct and values
    expect(wchDecodeExpression('image.myField')).toEqual('elements.myField');
    expect(wchDecodeExpression('images.myField')).toEqual(
      'elements.myField.values'
    );
    expect(wchDecodeExpression('video.myField')).toEqual('elements.myField');
    expect(wchDecodeExpression('videos.myField')).toEqual(
      'elements.myField.values'
    );
    expect(wchDecodeExpression('file.myField')).toEqual('elements.myField');
    expect(wchDecodeExpression('files.myField')).toEqual(
      'elements.myField.values'
    );
    expect(wchDecodeExpression('link.myField')).toEqual('elements.myField');
    expect(wchDecodeExpression('links.myField')).toEqual(
      'elements.myField.values'
    );

    // single values
    expect(wchDecodeExpression('category.myField')).toEqual('elements.myField');
    expect(wchDecodeExpression('location.myField')).toEqual('elements.myField');

    // group
    expect(wchDecodeExpression('group.myField')).toEqual(
      'elements.myField.value'
    );
    expect(wchDecodeExpression('groups.myField')).toEqual(
      'elements.myField.values'
    );
  });

  it('should support category elements', () => {
    const g = require('./eed417c3-09d7-4202-a7e0-fa94970a314b.json');

    const augmented: RenderingContext = wchAddTypings(g);

    expect(augmented).toHaveProperty('elements.imagePlacement.categoryPaths');
    expect(augmented.elements.imagePlacement.categoryPaths).toEqual([
      ['Image size and placement', 'Placement', 'Left']
    ]);

    expect(augmented).toHaveProperty('category.imagePlacement.categoryPaths');
    expect(augmented.category.imagePlacement.categoryPaths).toEqual([
      ['Image size and placement', 'Placement', 'Left']
    ]);
  });

  it('should support image elements', () => {
    const g = require('./01b92f72-d730-4673-ab51-85dc14d1b5c7_cmd.json');

    const augmented: RenderingContext = wchAddTypings(g);

    // check the primitive target types
    expect(augmented).toHaveProperty('image.leadImage.renditions');
    expect(augmented).toHaveProperty('images.leadImage');

    expect(augmented).toHaveProperty('text.leadImageCaption');
    expect(augmented).toHaveProperty('text.leadImageCredit');
  });

  it('should support group elements', () => {
    const g = require('./958db30d-a0f3-4c26-808b-54d69be15db8.json');

    const augmented: RenderingContext = wchAddTypings(g);

    // check the primitive target types
    expect(augmented).toHaveProperty('datetime.marriage');
    expect(augmented).toHaveProperty('datetimes.marriage');

    // check the group types
    expect(augmented).toHaveProperty('group.father.givenname');
    expect(augmented).toHaveProperty('group.father.familyname');
    expect(augmented).toHaveProperty('group.mother.familyname');
    expect(augmented).toHaveProperty('group.mother.familyname');
    expect(augmented).toHaveProperty('group.children.familyname');
    expect(augmented).toHaveProperty('group.children.familyname');
  });

  it('should enhance the context', () => {
    const data: RenderingContext = require('./rc.json');

    expect(data).not.toHaveProperty('text', 'text1');
    expect(data).not.toHaveProperty('text', 'text2');

    const augmented: RenderingContext = wchAddTypings(data);

    expect(isString(augmented.text.text1)).toBeTruthy();
    expect(isArrayOf(augmented.texts.text1, isString)).toBeTruthy();
    expect(augmented.texts.text1).toHaveLength(1);

    expect(isString(augmented.text.text2)).toBeTruthy();
    expect(isArrayOf(augmented.texts.text2, isString)).toBeTruthy();
    expect(augmented.texts.text2).toHaveLength(2);
  });

  it('should pluck an image with extra value element', () => {
    // the 'incorrect' value accessor
    const rc: RenderingContext = require('./eed417c3-09d7-4202-a7e0-fa94970a314b.json');

    // extra value
    const acc1 = wchSelectAccessor('elements.image.value');
    expect(acc1(rc)).toHaveProperty('elementType', ELEMENT_TYPE_IMAGE);

    // direct access
    const acc2 = wchSelectAccessor('elements.image');
    expect(acc2(rc)).toHaveProperty('elementType', ELEMENT_TYPE_IMAGE);

    // text element
    const acc3 = wchSelectAccessor('elements.imageCredit.value');
    expect(acc3(rc)).toBe('Janet Guzman');
  });
});
