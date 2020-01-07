/* Copyright IBM Corp. 2018 */
import { Site } from './site';
import { SitePage } from './site.page';

export interface SiteContext {
    parent?: SitePage;
    sibling: SitePage[];
    breadcrumb: SitePage[];
    children: SitePage[];
    site: Site;
}
