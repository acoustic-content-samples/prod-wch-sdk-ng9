import { DeliveryContentItem } from '@acoustic-content-sdk/api';
import { isNotNil } from '@acoustic-content-sdk/utils';
import {
  isPageDescriptorType,
  PageDescriptorType
} from '../elements/page-descriptor/page.descriptor.type';

export type SiteNavigationPage = DeliveryContentItem & {
  descriptor: PageDescriptorType;
};

export function isSiteNavigationPage(page: any): page is SiteNavigationPage {
  return isNotNil(page) && isPageDescriptorType(page.descriptor);
}
