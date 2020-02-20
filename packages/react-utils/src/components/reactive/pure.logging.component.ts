import { Logger, LoggerService } from '@acoustic-content-sdk/api';
import {
  boxLoggerService,
  hashRandomIdentifier
} from '@acoustic-content-sdk/utils';
import { ErrorInfo, PureComponent } from 'react';
import { createPatch } from 'rfc6902';

import { isDevelopment } from '../../utils/env';

export interface PureLoggingComponentProps {
  logSvc?: LoggerService;
}

const symLogger = Symbol();
const symID = Symbol();

/**
 * Base class for pure components that log their lifecycle and that visualize property updates
 * in development mode
 */
export abstract class PureLoggingComponent<
  P = {},
  S = {},
  SS = any
> extends PureComponent<P & PureLoggingComponentProps, S, SS> {
  // maintain a reference to our logger
  private readonly [symLogger]: Logger;
  private readonly [symID]: string;

  protected constructor(
    aName: string,
    aProps: Readonly<P & PureLoggingComponentProps>
  ) {
    super(aProps);
    // access props
    const logSvc = boxLoggerService(aProps.logSvc);
    const logger = logSvc.get(aName);
    // create an instance id
    const id = hashRandomIdentifier();
    // log the constructor
    logger.info('Constructor', id);
    // maintain a reference to the logger
    this[symLogger] = logger;
    this[symID] = id;
  }

  /** {@inheritdoc react:PureComponent} */
  componentDidUpdate(
    prevProps: Readonly<P>,
    prevState: Readonly<S>,
    snapshot?: SS
  ) {
    // access the logger
    const logger = this[symLogger];
    // update checks
    const bUpdateProps = this.props !== prevProps;
    // log the constructor
    logger.info('componentDidUpdate', bUpdateProps);
    // figure out why the component updated
    if (isDevelopment) {
      // find the difference
      const patch = createPatch(prevProps, this.props);
      logger.info('patch', patch);
    }
  }

  /** {@inheritdoc react:PureComponent} */
  componentDidMount() {
    // log the method
    this[symLogger].info('componentDidMount', this[symID]);
  }

  /** {@inheritdoc react:PureComponent} */
  componentWillUnmount() {
    // log the method
    this[symLogger].info('componentWillUnmount', this[symID]);
  }

  /** {@inheritdoc react:PureComponent} */
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // log the method
    this[symLogger].error('componentDidCatch', this[symID], error, errorInfo);
  }
}
