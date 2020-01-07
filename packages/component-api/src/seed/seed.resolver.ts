import { Observable } from 'rxjs';

/**
 * Service interface that allows to resolve a seed
 */
export interface SeedResolver {
  /**
   * Resolves a rendering context given the ID of the item
   *
   * @param aID - the ID of the item
   * @param aClassification - classification of the item
   *
   * @returns an observable of the context
   */
  getSeed(aID: string, aClassification: string): Observable<string>;
}
