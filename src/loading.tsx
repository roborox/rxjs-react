import React from "react"
import { Observable } from "rxjs"
import { distinctUntilChanged, map } from "rxjs/operators"
import { LoadingState } from "./to-rx"
import { useRx } from "./use-rx"

interface Props<T> extends Omit<Cases<T, React.ReactElement | null>, "success"> {
	value: Observable<LoadingState<T>>
	children: React.ReactElement
}

export function Loading<T>({value, ...rest}: Props<T>) {
	const cases: Cases<T, React.ReactElement | null> = {...rest, success: () => null}
	cases.success = () => rest.children as React.ReactElement
	return useRx(caseWhen(value, cases), cases.idle?.() || null)
}

interface Cases<T, R> {
	idle?: () => R
	loading?: () => R
	error?: (error: any) => R
	success: () => R
}

function caseWhen<T, R>(value: Observable<LoadingState<T>>, cases: Cases<T, R>): Observable<R | null> {
	return value.pipe(
		distinctUntilChanged((i1, i2) => getState(i1) === getState(i2)),
		map(x => {
			if (x.value === undefined && x.loading) {
				return cases.loading?.()
			}
			if (x.value === undefined) {
				return cases.idle?.()
			}
			if (x.error !== undefined) {
				return cases.error?.(x.error)
			}
			return cases.success()
		}),
		map(x => x === undefined ? null : x),
	)
}

function getState(s: LoadingState<any>) {
	if (s.value === undefined && s.loading) return "loading"
	if (s.value === undefined) return "idle"
	if (s.error !== undefined) return "error"
	return "success"
}
