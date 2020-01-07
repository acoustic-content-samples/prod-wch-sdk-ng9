import {
  RenderingContextProviderV2,
  RenderingContextV2
} from '@acoustic-content-sdk/api';
import {
  createSetterOnSubject,
  DEFAULT_LAYOUT_MODE,
  KEY_LAYOUT_MODE,
  opBoxLayoutMode,
  opDistinctUntilChanged,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { Input, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { defineProperties } from './../../utils/js.utils';
import { AbstractLifeCycleComponent } from './abstract.lifecycle.component';

export abstract class AbstractBaseComponent extends AbstractLifeCycleComponent
  implements RenderingContextProviderV2 {
  /**
   * The rendering context for the page. This is the context
   * of the element that is referenced by the currently active route.
   */
  @Output() renderingContext$: Observable<RenderingContextV2>;

  /**
   * Fires whenever the layout mode changed, includes the initial default mode.
   */
  @Output() readonly layoutMode$: Observable<string>;

  /**
   * Set the layout mode to render this page
   *
   * @param aValue - the new layout mode, if nothing is given this defaults to 'default'
   */
  @Input() layoutMode: string;

  constructor() {
    /**
     *  default
     */
    super();
    /**
     *  attach the handlers
     */
    const that = this;
    /**
     *  the subjects
     */
    const modeSubject = new BehaviorSubject<string>(DEFAULT_LAYOUT_MODE);
    /**
     *  define the setters
     */
    const layoutMode$ = rxPipe(
      modeSubject,
      opBoxLayoutMode,
      opDistinctUntilChanged
    );
    /**
     *  assign
     */
    defineProperties(that, {
      [KEY_LAYOUT_MODE]: createSetterOnSubject(modeSubject)
    });
    /**
     *  attach the handler
     */
    this.layoutMode$ = layoutMode$;
  }
}
