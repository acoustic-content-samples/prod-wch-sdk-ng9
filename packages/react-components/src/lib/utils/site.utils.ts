import { urlSlashes } from '@acoustic-content-sdk/utils';
import { RouteComponentProps } from 'react-router';

/**
 * Constructs the URL path based on the location
 *
 * @param aRoute - the location
 * @returns the path
 */
export const pathGetPathFromProps = (aRoute: RouteComponentProps): string =>
  urlSlashes(aRoute.location.pathname);
