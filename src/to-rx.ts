import { Observable, ReplaySubject } from "rxjs"
import { LoadingStatus, createLoadingStatusError, loadingStatusLoading, loadingStatusSuccess } from "./loading-state"

export function toRx<T>(promise: Promise<T>): [Observable<T>, Observable<LoadingStatus>] {
	const result = new ReplaySubject<T>(1)
	const status = new ReplaySubject<LoadingStatus>(1)

	status.next(loadingStatusLoading)

	promise
		.then(x => {
			result.next(x)
			status.next(loadingStatusSuccess)
		})
		.catch(e => status.next(createLoadingStatusError(e)))
	return [result, status]
}
