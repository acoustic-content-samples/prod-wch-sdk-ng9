import { Observable, Observer } from 'rxjs';

export type CallbackType<T> = (aCb: (aError: any, aValue?: T) => void) => void;

export function createFromCallback<T>(aCb: CallbackType<T>): Observable<T> {
  // handle the standard observable pattern
  return Observable.create((aObserver: Observer<T>) =>
    aCb((err, aValue) => {
      if (err) {
        aObserver.error(err);
      } else {
        aObserver.next(aValue);
        aObserver.complete();
      }
    })
  );
}
