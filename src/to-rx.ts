import { Observable, ReplaySubject } from "rxjs"

export type LoadingStatusIdle = { status: "idle" }
export type LoadingStatusSuccess = { status: "success" }
export type LoadingStatusLoading = { status: "loading" }
export type LoadingStatusError = { status: "error", error: any }
export type LoadingStatus = LoadingStatusIdle | LoadingStatusLoading | LoadingStatusSuccess | LoadingStatusError

export const loadingStatusIdle: LoadingStatusIdle = {status: "idle"}
export const loadingStatusLoading: LoadingStatusLoading = {status: "loading"}
export const loadingStatusSuccess: LoadingStatusSuccess = {status: "success"}

export interface LoadingState<T> {
	value: T
	status: LoadingStatus
}

export function toRx<T>(promise: Promise<T>): [Observable<T>, Observable<LoadingStatus>] {
	const result = new ReplaySubject<T>(1)
	const status = new ReplaySubject<LoadingStatus>(1)
	status.next(loadingStatusLoading)
	promise
		.then(x => {
			result.next(x)
			status.next(loadingStatusSuccess)
		})
		.catch(e => status.next({status: "error", error: e}))
	return [result, status]
}
