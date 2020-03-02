import * as _byLine from 'byline';
import { fromEvent, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

function _readLines(aStream: NodeJS.ReadableStream): Observable<string> {
  // stream
  const byLine = _byLine;
  const stream = byLine(aStream);
  // done
  const done = fromEvent(stream, 'end');
  const data: Observable<string> = fromEvent(stream, 'data');
  // combine
  return data.pipe(takeUntil(done));
}

export { _readLines as rxReadLines };
