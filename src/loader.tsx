import React, { ReactElement } from "react"
import { Observable } from "rxjs"
import { LoadingStatus } from "./to-rx"
import { map } from "rxjs/operators"
import { useRx } from "./use-rx"

interface Cases<R> {
	idle?: R
	loading?: R
	error?: (error: any) => R
	success: R
}

function caseWhen<T, R>(status: Observable<LoadingStatus>, cases: Cases<R>): Observable<R | null> {
	return status.pipe(
		map(x => {
			switch (x.status) {
				case "idle":
					return cases.idle
				case "loading":
					return cases.loading
				case "error":
					return cases.error?.(x.error)
				case "success":
					return cases.success
			}
		}),
		map(x => x === undefined ? null : x),
	)
}

export interface Props {
	status: Observable<LoadingStatus>
	idle?: ReactElement
	loading?: ReactElement
	error?: (error: any) => ReactElement
	children: ReactElement
}

export function Loader(props: Props): React.ReactElement | null {
	return useRx(caseWhen(props.status, {...props, success: props.children}))
}
