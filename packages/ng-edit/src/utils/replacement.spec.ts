import { replaceWithTokens } from './replacement';

/* Copyright IBM Corp. 2017 */

describe('TokenReplacement', () => {
  const config = {
    apiUrl: {
      auth: null,
      hash: null,
      host: 'dch-dxcloud.rtp.raleigh.ibm.com',
      hostname: 'dch-dxcloud.rtp.raleigh.ibm.com',
      href:
        'https://dch-dxcloud.rtp.raleigh.ibm.com/api/cfc99955-1b9f-48f7-9b44-0d3d46eb364d/',
      path: '/api/cfc99955-1b9f-48f7-9b44-0d3d46eb364d/',
      pathname: '/api/cfc99955-1b9f-48f7-9b44-0d3d46eb364d/',
      port: null,
      protocol: 'https:',
      query: null,
      search: null,
      slashes: true
    },
    deliveryUrl: {
      auth: null,
      hash: null,
      host: 'dch-dxcloud.rtp.raleigh.ibm.com',
      hostname: 'dch-dxcloud.rtp.raleigh.ibm.com',
      href:
        'https://dch-dxcloud.rtp.raleigh.ibm.com/cfc99955-1b9f-48f7-9b44-0d3d46eb364d/',
      path: '/cfc99955-1b9f-48f7-9b44-0d3d46eb364d/',
      pathname: '/cfc99955-1b9f-48f7-9b44-0d3d46eb364d/',
      port: null,
      protocol: 'https:',
      query: null,
      search: null,
      slashes: true
    },
    previewApiUrl: {
      auth: null,
      hash: null,
      host: 'dch-dxcloud-preview.rtp.raleigh.ibm.com',
      hostname: 'dch-dxcloud-preview.rtp.raleigh.ibm.com',
      href:
        'https://dch-dxcloud-preview.rtp.raleigh.ibm.com/api/cfc99955-1b9f-48f7-9b44-0d3d46eb364d/',
      path: '/api/cfc99955-1b9f-48f7-9b44-0d3d46eb364d/',
      pathname: '/api/cfc99955-1b9f-48f7-9b44-0d3d46eb364d/',
      port: null,
      protocol: 'https:',
      query: null,
      search: null,
      slashes: true
    },
    previewDeliveryUrl: {
      auth: null,
      hash: null,
      host: 'dch-dxcloud-preview.rtp.raleigh.ibm.com',
      hostname: 'dch-dxcloud-preview.rtp.raleigh.ibm.com',
      href:
        'https://dch-dxcloud-preview.rtp.raleigh.ibm.com/cfc99955-1b9f-48f7-9b44-0d3d46eb364d/',
      path: '/cfc99955-1b9f-48f7-9b44-0d3d46eb364d/',
      pathname: '/cfc99955-1b9f-48f7-9b44-0d3d46eb364d/',
      port: null,
      protocol: 'https:',
      query: null,
      search: null,
      slashes: true
    }
  };

  it('should replace tokens', () => {
    const url = '${apiUrl.href}test';
    expect(replaceWithTokens(url, config)).toEqual(
      'https://dch-dxcloud.rtp.raleigh.ibm.com/api/cfc99955-1b9f-48f7-9b44-0d3d46eb364d/test'
    );
  });

  it('handle the inline-edit URL', () => {
    const url =
      '${apiUrl.protocol}//${apiUrl.host}/authoring-sites-ui/inline-edit/inline-edit.js';
    expect(replaceWithTokens(url, config)).toEqual(
      'https://dch-dxcloud.rtp.raleigh.ibm.com/authoring-sites-ui/inline-edit/inline-edit.js'
    );
  });
});
