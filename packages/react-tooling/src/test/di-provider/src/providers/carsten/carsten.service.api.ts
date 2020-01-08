import {
  createReactContext
} from '@acoustic-content-sdk/react-api';

export interface CarstenService {
  // properties come here
}

/**
 * Dependency injection context for the `CarstenService`.
 */
export const CONTEXT_CARSTEN_SERVICE = createReactContext<
  CarstenService
>('CONTEXT_CARSTEN_SERVICE');
