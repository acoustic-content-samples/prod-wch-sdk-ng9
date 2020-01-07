/* Copyright IBM Corp. 2018 */
import { SitePage } from './site.page';

export interface SiteChild extends SitePage {
    children: SiteChild[];
}
