/**
 * @jest-environment jsdom
 */
import 'url-search-params-polyfill';

import { JSDOM } from 'jsdom';

import { deepEquals } from './../js/js.utils';
import {
  absoluteURL,
  getLinksByRel,
  parseQueryString,
  parseURL,
  queryToCanonicalString,
  queryToString,
  urlSlashes,
  uniquifyPath,
  slugify,
  isValidPath,
} from './url.utils';

/* Copyright IBM Corp. 2017 */
describe('url.utils', () => {
  function testURL(aUrlString: string) {
    // parse the beast
    const u1: URL = new URL(aUrlString);
    const u2: URL = parseURL(aUrlString);
    // compare
    expect(u1.hash).toEqual(u2.hash);
    expect(u1.host).toEqual(u2.host);
    expect(u1.hostname).toEqual(u2.hostname);
    expect(u1.href).toEqual(u2.href);
    expect(u1.origin).toEqual(u2.origin);
    expect(u1.password).toEqual(u2.password);
    expect(u1.pathname).toEqual(u2.pathname);
    expect(u1.port).toEqual(u2.port);
    expect(u1.protocol).toEqual(u2.protocol);
    expect(u1.search).toEqual(u2.search);
    expect(u1.username).toEqual(u2.username);
    expect(u1.toString()).toEqual(u2.toString());
  }

  it('should make a url absolute from window', () => {
    const dom = new JSDOM(
      `<!DOCTYPE html>
      <html>
      <head>
      </head>
      <body>
      </body>
      </html>`,
      { url: 'http://www.other.org/test/index.html' }
    );

    const rel = '/rel/url.html';

    const abs = absoluteURL(rel, dom.window.document, <any>dom.window);

    expect(abs).toBe('http://www.other.org/rel/url.html');
  });

  it('should make a url absolute from base tag', () => {
    const dom = new JSDOM(
      `<!DOCTYPE html>
      <html>
      <head>
      <base href="http://www.example.org/abc">
      </head>
      <body>
      </body>
      </html>`,
      { url: 'http://www.other.org/test/index.html' }
    );

    const rel = '/rel/url.html';

    const abs = absoluteURL(rel, dom.window.document, <any>dom.window);

    expect(abs).toBe('http://www.example.org/rel/url.html');
  });

  it('should find the links', () => {
    const dom = new JSDOM(`<!DOCTYPE html>
      <html>
      <head>
      <link rel="rel1" href="http://www.rel1.org/">
      <link rel="rel2" href="http://www.rel2.org/">
      </head>
      <body>
      </body>
      </html>`);

    const doc = dom.window.document;
    const res = getLinksByRel(doc);

    expect(res).toBeDefined();
    expect(res['rel1']).toBe('http://www.rel1.org/');
    expect(res['rel2']).toBe('http://www.rel2.org/');
  });

  it('should parse URLs', () => {
    testURL(
      'https://my2.digitalexperience.ibm.com/api/782cc81b-90eb-4a50-aaf5-a0d71f7d0c0c'
    );
    testURL(
      'https://my2.digitalexperience.ibm.com:8080/api/782cc81b-90eb-4a50-aaf5-a0d71f7d0c0c'
    );
    testURL(
      'https://my2.digitalexperience.ibm.com:8080/api/782cc81b-90eb-4a50-aaf5-a0d71f7d0c0c?a=b&c=%20d'
    );
    testURL(
      'https://my2.digitalexperience.ibm.com:8080/api/782cc81b-90eb-4a50-aaf5-a0d71f7d0c0c?a=b&c=%20d#somehash'
    );
    testURL('http://www.ics.uci.edu/pub/ietf/uri/#Related');
    testURL('http://a/b/c/g;x?y#s');
  });

  it('should enclosed paths with slashes', () => {
    // sanity check
    expect(urlSlashes('')).toEqual('/');
    expect(urlSlashes('/')).toEqual('/');
    expect(urlSlashes(null)).toEqual('/');
    expect(urlSlashes(undefined)).toEqual('/');
    // valid segment
    expect(urlSlashes('/path/a/')).toEqual('/path/a/');
    expect(urlSlashes('/path/a')).toEqual('/path/a/');
    expect(urlSlashes('path/a')).toEqual('/path/a/');
    expect(urlSlashes('path/a/')).toEqual('/path/a/');
  });

  it('should parse and serialize a canonical query string', () => {
    // parse
    const q1 = parseQueryString(
      'a=b&a=c&b=d&b=test%20value&hl=en&q=Carsten+Leue&btnG=Google+Search&aq=f&oq='
    );
    const s1 = queryToCanonicalString(q1);
    const q2 = parseQueryString(s1);
    // make sure the objects are the same
    expect(deepEquals(q1, q2)).toBeTruthy();
  });

  it('should parse and serialize a query string', () => {
    // parse
    const q1 = parseQueryString(
      'a=b&a=c&b=d&b=test%20value&hl=en&q=Carsten+Leue&btnG=Google+Search&aq=f&oq='
    );
    const s1 = queryToString(q1);
    const q2 = parseQueryString(s1);
    // make sure the objects are the same
    expect(deepEquals(q1, q2)).toBeTruthy();
  });

  it('should parse a query string', () => {
    // parse
    const q1 = parseQueryString('a=b&a=c&b=d&b=test%20value');
    // check
    expect(q1).not.toBeNull();
    expect(q1.a).toEqual(['b', 'c']);
    expect(q1.b).toEqual(['d', 'test value']);
    // next
    const q2 = parseQueryString(
      'hl=en&q=Carsten+Leue&btnG=Google+Search&aq=f&oq='
    );
    expect(q2).not.toBeNull();
    expect(q2.hl).toEqual('en');
    expect(q2.q).toEqual('Carsten Leue');
    expect(q2.btnG).toEqual('Google Search');
    expect(q2.aq).toEqual('f');
    expect(q2.oq).toEqual('');
  });

  it('should parse a query string with multi values', () => {
    // parse
    const q1 = parseQueryString('a=b&a=c&b=d&b=test%20value');
    // check
    expect(q1).not.toBeNull();
    expect(q1.a).toEqual(['b', 'c']);
    expect(q1.b).toEqual(['d', 'test value']);
    // next
    const q2 = parseQueryString(
      'hl=en&q=Dr.&q=Carsten&q=Leue&btnG=Google+Search&aq=f&oq='
    );
    expect(q2).not.toBeNull();
    expect(q2.hl).toEqual('en');
    expect(q2.q).toEqual(['Dr.', 'Carsten', 'Leue']);
    expect(q2.btnG).toEqual('Google Search');
    expect(q2.aq).toEqual('f');
    expect(q2.oq).toEqual('');
  });

  it('should handle an undefined object', () => {
    const res = queryToString(undefined);
    expect(res).toBeUndefined();
  });

  it('should handle an empty object', () => {
    const res = queryToString(null);
    expect(res).toBeNull();
  });

  it('should serialize URL Search Params', () => {
    const q = new URLSearchParams();
    q.set('a', 'b');
    q.append('c', 'e f');
    q.append('c', 'g');
    const res = queryToString(q);

    const p = new URLSearchParams(res);

    expect(p.get('a')).toEqual('b');
    expect(p.get('c')).toEqual('e f');
    expect(p.getAll('c')[0]).toEqual('e f');
    expect(p.getAll('c')[1]).toEqual('g');
  });

  it('should serialize query parameters from a object', () => {
    const q = {
      a: 'b',
      c: ['e f', 'g']
    };
    const res = queryToString(q);

    const p = new URLSearchParams(res);
    expect(p.get('a')).toEqual('b');
    expect(p.get('c')).toEqual('e f');
    expect(p.getAll('c')[0]).toEqual('e f');
    expect(p.getAll('c')[1]).toEqual('g');
  });

  it('should serialize query parameters from a string', () => {
    const qs = 'a=b&c=d%20e';
    const res = queryToString(qs);

    const p = new URLSearchParams(res);
    expect(p.get('a')).toEqual('b');
    expect(p.get('c')).toEqual('d e');
  });

  it('should check for valid page path', () => {
    expect(isValidPath(('/test-path!@#$%^&*()-/sf'))).toBe(false);
    expect(isValidPath(('/test-path/'))).toBe(false);
    expect(isValidPath(('/test-path-'))).toBe(false);
    expect(isValidPath(('test-path'))).toBe(false);

    expect(isValidPath('/test-path')).toBe(true);
    expect(isValidPath('/testPath')).toBe(true);
  });

  it('should increment path if path exists in array', () => {
    const testPath = '/test';
    expect(uniquifyPath(testPath, [testPath])).toBe(testPath + 1);
    expect(uniquifyPath(testPath, [testPath, testPath + 1])).toBe(testPath + 2);
  });

  it('should return path if path does not exists in array', () => {
    const testPath = '/test';
    expect(uniquifyPath(testPath, ['/some-other-path'])).toBe(testPath);
  });

  it('should create valid path from given string', () => {
    expect(slugify('! Example Page-Name !')).toBe('/example-pagename');
  });

});
