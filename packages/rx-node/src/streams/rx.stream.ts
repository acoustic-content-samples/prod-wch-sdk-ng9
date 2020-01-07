import { OperatorFunction, Observer } from 'rxjs';
import { reduce, mapTo, map } from 'rxjs/operators';
import {
  Generator,
  rxPipe,
  BiFunction,
  arrayPush
} from '@acoustic-content-sdk/utils';

export interface Writeable<T> {
  write(aData: T, aEncoding?: string): boolean;
  once(aEvent: 'drain', cb: () => void): void;
}

export declare type ReducerState<T> = [Writeable<T>, Observer<boolean>];

function createReducer<T>(
  aEncoding?: string
): BiFunction<ReducerState<T>, T, ReducerState<T>> {
  // check for the paused state
  let bActive = true;
  // current buffer
  const buffer: T[] = [];

  function handleDrain(
    aDst: Writeable<T>,
    aSignal: Observer<boolean>
  ): () => void {
    function doDrain() {
      // drain the buffer
      const count = buffer.length;
      let bOk = true;
      let idx = 0;
      // drain the buffer
      while (idx < count && bOk) {
        // write the chunk
        bOk = aDst.write(buffer[idx++], aEncoding);
        // break the loop
        if (!bOk) {
          aDst.once('drain', doDrain);
        }
      }
      // cleanup
      buffer.splice(0, idx);
      // update the active flag
      bActive = bOk;
      // dispatch this
      aSignal.next(bActive);
    }
    // returns our drain function
    return doDrain;
  }

  // the reducer function
  return (aDst, aChunk) => {
    // decompose
    const [dst, signal] = aDst;
    // if in paused state, add to the queue
    if (bActive) {
      // write to the stream
      bActive = dst.write(aChunk, aEncoding);
      // handle drain
      if (!bActive) {
        dst.once('drain', handleDrain(dst, signal));
      }
      // signal this
      signal.next(bActive);
    } else {
      // buffer the next chunk of data
      arrayPush(aChunk, buffer);
    }
    // ok
    return aDst;
  };
}

export function rxWriteToStream<T>(
  aDstGen: Generator<ReducerState<T>>,
  aEncoding?: string
): OperatorFunction<T, Writeable<T>> {
  return (src$) =>
    rxPipe(
      src$,
      reduce(createReducer<T>(aEncoding), aDstGen()),
      map(([dst, signal]) => {
        // done with the stream
        signal.complete();
        // returns the original stream
        return dst;
      })
    );
}
