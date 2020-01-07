import {
  AuthoringAsset,
  AuthoringContentItem
} from '@acoustic-content-sdk/api';
import { Observable, UnaryFunction } from 'rxjs';

export type ResolveAuthoringContentItem = UnaryFunction<
  string,
  Observable<AuthoringContentItem>
>;
export type ResolveAuthoringAsset = UnaryFunction<
  string,
  Observable<AuthoringAsset>
>;
