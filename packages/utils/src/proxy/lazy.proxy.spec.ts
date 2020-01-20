import { Generator } from '../generators/generator';
import { lazyProxy } from './lazy.proxy';
import { Observable, of, isObservable } from 'rxjs';
import { tap } from 'rxjs/operators';

describe('lazy.proxy', () => {
  interface TestObject {
    a: string;
  }

  it('should work for observables', () => {
    let bInit = false;
    const gen: Generator<Observable<string>> = () => {
      expect(bInit).toBeFalsy();
      bInit = true;
      return of('Test');
    };
    const o$ = lazyProxy(gen);
    expect(bInit).toBeFalsy();
    expect(isObservable(o$)).toBeTruthy();
    expect(bInit).toBeTruthy();

    return o$.pipe(tap((val) => expect(val).toBe('Test'))).toPromise();
  });

  it('should lazily create the object', () => {
    let bInit = false;

    const gen: Generator<TestObject> = () => {
      expect(bInit).toBeFalsy();
      bInit = true;
      return { a: 'Test' };
    };

    const obj: TestObject = lazyProxy(gen);
    expect(bInit).toBeFalsy();

    expect(obj.a).toBe('Test');
    expect(bInit).toBeTruthy();
  });
});
