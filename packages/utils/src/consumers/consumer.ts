import { UnaryFunction } from 'rxjs';

export type Consumer<T> = UnaryFunction<T, any>;
export type BiFunction<T1, T2, R> = (t1: T1, t2: T2) => R;
export type BiConsumer<T1, T2> = BiFunction<T1, T2, any>;
