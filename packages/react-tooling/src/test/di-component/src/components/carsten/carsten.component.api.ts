import {
  ReactComponent,
  createReactContext
} from '@acoustic-content-sdk/react-api';

export interface CarstenComponentProps {
  // properties come here
}

/**
 * Dependency injection context for the `CarstenComponent`.
 */
export const CONTEXT_CARSTEN_COMPONENT = createReactContext<
  ReactComponent<CarstenComponentProps>
>('CONTEXT_CARSTEN_COMPONENT');
