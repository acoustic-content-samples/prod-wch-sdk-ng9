import { Observable } from 'rxjs';

export interface ProtectedContent {
  /**
   * Flag to tell whether or not to serve protected content
   */
  protected$: Observable<boolean>;
}
