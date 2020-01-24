import { Site, SiteContext } from '@acoustic-content-sdk/api';

/** Copyright IBM Corp. 2017 */

const _EMPTY_SITE: Site = {
  pages: [],
  id: null
};

const _EMPTY_SITE_CONTEXT: SiteContext = {
  parent: undefined,
  sibling: [],
  breadcrumb: [],
  children: [],
  site: _EMPTY_SITE
};

const _UNDEFINED_SITE_CONTEXT: SiteContext = {
  parent: undefined,
  sibling: [],
  breadcrumb: [],
  children: [],
  site: undefined
};

export {
  _EMPTY_SITE as EMPTY_SITE,
  _EMPTY_SITE_CONTEXT as EMPTY_SITE_CONTEXT,
  _UNDEFINED_SITE_CONTEXT as UNDEFINED_SITE_CONTEXT
};
