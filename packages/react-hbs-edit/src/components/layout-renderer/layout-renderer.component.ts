import { ExtendedContextV2, LoggerService } from '@acoustic-content-sdk/api';
import { DeliveryContentResolver } from '@acoustic-content-sdk/component-api';
import { WchInlineEditServiceV2 } from '@acoustic-content-sdk/edit-api';
import { ReactComponent } from '@acoustic-content-sdk/react-api';
import { AbstractRxComponent } from '@acoustic-content-sdk/react-utils';
import {
  opDistinctUntilChanged,
  rxNext,
  rxPipe
} from '@acoustic-content-sdk/utils';
import { createElement, createRef, ReactNode, RefObject } from 'react';
import { MonoTypeOperatorFunction, Observable, UnaryFunction } from 'rxjs';
import { map, pluck, switchMap, take } from 'rxjs/operators';
import { handleInternalPathClick } from '@acoustic-content-sdk/utils';

import {
  createInlineEditHost,
  InlineEditHost
} from '../../services/inline-edit/inline.edit.host';

export interface LayoutRendererComponentProps {
  html: string;
}

const LOGGER = 'createLayoutRendererComponent';

/**
 * Constructs a react component that can render the
 *
 * @param aRenderer
 * @param aStore
 * @param aEditService
 * @param logSvc
 */
export function createLayoutRendererComponent(
  aRenderer: UnaryFunction<string, Observable<ReactNode>>,
  aDeliveryContent: DeliveryContentResolver,
  aEditService: WchInlineEditServiceV2,
  aExtendedContext$: Observable<ExtendedContextV2>,
  logSvc: LoggerService
): ReactComponent<LayoutRendererComponentProps> {
  /**
   * Our internal component state
   */
  interface LayoutRendererComponentState {
    node?: ReactNode;
  }

  // service
  const logger = logSvc.get(LOGGER);

  // next logger
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);

  class LayoutRendererComponent extends AbstractRxComponent<
    LayoutRendererComponentProps,
    LayoutRendererComponentState
    > {
    private rootNodeRef: RefObject<HTMLElement>;

    private inlineEditHost: InlineEditHost;

    constructor(props: Readonly<LayoutRendererComponentProps>) {
      super(props);

      this.rootNodeRef = createRef();

      // setup state
      this.state = {};

      const state$: Observable<LayoutRendererComponentState> = rxPipe(
        this.props$,
        pluck('html'),
        opDistinctUntilChanged,
        switchMap(aRenderer),
        map((node) => ({
          node
        })),
        log('state')
      );

      this.connectState(state$);
    }

    componentDidMount() {
      super.componentDidMount();

      // construct the event stream of the inline edit events
      this.inlineEditHost = createInlineEditHost(
        this.rootNodeRef.current,
        aDeliveryContent,
        aEditService,
        aExtendedContext$,
        logSvc
      );
      this.inlineEditHost.refresh();
      rxPipe(this.inlineEditHost.onDone$, take(1)).subscribe(() => {
        this.inlineEditHost.dispose();
      });
    }

    componentWillUnmount() {
      super.componentWillUnmount();

      // done with the subscription
      this.inlineEditHost.dispose();
    }

    componentDidUpdate(
      prevProps: Readonly<LayoutRendererComponentProps>,
      prevState: Readonly<LayoutRendererComponentState>
    ) {
      super.componentDidUpdate(prevProps, prevState);
      // make sure to update the data
      this.inlineEditHost.refresh();
    }

    render() {
      return createElement(
        'div',
        {
          ref: this.rootNodeRef,
          onClick: (e) => handleInternalPathClick(e)
        },
        this.state.node
      );
    }
  }

  // returns this component
  return LayoutRendererComponent;
}
