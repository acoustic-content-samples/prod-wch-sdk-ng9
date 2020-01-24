/** Copyright IBM Corp. 2018 */
import { BaseDeliveryItem } from './../base.item';

export interface SitePage extends BaseDeliveryItem {
    id: string;
    contentStatus: string;
    contentTypeId: string;
    route: string;
    decodedRoute: string;
    name: string;
    contentId: string;
    title?: string;
    parentId?: string;
    description?: string;
    hideFromNavigation: boolean;
    externalContext?: any;
}
