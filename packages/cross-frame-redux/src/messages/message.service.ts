import { Logger, LoggerService } from '@acoustic-content-sdk/api';
import {
  Consumer,
  isNotNil,
  jsonParse,
  NOOP_LOGGER_SERVICE,
  rxLogAll,
  rxPipe,
  UNDEFINED_TYPE
} from '@acoustic-content-sdk/utils';
import { Action } from 'redux';
import {
  EMPTY,
  fromEvent,
  MonoTypeOperatorFunction,
  noop,
  Observable
} from 'rxjs';
import { filter, map, pluck, share } from 'rxjs/operators';

import {
  createCrossFrameMessage,
  isCrossFrameMessage,
  selectionAction
} from './message';

const HAS_WINDOW = typeof window !== UNDEFINED_TYPE;

const LOGGER = 'MessageService';

function createSendMessage(aTarget: Window, logger: Logger): Consumer<Action> {
  return isNotNil(aTarget)
    ? (msg) => {
        logger.info('Sending cross frame message: ', msg);
        aTarget.postMessage(createCrossFrameMessage(msg), '*');
      }
    : noop;
}

/**
 * Simple implementation of a cross iframe message service.
 */
export class MessageService {
  /**
   * Observable that receives messages from the parent frame
   */
  readonly messages$: Observable<Action>;

  /**
   * Dispatches messages to the parent frame
   */
  sendMessage: Consumer<Action>;

  constructor(aOther: Window, aLogSvc?: LoggerService) {
    // logger
    const logSvc = aLogSvc || NOOP_LOGGER_SERVICE;
    const logger = logSvc.get(LOGGER);
    // next logger
    const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxLogAll(
      logger
    );

    /**
     * handle the messages
     */
    this.messages$ = HAS_WINDOW
      ? rxPipe(
          fromEvent<MessageEvent>(window, 'message'),
          filter((msg) => msg.source === aOther),
          pluck('data'),
          filter(isCrossFrameMessage),
          map(selectionAction),
          map<string, Action>(jsonParse),
          log('action'),
          share()
        )
      : EMPTY;

    /**
     * Message callback
     */
    this.sendMessage = HAS_WINDOW ? createSendMessage(aOther, logger) : noop;
  }
}
