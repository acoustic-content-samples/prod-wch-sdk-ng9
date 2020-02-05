import { Logger, LoggerService } from '@acoustic-content-sdk/api';
import { WCH_TOKEN_LOGGER_SERVICE } from '@acoustic-content-sdk/ng-api';
import { ReactModule } from '@acoustic-content-sdk/react-api';
import {
  createSetterOnSubject,
  createSingleSubject,
  NOOP_LOGGER_SERVICE,
  opDistinctUntilChanged,
  rxPipe
} from '@acoustic-content-sdk/utils';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  Optional
} from '@angular/core';
import { createElement } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import { HandlebarsRendererComponent } from '../services/renderer/renderer.component';

const LOGGER = 'ReactDirective';

/**
 * Implementation of the handlebars rendering based on a React implementation. We use
 * React even for the Angular case, because we need React's reconciliation algorithm to minimize
 * the number of DOM updates, so we won't constantly recreate inline edit registrations.
 */
@Directive({ selector: '[wchReact]' })
export class ReactDirective implements OnDestroy, AfterViewInit {
  /**
   * ID and accessor of the item to be rendered, separated by '#'
   */
  @Input()
  wchReact: string;

  private readonly Renderer: ReactModule;

  private readonly logger: Logger;

  constructor(
    private host: ElementRef,
    renderer: HandlebarsRendererComponent,
    @Optional()
    @Inject(WCH_TOKEN_LOGGER_SERVICE)
    aLogSvc: LoggerService
  ) {
    // initialize logging
    const logSvc = aLogSvc || NOOP_LOGGER_SERVICE;
    this.logger = logSvc.get(LOGGER);
    // attach to the input
    const contentItemIdSubject = createSingleSubject<string>();
    const contentItemId$ = rxPipe(contentItemIdSubject, opDistinctUntilChanged);
    this.Renderer = renderer.createRenderer(contentItemId$);
    // setter
    Object.defineProperty(
      this,
      'wchReact',
      createSetterOnSubject(contentItemIdSubject)
    );
  }

  ngAfterViewInit() {
    // log this
    this.logger.info('Mounting react component', this.host.nativeElement);
    // attach the react rendering
    render(createElement(this.Renderer), this.host.nativeElement);
  }

  ngOnDestroy() {
    // detach from the view
    unmountComponentAtNode(this.host.nativeElement);
    // log this
    this.logger.info('Unmounting react component', this.host.nativeElement);
  }
}
