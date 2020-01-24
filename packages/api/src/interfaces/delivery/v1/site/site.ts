/** Copyright IBM Corp. 2018 */
import { SiteChild } from './site.child';

export interface SiteRoot { }

export interface Site extends SiteRoot {
    id: string;
    name?: string;
    pages: SiteChild[];
}
