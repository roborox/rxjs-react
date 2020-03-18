import { Observable } from "rxjs"
import { map } from "rxjs/operators"
import { LoadingStatus } from "./loading-state"

export type Cases<R> = {
	idle?: R
	loading?: R
	error?: (error: any) => R
	success: R
}

export const caseWhen = <R>(
	status: Observable<LoadingStatus>, cases: Cases<R>,
): Observable<R | null> => {
	return status.pipe(
		map(x => {
			switch (x.status) {
				case "loading": {
					return cases.loading
				}
				case "error": {
					return cases.error?.(x.error)
				}
				case "success": {
					return cases.success
				}
				default: {
					return cases.idle
				}
			}
		}),
		map(x => x === undefined ? null : x),
	)
}
