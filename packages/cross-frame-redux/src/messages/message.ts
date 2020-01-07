import {
  getProperty,
  isString,
  jsonStringify,
  pluckProperty
} from '@acoustic-content-sdk/utils';
import { Action } from 'redux';

const CROSS_FRAME_MESSAGE_ID = 'e07d1b92-5485-4fff-b56c-e49abdb2b0a0';

export interface CrossFrameMessage {
  id: 'e07d1b92-5485-4fff-b56c-e49abdb2b0a0';
  action: string;
}

export const selectionAction = pluckProperty<CrossFrameMessage, 'action'>(
  'action'
);

export function isCrossFrameMessage(aMsg: any): aMsg is CrossFrameMessage {
  return (
    getProperty(aMsg, 'id') === CROSS_FRAME_MESSAGE_ID &&
    isString(selectionAction(aMsg))
  );
}

export function createCrossFrameMessage(action: Action): CrossFrameMessage {
  return { id: CROSS_FRAME_MESSAGE_ID, action: jsonStringify(action) };
}
