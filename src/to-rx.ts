import { catchError, map } from "rxjs/operators"
import { fromPromise } from "rxjs/internal-compatibility"
import { concat, Observable, of } from "rxjs"

export interface LoadingState<T> {
	loading: boolean
	value?: T
	error?: any
}

export function toRx<T>(promise: Promise<T>): Observable<LoadingState<T>> {
	return concat(
		of<LoadingState<T>>({ loading: true }),
		fromPromise(promise).pipe(
			map<T, LoadingState<T>>((it) => ({ loading: false, value: it })),
			catchError((err) => of({ loading: false, error: err } as LoadingState<T>)),
		),
	)
}
