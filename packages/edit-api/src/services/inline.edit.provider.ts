import { Observable } from 'rxjs';

/**
 * Service that exposes inline edit info
 */
export interface InlineEditSelectionProvider {
  /**
   * Captures the currently selected cell. The return value
   * is either just an ID or `ID#accessor`. If a cell is deselected, the service
   * returns i
   */
  selectedCell$: Observable<string | undefined>;
}
