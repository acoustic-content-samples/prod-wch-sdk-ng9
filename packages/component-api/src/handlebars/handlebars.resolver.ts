import { RenderingContextV2 } from '@acoustic-content-sdk/api';
import { Observable } from 'rxjs';

/**
 * the processor converts the context into a string
 */
export type HandlebarsProcessor = (aContext: RenderingContextV2) => string;

/**
 * Service interface to map a template to a (markup) string
 */
export interface HandlebarsResolver {
  /**
   * Resolves the template ID to a processor
   *
   * @param aId - the ID of the template
   *
   * @returns an observable of the processor
   */
  getHandlebarsProcessor(aId: string): Observable<HandlebarsProcessor>;
}
