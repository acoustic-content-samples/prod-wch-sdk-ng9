import { emptyDir, remove } from 'fs-extra';
import { from, Observable, UnaryFunction } from 'rxjs';
import { mapTo } from 'rxjs/operators';

export const rxDeleteFile: UnaryFunction<string, Observable<string>> = file =>
  from(remove(file)).pipe(mapTo(file));
export const rxDeleteDir = rxDeleteFile;

export const rxEmptyDir: UnaryFunction<string, Observable<string>> = file =>
  from(emptyDir(file)).pipe(mapTo(file));
