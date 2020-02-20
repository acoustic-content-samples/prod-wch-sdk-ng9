import {
  AuthoringLayoutMapping,
  AuthoringType,
  DeliveryContentItem,
  ExtendedContextV2,
  Layout,
  UrlConfig
} from '@acoustic-content-sdk/api';
import {
  rxReadJsonFile,
  rxReadTextFile,
  rxWalkFiles
} from '@acoustic-content-sdk/rx-utils';
import { create } from 'handlebars';
import { array, comparison, math, object } from 'handlebars-helpers';
import { JSDOM } from 'jsdom';
import { join, normalize } from 'path';
import { Observable, of, UnaryFunction } from 'rxjs';
import {
  catchError,
  filter,
  first,
  map,
  mergeMap,
  pluck,
  tap
} from 'rxjs/operators';

import { NOOP_LOGGER_SERVICE } from '../logger/noop.logger.service';
import { getPath } from '../path/path';
import { rxPipe, UNDEFINED$ } from '../rx/rx.utils';
import { parseURL } from '../url/url.utils';
import { wchGetHubInfoFromBaseURL } from '../wch/wch.utils';
import { createDeliveryContentItem } from './convert';
import { createMarkupRendererV2, MarkupTemplate } from './renderer';

function configureTextHelper(elements: any): string {
  return getPath(elements, ['text', 'value'], '');
}

function rxFindLayoutMapping(
  aRootDir: string,
  aTypeId: string
): Observable<AuthoringLayoutMapping> {
  return rxPipe(
    rxWalkFiles(aRootDir),
    filter((file) => file.stats.isFile() && file.absPath.endsWith('.json')),
    mergeMap((file) => rxReadJsonFile(file.absPath)),
    filter((data) => data.type.id === aTypeId),
    first(),
    catchError((error) => {
      console.warn('cannot find layout mapping', aTypeId);
      return UNDEFINED$;
    })
  );
}

function rxFindType(
  aRootDir: string,
  aTypeId: string
): Observable<AuthoringType> {
  return rxPipe(
    rxWalkFiles(aRootDir),
    filter((file) => file.stats.isFile() && file.absPath.endsWith('.json')),
    mergeMap((file) => rxReadJsonFile(file.absPath)),
    filter((data) => data.id === aTypeId),
    first(),
    catchError((error) => {
      console.warn('cannot find type', aTypeId);
      return UNDEFINED$;
    })
  );
}

describe('renderer.spec', () => {
  const root = normalize(join(__dirname, '..', '..', '..', '..', 'data'));

  const loggerService = NOOP_LOGGER_SERVICE;

  const logger = loggerService.get('renderer');

  // the handlebars engine
  const handlebars = create();
  object({ handlebars });
  math({ handlebars });
  comparison({ handlebars });
  array({ handlebars });
  handlebars.registerHelper('configureText', configureTextHelper);

  // loads the delivery content
  const deliveryContent: UnaryFunction<
    string,
    Observable<DeliveryContentItem>
  > = (id) =>
    rxPipe(
      rxReadJsonFile(join(root, 'content', `${id}_cmd.json`)),
      map(createDeliveryContentItem),
      tap((content) =>
        logger.info('content', JSON.stringify(content, undefined, 2))
      )
    );
  // loads the type
  const autoringType: UnaryFunction<string, Observable<AuthoringType>> = (id) =>
    rxPipe(
      rxFindType(join(root, 'types'), id),
      tap(
        (type) => logger.info('type', JSON.stringify(type, undefined, 2)),
        console.error
      )
    );
  // loads the mapping
  const layoutMapping: UnaryFunction<
    string,
    Observable<AuthoringLayoutMapping>
  > = (id) =>
    rxPipe(
      rxFindLayoutMapping(join(root, 'layout-mappings'), id),
      tap((mapping) =>
        logger.info('layout mapping', JSON.stringify(mapping, undefined, 2))
      )
    );

  // loads the layout
  const layout: UnaryFunction<string, Observable<Layout>> = (id) =>
    rxPipe(
      rxReadJsonFile(join(root, 'layouts', `${id}.json`)),
      tap((layout) =>
        logger.info('layout', JSON.stringify(layout, undefined, 2))
      )
    );
  // loads the markup template
  const template: UnaryFunction<string, Observable<MarkupTemplate>> = (id) =>
    rxPipe(
      rxReadTextFile(join(root, 'assets', id)),
      map((tmp) => handlebars.compile(tmp)),
      map((tmp) => (ctx) => {
        logger.info(id, JSON.stringify(ctx, undefined, 2));

        return of(tmp(ctx));
      })
    );
  // url config
  const hubInfo = wchGetHubInfoFromBaseURL(
    parseURL(
      'https://my.publishing-08.rtp.raleigh.ibm.com/api/4be87fd4-8f0d-4781-b88d-24b4bed5fdae'
    )
  );
  const urlConfig: UrlConfig = {
    apiUrl: parseURL(hubInfo.apiUrl),
    resourceUrl: parseURL(hubInfo.resourceUrl),
    isPreviewMode: false
  };

  const extendedContext$: Observable<ExtendedContextV2> = rxPipe(
    of(urlConfig),
    map((hub) => ({ hub, editMode: true }))
  );

  fit('should render promotion', () => {
    // instantiate our renderer
    const renderer = createMarkupRendererV2(
      deliveryContent,
      autoringType,
      layoutMapping,
      layout,
      template,
      extendedContext$,
      loggerService
    );

    // produce some markup
    const markup$ = renderer('c0b6c620-de3a-4e26-bc77-ec8a08df073a');

    return rxPipe(
      markup$,
      tap((m) => console.log(m))
    ).toPromise();
  });

  it('should include $metadata in the rendering context', () => {
    // instantiate our renderer
    const renderer = createMarkupRendererV2(
      deliveryContent,
      autoringType,
      layoutMapping,
      layout,
      template,
      extendedContext$,
      loggerService
    );

    // produce some markup
    const markup$ = renderer('816ad3ab-db34-4a76-8743-9328f841540b');

    return rxPipe(
      markup$,
      tap((m) => console.log(m))
    ).toPromise();
  });

  it('should render an email content item', () => {
    // instantiate our renderer
    const renderer = createMarkupRendererV2(
      deliveryContent,
      autoringType,
      layoutMapping,
      layout,
      template,
      extendedContext$,
      loggerService
    );
    // produce some markup
    const markup$ = renderer('afa0d56f-8b19-4ae2-847f-67a77eefb49e');

    let count = 0;

    // parse the markup
    const dom$ = rxPipe(
      markup$,
      tap((markup) => console.log(count++, markup))
    );

    return dom$.toPromise();
  });

  it('should render a content item', () => {
    // instantiate our renderer
    const renderer = createMarkupRendererV2(
      deliveryContent,
      autoringType,
      layoutMapping,
      layout,
      template,
      extendedContext$,
      loggerService
    );
    // produce some markup
    const markup$ = renderer('b76804ce-aa1e-4240-8012-b79a6f77b50b');
    // parse the markup
    const dom$ = rxPipe(
      markup$,
      map((markup) => new JSDOM(markup)),
      pluck('window', 'document'),
      tap((doc) =>
        expect(
          doc.querySelector(
            '[data-content-item-id="b76804ce-aa1e-4240-8012-b79a6f77b50b"][data-wch-editable="elements.embedded.value"]'
          )
        ).toBeDefined()
      ),
      tap((doc) =>
        expect(
          doc.querySelector(
            '[data-content-item-id="8c7076b7-ee92-4fed-a7c7-5a01361d58d7"][data-wch-editable="elements"]'
          )
        ).toBeDefined()
      )
    );

    return dom$.toPromise();
  });
});
