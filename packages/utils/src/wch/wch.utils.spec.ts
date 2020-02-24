import { ACOUSTIC_CONFIG_BASE_URL, ACOUSTIC_CONFIG_RESOURCE_URL } from '@acoustic-content-sdk/api';
import { JSDOM } from 'jsdom';
import { parse } from 'lucene';
import { join } from 'path';
import { map } from 'rxjs/operators';

import { ASSET_DIR } from '../../test/assets';
import { objectKeys } from '../js/js.utils';
import { rxPipe } from '../rx/rx.utils';
import { parseQueryString, parseURL, urlToString } from '../url/url.utils';
import {
  getBaseUrlFromWindow,
  mergeHubInfo,
  wchForEachRenderingContext,
  wchGetApiUrlFromResourceURL,
  wchGetApiUrlInContext,
  wchGetBaseURL,
  wchGetResourceUrlFromApiURL,
  wchGetHubInfoFromBaseURL,
  wchGetHubInfoFromLinks,
  wchGetSiteContextURL
} from './wch.utils';

describe('wch.utils', () => {
  const dxSitesResourceUrl =
    'https://my10.digitalexperience.ibm.com/6f0ce0ff-8a25-4fac-b66a-5d42516247eb/dxsites/siteID/';
  const dxSitesApiUrl =
    'https://my10.digitalexperience.ibm.com/api/6f0ce0ff-8a25-4fac-b66a-5d42516247eb/dxsites/siteID/';
  const dxSitesCustomResourceUrl = 'https://myHost/dxsites/siteID/';
  const dxSitesCustomApiUrl = 'https://myHost/api/dxsites/siteID/';

  function _expectSites(aBase: string) {
    const info = wchGetHubInfoFromBaseURL(parseURL(aBase));

    expect(urlToString(info.apiUrl)).toBe(dxSitesApiUrl);
    expect(urlToString(info.resourceUrl)).toBe(dxSitesResourceUrl);
  }

  function _expectCustomSites(aBase: string) {
    const info = wchGetHubInfoFromBaseURL(parseURL(aBase));

    expect(urlToString(info.apiUrl)).toBe(dxSitesCustomApiUrl);
    expect(urlToString(info.resourceUrl)).toBe(dxSitesCustomResourceUrl);
  }

  /**
   * Construct a dummy window
   */
  function _createWindow(aLocation: string): Window {
    return {
      location: {
        href: aLocation
      }
    } as any;
  }

  it('should have working wchForEachRenderingContext for complex structure', () => {
    const name = join(ASSET_DIR, 'rc.from.api.json');
    // load
    const data = require(name);

    const ids: Record<string, string> = {};

    wchForEachRenderingContext(data, (rc, parent, path) => (ids[rc.id] = path));

    expect(objectKeys(ids).length).toEqual(27);
  });

  it('should have work for empty parent', () => {
    const parentId = undefined;
    const pageId = '898ba2e5-0ccb-4616-804b-1570c3ffd820';
    const siteId = 'default';

    const onUrl = wchGetSiteContextURL(parentId, pageId, siteId);

    return rxPipe(
      onUrl,
      map((url) => {
        // parse
        const obj = parseURL(url);
        expect(obj).toBeDefined();

        const query = parseQueryString(obj.search.substr(1));
        expect(query).toBeDefined();

        const q = query['q'];
        expect(query).toBeDefined();

        // test the query syntax
        const parsed = parse(q);
        expect(parsed).toBeDefined();
      })
    ).toPromise();
  });

  it('should have a wchGetSiteContextURL', () => {
    const parentId = 'parentId';
    const pageId = 'pageId';
    const siteId = 'siteId';

    const onUrl = wchGetSiteContextURL(parentId, pageId, siteId);

    return rxPipe(
      onUrl,
      map((url) => {
        // parse
        const obj = parseURL(url);
        expect(obj).toBeDefined();

        const query = parseQueryString(obj.search.substr(1));
        expect(query).toBeDefined();

        const q = query['q'];
        expect(query).toBeDefined();

        // test the query syntax
        const parsed = parse(q);
        expect(parsed).toBeDefined();
      })
    ).toPromise();
  });

  it('should merge hub info', () => {
    const dom = new JSDOM(
      `<!DOCTYPE html>
      <html>
      <head>
      <link rel="alternate" id="${ACOUSTIC_CONFIG_RESOURCE_URL}" href=".">
      </head>
      <body>
      </body>
      </html>`,
      {
        url:
          'https://my10.digitalexperience.ibm.com/6f0ce0ff-8a25-4fac-b66a-5d42516247eb/dxsites/siteID/page1/page2'
      }
    );

    const cfgBase = wchGetHubInfoFromBaseURL(
      parseURL(
        'https://my10.digitalexperience.ibm.com/6f0ce0ff-8a25-4fac-b66a-5d42516247eb'
      )
    );
    const cfgLinks = wchGetHubInfoFromLinks(dom.window.document, dom.window);

    const cfg = mergeHubInfo(cfgBase, cfgLinks);

    expect(cfg).toEqual(cfgLinks);
    expect(cfg).not.toEqual(cfgBase);
  });

  it('should decode the hub info from links', () => {
    const dom = new JSDOM(
      `<!DOCTYPE html>
      <html>
      <head>
      <link rel="alternate" id="${ACOUSTIC_CONFIG_RESOURCE_URL}" href=".">
      </head>
      <body>
      </body>
      </html>`,
      {
        url:
          'https://my10.digitalexperience.ibm.com/6f0ce0ff-8a25-4fac-b66a-5d42516247eb/dxsites/siteID/page1/page2'
      }
    );

    const info = wchGetHubInfoFromLinks(dom.window.document, dom.window);

    expect(parseURL(info.apiUrl).href).toBe(
      'https://my10.digitalexperience.ibm.com/api/6f0ce0ff-8a25-4fac-b66a-5d42516247eb/dxsites/siteID/'
    );
    expect(parseURL(info.resourceUrl).href).toBe(
      'https://my10.digitalexperience.ibm.com/6f0ce0ff-8a25-4fac-b66a-5d42516247eb/dxsites/siteID/'
    );
  });

  it('should decode the hub info from links', () => {
    const dom = new JSDOM(
      `<!DOCTYPE html>
      <html>
      <head>
      <base href="http://www.base.org/baseURL/">
      <link rel="alternate" id="${ACOUSTIC_CONFIG_RESOURCE_URL}" href="https://my10.digitalexperience.ibm.com/6f0ce0ff-8a25-4fac-b66a-5d42516247eb">
      </head>
      <body>
      </body>
      </html>`,
      {
        url:
          'https://my10.digitalexperience.ibm.com/6f0ce0ff-8a25-4fac-b66a-5d42516247eb/dxsites/siteID/page1/page2'
      }
    );

    const info = wchGetHubInfoFromLinks(dom.window.document, dom.window);

    expect(parseURL(info.apiUrl).href).toBe(
      'https://my10.digitalexperience.ibm.com/api/6f0ce0ff-8a25-4fac-b66a-5d42516247eb/'
    );
    expect(parseURL(info.resourceUrl).href).toBe(
      'https://my10.digitalexperience.ibm.com/6f0ce0ff-8a25-4fac-b66a-5d42516247eb/'
    );
  });

  it('should decode the base URL from the location', () => {
    const dom = new JSDOM(
      `<!DOCTYPE html>
      <html>
      <head>
      <base href="http://www.base.org/baseURL/">
      </head>
      <body>
      </body>
      </html>`,
      {
        url:
          'https://my10.digitalexperience.ibm.com/6f0ce0ff-8a25-4fac-b66a-5d42516247eb/dxsites/siteID/page1/page2'
      }
    );

    const url = getBaseUrlFromWindow(dom.window, dom.window.document);
    expect(url).toBeDefined();
    expect(url.href).toBe(
      'https://my10.digitalexperience.ibm.com/6f0ce0ff-8a25-4fac-b66a-5d42516247eb/dxsites/siteID/'
    );
  });

  it('should decode the base URL from the custom link', () => {
    const dom = new JSDOM(
      `<!DOCTYPE html>
      <html>
      <head>
      <link rel="alternate" id="${ACOUSTIC_CONFIG_BASE_URL}" href="http://www.base.from.link.org/baseURL/">
      <base href="http://www.base.org/baseURL/">
      </head>
      <body>
      </body>
      </html>`,
      {
        url:
          'https://my10.digitalexperience.ibm.com/6f0ce0ff-8a25-4fac-b66a-5d42516247eb/dxsites/siteID/page1/page2'
      }
    );

    const url = getBaseUrlFromWindow(dom.window, dom.window.document);
    expect(url).toBeDefined();
    expect(url.href).toBe('http://www.base.from.link.org/baseURL/');
  });

  it('should decode the base URL from a custom hostname with site ID', () => {
    const url = 'https://my.host/dxsites/siteID/page1/page2';
    const wnd: Window = _createWindow(url);
    // decode
    const decoded = wchGetBaseURL(undefined, wnd);
    expect(decoded.href).toBe('https://my.host/dxsites/siteID/');
  });

  it('should decode the base URL from a custom hostname', () => {
    const url = 'https://my.host/page1/page2';
    const wnd: Window = _createWindow(url);
    // decode
    const decoded = wchGetBaseURL(undefined, wnd);
    expect(decoded.href).toBe('https://my.host/');
  });

  it('should decode the base URL from a tenant and sites url', () => {
    const url =
      'https://my10.digitalexperience.ibm.com/6f0ce0ff-8a25-4fac-b66a-5d42516247eb/dxsites/siteID/page1/page2';
    const wnd: Window = _createWindow(url);
    // decode
    const decoded = wchGetBaseURL(undefined, wnd);
    expect(decoded.href).toBe(
      'https://my10.digitalexperience.ibm.com/6f0ce0ff-8a25-4fac-b66a-5d42516247eb/dxsites/siteID/'
    );
  });

  it('should decode the base URL from a tenant url', () => {
    const url =
      'https://my10.digitalexperience.ibm.com/6f0ce0ff-8a25-4fac-b66a-5d42516247eb/page1/page2';
    const wnd: Window = _createWindow(url);
    // decode
    const decoded = wchGetBaseURL(undefined, wnd);
    expect(decoded.href).toBe(
      'https://my10.digitalexperience.ibm.com/6f0ce0ff-8a25-4fac-b66a-5d42516247eb/'
    );
  });

  it('wchGetHubInfoFromBaseURL should work pageURLs', () => {
    _expectSites(
      'https://my10.digitalexperience.ibm.com/6f0ce0ff-8a25-4fac-b66a-5d42516247eb/dxsites/siteID'
    );
    _expectSites(
      'https://my10.digitalexperience.ibm.com/6f0ce0ff-8a25-4fac-b66a-5d42516247eb/dxsites/siteID/page1/page2'
    );
  });

  it('wchGetHubInfoFromBaseURL should work for sites based custom URL', () => {
    _expectCustomSites(dxSitesCustomResourceUrl);
  });

  it('wchGetHubInfoFromBaseURL should work for sites based URL', () => {
    _expectSites(dxSitesResourceUrl);
  });

  it('wchGetApiUrlFromResourceURL should work for sites based custom URL', () => {
    const resApiUrl = urlToString(
      wchGetApiUrlFromResourceURL(parseURL(dxSitesCustomResourceUrl))
    );
    const resResourceUrl = urlToString(
      wchGetResourceUrlFromApiURL(parseURL(dxSitesCustomApiUrl))
    );
    // check the result
    expect(resApiUrl).toBe(dxSitesCustomApiUrl);
    expect(resResourceUrl).toBe(dxSitesCustomResourceUrl);
  });

  it('wchGetApiUrlFromResourceURL should work for sites based URL', () => {
    const resApiUrl = urlToString(
      wchGetApiUrlFromResourceURL(parseURL(dxSitesResourceUrl))
    );
    const resResourceUrl = urlToString(
      wchGetResourceUrlFromApiURL(parseURL(dxSitesApiUrl))
    );
    // check the result
    expect(resApiUrl).toBe(dxSitesApiUrl);
    expect(resResourceUrl).toBe(dxSitesResourceUrl);
  });

  it('should decode the API URL in context', () => {
    const baseURL = parseURL('http://my-preview.example.org/abc');
    const apiURL = parseURL(
      'https://my10-preview.digitalexperience.ibm.com/api/6f0ce0ff-8a25-4fac-b66a-5d42516247eb'
    );

    const result = wchGetApiUrlInContext(apiURL, baseURL, (url) => true);

    expect(result.href).toBe(
      'https://my10-preview.digitalexperience.ibm.com/api/6f0ce0ff-8a25-4fac-b66a-5d42516247eb'
    );
  });

  it('should decode the API URL in context', () => {
    const baseURL = parseURL('http://my-preview.example.org/abc');
    const apiURL = parseURL(
      'https://my10.digitalexperience.ibm.com/api/6f0ce0ff-8a25-4fac-b66a-5d42516247eb'
    );

    const result = wchGetApiUrlInContext(apiURL, baseURL, (url) => false);

    expect(result.href).toBe(
      'https://my10.digitalexperience.ibm.com/api/6f0ce0ff-8a25-4fac-b66a-5d42516247eb'
    );
  });

  it('should decode the API URL in context', () => {
    const baseURL = parseURL('http://my-preview.example.org/abc');
    const apiURL = parseURL(
      'https://my10-preview.digitalexperience.ibm.com/api/6f0ce0ff-8a25-4fac-b66a-5d42516247eb'
    );

    const result = wchGetApiUrlInContext(apiURL, baseURL, (url) => false);

    expect(result.href).toBe(
      'https://my10.digitalexperience.ibm.com/api/6f0ce0ff-8a25-4fac-b66a-5d42516247eb'
    );
  });

  it('should decode the API URL in context', () => {
    const baseURL = parseURL('http://my-preview.example.org/abc');
    const apiURL = parseURL(
      'https://my10.digitalexperience.ibm.com/api/6f0ce0ff-8a25-4fac-b66a-5d42516247eb'
    );

    const result = wchGetApiUrlInContext(apiURL, baseURL, (url) => true);

    expect(result.href).toBe(
      'https://my10-preview.digitalexperience.ibm.com/api/6f0ce0ff-8a25-4fac-b66a-5d42516247eb'
    );
  });
});
