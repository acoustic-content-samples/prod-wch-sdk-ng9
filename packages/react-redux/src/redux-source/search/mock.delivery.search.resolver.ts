import { DeliverySearchResolver } from '@acoustic-content-sdk/component-api';
import { QueryInput, SearchResults } from '@acoustic-content-sdk/api';
import { Observable } from 'rxjs';
import { rxReadJsonFile } from '@acoustic-content-sdk/rx-utils';

export class MockDeliverySearchResolver implements DeliverySearchResolver {
  getDeliverySearchResults: <T>(
    aQuery: QueryInput,
    aClassification: string
  ) => Observable<SearchResults<T>>;

  constructor(aFile: string) {
    this.getDeliverySearchResults = () => rxReadJsonFile(aFile);
  }
}
